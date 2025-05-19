const Subscriber = require('../../src/schemas/subscriptionSchema.js');
const app = require('../../src/app.js');
const request = require("supertest");
const {WeatherService} = require("../../src/services/weatherService");
const {TokenService} = require("../../src/services/tokenService");
const {EmailService} = require("../../src/services/emailService");

jest.mock('../../src/schemas/subscriptionSchema.js');

jest.mock("../../src/services/WeatherService");
jest.mock("../../src/services/TokenService");
jest.mock("../../src/services/EmailService");

const subscribeRequestBodyExisting = {
    email: "test@gmail.com",
    city: "test",
    frequency: "daily"
};

const subscribeRequestBodyInvalid = {
    email: "wrong-email",
    city: "test",
    frequency: "wrong-frequency"
};

const subscribeRequestBodyValid = {
    email: "victoria.fox@gmail.com",
    city: "Kyiv",
    frequency: "daily"
};

it('should send a status code of 409 when email already exists', async () => {
    Subscriber.findOne.mockImplementationOnce(() => ({
        email: "test@gmail.com",
        city: "test",
        frequency: "daily",
        isConfirmed: true
    }));

    const response = await request(app)
        .post('/subscribe')
        .send(subscribeRequestBodyExisting);

    expect(response.status).toBe(409);
    expect(response.text).toBe('Email already subscribed');
});

it('should send a status code of 400', async () => {
    const response = await request(app)
        .post('/subscribe')
        .send(subscribeRequestBodyInvalid);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid input');
});

it('should send a status code of 200', async () => {
    Subscriber.findOne.mockImplementationOnce(null);

    Subscriber.prototype.save.mockResolvedValueOnce({
        email: "victoria.fox@gmail.com",
        city: "Kyiv",
        frequency: "daily",
        isConfirmed: false,
        _id: "some-generated-id",
    });


    WeatherService.prototype.getWeatherByCity.mockResolvedValueOnce({
        "temperature": 13.9,
        "humidity": 72,
        "description": "Patchy rain nearby"
    });

    TokenService.prototype.issueToken.mockReturnValueOnce("mock-token");

    EmailService.prototype.sendMail.mockResolvedValueOnce(true);

    const response = await request(app)
        .post('/subscribe')
        .send(subscribeRequestBodyValid);

    expect(response.status).toBe(200);
    expect(response.body).toBe('Subscription successful. Confirmation email sent.');
});

it('Confirm should send a status code of 400', async () => {

    TokenService.prototype.checkToken.mockReturnValueOnce(null);

    const response = await request(app).get('/confirm/invalidToken');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid token');
});

it('Confirm should send a status code of 200', async () => {

    TokenService.prototype.checkToken.mockReturnValueOnce('victoria.fox.h@gmail.com');

    Subscriber.findOne.mockReturnValueOnce({
        email: "victoria.fox.h@gmail.com",
        city: "Kyiv",
        frequency: "daily",
        isConfirmed: false
    });

    Subscriber.findOneAndUpdate.mockReturnValueOnce({
        email: "victoria.h@gmail.com",
        city: "Kyiv",
        frequency: "daily",
        isConfirmed: true
    });

    const response = await request(app).get('/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(response.status).toBe(200);
    expect(response.body).toBe('Subscription confirmed successfully');
});

it('Unsubscribe should send a status code of 200', async () => {

    TokenService.prototype.checkToken.mockReturnValueOnce('victoria.fox.h@gmail.com');

    Subscriber.findOne.mockReturnValueOnce({
        email: "victoria.fox.h@gmail.com",
        city: "Kyiv",
        frequency: "daily",
        isConfirmed: false
    });

    Subscriber.findOneAndDelete.mockReturnValueOnce({
        email: "victoria.h@gmail.com",
        city: "Kyiv",
        frequency: "daily",
        isConfirmed: true,
        _id: "some-generated-id",
    });

    const response = await request(app).get('/unsubscribe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(response.status).toBe(200);
    expect(response.body).toBe('Unsubscribed successfully');
});

it('Unsubscribe should send a status code of 200', async () => {

    TokenService.prototype.checkToken.mockReturnValueOnce(null);

    const response = await request(app).get('/unsubscribe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid token');
});