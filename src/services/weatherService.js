const CustomError = require('../models/customError.js');
const {weatherAPICurrent, weatherAPIRoute} = require('../constants/routesConstants.js');

class WeatherService {
    async getWeatherByCity(city) {
        const urlParams = new URLSearchParams({
            q: city,
            key: process.env.WEATHER_API_KEY,
        }).toString();

        const response = await fetch(
            `${weatherAPIRoute}${weatherAPICurrent}${urlParams}`
        );
        if (!response.ok) {
            throw new CustomError(404, 'City not found');
        }
        const weatherInfo = await response.json();
        return {
            temperature: weatherInfo['current']['temp_c'],
            humidity: weatherInfo['current']['humidity'],
            description: weatherInfo['current']['condition']['text']
        };
    }
}

module.exports = {WeatherService};