const express = require('express');
const validators = require('./validators');
const WU_API_KEY = require('./wu-api-key');
const WU = require('./weather-underground').withKey(WU_API_KEY);

const STATIC_ROOT = __dirname + '/../app';

// The client only needs a small subset of the data from Wunderground, so only
// send that. Also, the front-end doesn't want decimal precision.
function extractWeatherData(data) {
  const d = data.current_observation;
  return {
    city: d.display_location.full,
    weather: d.weather,
    temperature: Math.floor(d.temp_f),
    wind: Math.floor(d.wind_mph),
    icon: d.icon
  };
}

function Index(req, res) {
  res.sendFile('index.html', {root: STATIC_ROOT});
}

function Weather(req, res) {
  const zip = req.params.zip;
  const ok = validators.zip(zip);
  if (ok) {
    WU.weather(zip)
      .then(extractWeatherData)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(500));
  } else {
    res.status(400).send({message: 'Invalid ZIP code'});
  }
}

const Static = express.static(STATIC_ROOT);

exports.Static = Static;
exports.Index = Index;
exports.Weather = Weather;
