const app = require('../../src/app.js');
const request = require("supertest");
const {WeatherService} = require("../../src/services/weatherService");

jest.mock("../../src/services/WeatherService");


it('Should send a status code of 200 when city exists', async () => {

    WeatherService.prototype.getWeatherByCity.mockReturnValueOnce(
    {
            "temperature": 13.9,
            "humidity": 72,
            "description": "Patchy rain nearby"
        }
    );
    const response = await request(app).get('/weather?city=kyiv');

    expect(response.status).toBe(200);
});
