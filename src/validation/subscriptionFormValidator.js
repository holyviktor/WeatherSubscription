const Joi = require('joi');

const subscriptionFormSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .description('Email address to subscribe'),

    city: Joi.string()
        .required()
        .description('City for weather updates'),

    frequency: Joi.string()
        .required()
        .valid('daily', 'hourly')
        .description('Frequency of weather updates')
});

module.exports = subscriptionFormSchema;