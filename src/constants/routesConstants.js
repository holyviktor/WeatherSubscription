const weatherAPIRoute = 'https://api.weatherapi.com/v1';
const weatherAPICurrent = '/current.json?';

const WeatherRoutes = {
    GET: '/weather',
};

const SubscriptionRoutes = {
    SUBSCRIBE: '/subscribe',
    CONFIRM: '/confirm/:token',
    UNSUBSCRIBE: '/unsubscribe/:token',
};

module.exports = {weatherAPICurrent, SubscriptionRoutes, WeatherRoutes, weatherAPIRoute};
