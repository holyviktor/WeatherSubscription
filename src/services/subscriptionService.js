const SubscriptionAccessor = require('../accessors/subscriptionAccessor.js');
const CustomError = require('../models/customError.js');
const {EmailService} = require('./emailService.js');
const {TokenService} = require('./tokenService.js');
const {
    emailSubjectConfirmation,
    emailTextSubscribed,
    emailUpdateSubjectHourly,
    emailUpdateText, emailTextConfirmed
} = require('../constants/messagesConstants.js');
const {WeatherService} = require('./weatherService.js');

class SubscriptionService {
    constructor() {
        this.subscriptionAccessor = new SubscriptionAccessor();
        this.emailService = new EmailService();
        this.tokenService = new TokenService();
        this.weatherService = new WeatherService();
    }

    async subscribe(subscribeData) {
        if (await this.isSubscribed(subscribeData.email)) {
            throw new CustomError(409, 'Email already subscribed');
        }
        await this.weatherService.getWeatherByCity(subscribeData.city);

        const token = this.tokenService.issueToken(subscribeData.email);

        await this.emailService.sendMail(subscribeData.email,
            emailSubjectConfirmation,
            emailTextSubscribed(`${process.env.MESSAGE_HOST}/confirm/${token}`)
        );

        return this.subscriptionAccessor.create(subscribeData);
    }

    async confirm(token) {
        const email = this.tokenService.checkToken(token);
        if (! email || ! await this.isSubscribed(email)) {
            throw new CustomError(400, 'Invalid token');
        }
        await this.emailService.sendMail(email,
            emailSubjectConfirmation,
            emailTextConfirmed(`${process.env.MESSAGE_HOST}/unsubscribe/${token}`)
        );
        await this.subscriptionAccessor.updateConfirmation(email, true);
    }

    async unsubscribe(token) {
        const email = this.tokenService.checkToken(token);
        if (! email || ! await this.isSubscribed(email)) {
            throw new CustomError(400, 'Invalid token');
        }
        await this.subscriptionAccessor.deleteByEmail(email);
    }

    async getConfirmedByFrequency(frequency) {
        return this.subscriptionAccessor.getConfirmedByFrequency(frequency);
    }
    async processSubscribersByFrequency(frequency, label) {
        const subscribers = await this.getConfirmedByFrequency(frequency);

        const cityGroups = subscribers.reduce((acc, subscriber) => {
            const { city } = subscriber;
            if (!acc[city]) acc[city] = [];
            acc[city].push(subscriber);
            return acc;
        }, {});

        for (const [city, citySubscribers] of Object.entries(cityGroups)) {
            try {
                const weather = await this.weatherService.getWeatherByCity(city);

                for (const subscriber of citySubscribers) {
                    await this.emailService.sendMail(
                        subscriber.email,
                        emailUpdateSubjectHourly(label),
                        emailUpdateText(weather, city)
                    );
                }

            } catch (error) {
                throw new CustomError(500, `Failed to fetch weather or send emails for ${city}.`);
            }
        }
    }

    async isSubscribed(email) {
        return !! (await this.subscriptionAccessor.getByEmail(email));
    }
}

module.exports = SubscriptionService;