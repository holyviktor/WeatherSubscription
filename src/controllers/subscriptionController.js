const subscriptionFormSchema = require('../validation/subscriptionFormValidator.js');
const CustomError = require('../models/customError.js');
const SubscriptionService = require('../services/subscriptionService.js');

class SubscriptionController {
    constructor() {
        this.subscribtionService = new SubscriptionService();
    }
    async subscribe(req, res, next) {
        const formData = req.body;
        const result = subscriptionFormSchema.validate(formData, { abortEarly: false });
        if (result.error) {
            next(new CustomError(400, 'Invalid input'));
        }
        try {
            if (await this.subscribtionService.subscribe(formData)) {
                res.json('Subscription successful. Confirmation email sent.');
            }
        }catch (error) {
            next(error);
        }
    }

    async confirm(req, res, next) {
        const { token } = req.params;
        if (!token) {
            next(new CustomError(404, 'Token not found'));
        }
        try {
            await this.subscribtionService.confirm(token);
            res.json('Subscription confirmed successfully');
        }catch (error) {
            next(error);
        }
    }

    async unsubscribe(req, res, next) {
        const { token } = req.params;
        if (!token) {
            next(new CustomError(404, 'Token not found'));
        }
        try {
            await this.subscribtionService.unsubscribe(token);
            res.json('Unsubscribed successfully');
        }catch (error) {
            next(error);
        }
    }
}

module.exports = SubscriptionController;