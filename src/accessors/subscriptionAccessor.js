const Subscriber = require('../schemas/subscriptionSchema.js');

class SubscriberAccessor {
    async create(data) {
        const subscriber = new Subscriber(data);
        return subscriber.save();
    }

    async getByEmail(email) {
        return Subscriber.findOne({ email: email.toLowerCase().trim() });
    }

    async deleteByEmail(email) {
        return Subscriber.findOneAndDelete({ email: email.toLowerCase().trim() });
    }

    async updateConfirmation(email, isConfirmed) {
        return Subscriber.findOneAndUpdate(
            { email: email.toLowerCase().trim() },
            { isConfirmed },
            { new: true }
        );
    }

    async getConfirmedByFrequency(frequency) {
        return Subscriber.find({ frequency, isConfirmed: true });
    }
}

module.exports = SubscriberAccessor;