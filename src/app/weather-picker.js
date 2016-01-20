const React = require('react');
const WeatherCard = require('./weather-card').WeatherCard;
const ZipInput = require('./zip-input').ZipInput;
const R = React.createElement;

function wrap(items) {
  const input =
    R(ZipInput, {
      key: this.props.key,
      value: this.props.place.zip,
      updateZip: this.props.updateZip
    });
  return R('div', {className: 'weatherpicker'}, input, items);
}

function message(text) {
    return this.wrap(R('div', {className: 'message'}, text));
}

function render() {
  if (!this.props.place.zipOk) {
    return this.message('Incorrect ZIP format.');
  } else if (!this.props.place.weatherOk) {
    return this.message('Location not found.');
  } else if (this.props.place.weather !== null) {
    return this.wrap(R(WeatherCard, {weather: this.props.place.weather}));
  } else {
    return this.message('Loading…');
  }
}

const WeatherPicker =
  React.createClass({
    displayName: 'WeatherPicker',
    message: message,
    wrap: wrap,
    render: render
  });

exports.WeatherPicker = WeatherPicker;
