const CustomError = require('../models/customError.js');
const {WeatherService} = require('../services/weatherService.js');

class WeatherController {
    constructor() {
        this.weatherService = new WeatherService();
    }

    async getWeatherByCity(req, res, next) {

        try {
            const city = req.query.city;
            if (!city) {
                next(new CustomError(400, 'Invalid request'));
            }
            res.json(await this.weatherService.getWeatherByCity(city));

        }catch (error) {
            next(error);
        }
    }
}

module.exports = WeatherController;