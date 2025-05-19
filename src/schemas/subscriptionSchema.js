const { Schema, model } = require('mongoose');

const subscriberSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },

    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },

    frequency: {
        type: String,
        required: [true, 'Update frequency is required'],
        enum: {
            values: ['daily', 'hourly'],
            message: '{VALUE} is not a valid frequency. Must be daily or hourly'
        }
    },

    isConfirmed: {
        type: Boolean,
        default: false
    }
});


const Subscriber = model('Subscriber', subscriberSchema);

module.exports = Subscriber;