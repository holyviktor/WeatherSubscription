const express = require('express');
const weatherRouter = require('./routers/weatherRouter');
const subscriptionRouter = require('./routers/subscriptionRouter');
const {handleErrors} = require('./middlewares/errorHandlingMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(weatherRouter);
app.use(subscriptionRouter);

app.use(handleErrors);

module.exports = app;