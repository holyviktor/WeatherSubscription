# **🌦️ Weather Forecast API**

A backend service that allows users to subscribe to weather forecast updates for a selected city. Users receive regular emails based on their chosen frequency (daily or hourly) after confirming their subscription via email.

## 🧰 Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* Docker + Docker Compose
* Jest for testing
* WeatherAPI.com integration for current weather data

## 🚀 Getting Started
1. Clone the Repository

`   git clone https://github.com/holyviktor/WeatherSubscription`

2. 🚨 **Important**. Create .env file and write environmental variables. You can see example file .env.example.


3. Run with Docker

`   docker-compose up --build`

The API will be available at http://localhost:3001/.

## 📦 Features

### ✅ Subscribe to Weather Updates

POST /subscribe

Form fields:

email — User's email address,

city — City name,

frequency — daily or hourly,


**📧 Sends a confirmation email with a unique token link.**

### 🔗 Confirm Subscription

GET /confirm/{token}

**Confirms the user’s email subscription using a confirmation link sent by email.**

### ❌ Unsubscribe

GET /unsubscribe/{token}

**Unsubscribes a user via the token included in weather update emails.**

### ☁️ Get Current Weather

GET /weather?city=cityName

**Returns the current weather data for the specified city.**

Example response:

`{
"temperature": 17.5,
"humidity": 68,
"description": "Partly cloudy"
}`

### 🕒 Scheduled Email Delivery (Cron Jobs)

The service includes background tasks using Node-cron that:

* Run every hour and every day at 09:00
* Check all active subscriptions based on their frequency
* Fetch updated weather data via WeatherAPI.com
* Send weather update emails to each confirmed subscriber

These jobs are initialized at service startup and run continuously in the background.

## 🧪 Testing

`npm run test`

Includes unit tests for controllers using Jest.

