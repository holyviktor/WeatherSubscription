const express = require('express');

const WeatherController = require('../controllers/weatherController.js');
const {WeatherRoutes} = require('../constants/routesConstants.js');

const weatherRouter = express.Router();
const weatherController = new WeatherController();

weatherRouter.get(WeatherRoutes.GET, weatherController.getWeatherByCity.bind(weatherController));

module.exports = weatherRouter;
