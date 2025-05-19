const emailSubjectConfirmation = 'Weather Forecast Subscription';


const emailTextSubscribed = (link) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<style>

.button {
  background-color: white; 
  color: black; 
  border: 2px solid #04AA6D;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

}

.button:hover {
  background-color: #04AA6D;
  color: white;
}

</style>
</head>
<body>
    <p>Please confirm your email:</p>
  <a href="${link}" target="_blank"><button class="button">Confirm email</button></a>
</body>
</html>`;



const emailTextConfirmed = (link) =>`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<style>

.button {
  background-color: white; 
  color: black; 
  border: 2px solid #b61010;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

}

.button:hover {
  background-color: #b61010;
  color: white;
}

</style>
</head>
<body>
    <p>Hello, your email has been confirmed.</p>
    <p>To unsubscribe use link:</p>
  <a href="${link}" target="_blank"><button class="button">Unsubscribe</button></a>
</body>
</html>`;


const emailUpdateSubjectHourly = (frequency) => `${frequency} Weather Update`;

const emailUpdateText = (weather, city) => `The weather in ${city}:\n
the temperature is ${weather.temperature} in Celsius,\n
the humidity is ${weather.humidity}%.\n
${weather.description}.`;

module.exports = {emailSubjectConfirmation, emailTextSubscribed, emailUpdateSubjectHourly, emailUpdateText, emailTextConfirmed};