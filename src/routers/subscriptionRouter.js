const express = require('express');

const SubscriptionController = require('../controllers/subscriptionController.js');
const {SubscriptionRoutes} = require('../constants/routesConstants.js');

const subscriptionRouter = express.Router();
const subscriptionController = new SubscriptionController();

subscriptionRouter.post(SubscriptionRoutes.SUBSCRIBE, subscriptionController.subscribe.bind(subscriptionController));

subscriptionRouter.get(SubscriptionRoutes.CONFIRM, subscriptionController.confirm.bind(subscriptionController));

subscriptionRouter.get(SubscriptionRoutes.UNSUBSCRIBE, subscriptionController.unsubscribe.bind(subscriptionController));

module.exports = subscriptionRouter;
