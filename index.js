const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./src/app.js');
const {EmailScheduler} = require("./src/jobs/emailScheduler.js");

dotenv.config();

const port = process.env.SERVER_PORT || 3001;

const checkEnvVariables = () => {
    if (!process.env.DB_CONNECTION_STRING) {
        throw new Error('No database connection string in environment variables!');
    }
    if (!process.env.WEATHER_API_KEY) {
        throw new Error('No weather api key in environment variables!');
    }
    if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
        throw new Error('No user email credentials in environment variables!');
    }
    if (!process.env.SECRET_KEY) {
        throw new Error('No jwt secret key in environment variables!');
    }
    if (!process.env.MESSAGE_HOST) {
        throw new Error('No host for confirming email in environment variables!');
    }
};

const main = async () => {
    checkEnvVariables();

    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to database.');

    const scheduler = new EmailScheduler();
    scheduler.start();

    app.listen(port, ()=>{
        console.log(`Express is running on port ${port}`);
    });
};

main();