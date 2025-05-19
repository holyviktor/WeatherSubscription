const cron = require('node-cron');

const SubscriptionService = require('../services/subscriptionService.js');
const {frequencies} = require('../constants/frequenciesConstants.js');

class EmailScheduler {
    constructor() {
        this.subscriberService = new SubscriptionService();
    }

    start() {
        this.scheduleEmails();
    }

    scheduleEmails() {
        frequencies.forEach((frequency) => {
            cron.schedule(frequency.cron, async () => {
                await this.subscriberService.processSubscribersByFrequency(frequency.interval, frequency.label);
            });
        });
    }
}

module.exports = { EmailScheduler };