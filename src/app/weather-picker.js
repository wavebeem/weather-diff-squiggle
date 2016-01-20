const React = require('react');
const WeatherCard = require('./weather-card').WeatherCard;
const ZipInput = require('./zip-input').ZipInput;
const R = React.createElement;

// Put a ZipInput before the element passed in
function wrap(props, items) {
  const input =
    R(ZipInput, {
      key: props.key,
      value: props.place.zip,
      updateZip: props.updateZip
    });
  return R('div', {className: 'weatherpicker'}, input, items);
}

function message(props, text) {
  return wrap(props, R('div', {className: 'message'}, text));
}

// Show an error message or the WeatherCard
function WeatherPicker(props) {
  if (!props.place.zipOk) {
    return message(props, 'Incorrect ZIP format.');
  } else if (!props.place.weatherOk) {
    return message(props, 'Location not found.');
  } else if (props.place.weather !== null) {
    return wrap(props, R(WeatherCard, {weather: props.place.weather}));
  } else {
    return message(props, 'Loading…');
  }
}

exports.WeatherPicker = WeatherPicker;
