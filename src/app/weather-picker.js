const React = require('react');
const WeatherCard = require('./weather-card').WeatherCard;
const R = React.createElement;

function onInput(event) {
  this.props.updateZip(event.target.value.trim());
}

function render() {
  return R('div', {className: 'weatherpicker'},
    R('input', {
      className: 'zip',
      placeholder: 'e.g. 97217',
      key: this.props.key,
      value: this.props.place.zip,
      onInput: this.onInput
    }),
    R(WeatherCard, {weather: this.props.place.weather})
  );
}

const WeatherPicker =
  React.createClass({
    displayName: 'WeatherPicker',
    render: render,
    onInput: onInput
  });

exports.WeatherPicker = WeatherPicker;
