const React = require('react');
const R = React.createElement;

const TEMP_SUFFIX = ' ºF';
const WIND_SUFFIX = ' mph';
const SEPARATOR = ' / ';

function formatTemp(temp) {
  if (typeof temp === 'number') {
    return temp.toFixed(0) + TEMP_SUFFIX;
  } else {
    return EM_DASH + TEMP_SUFFIX;
  }
}

function render() {
  const w = this.props.weather;
  const template = 'http://icons.wxug.com/i/c/j/<ICON>.gif';
  const src = template.replace('<ICON>', w.icon);
  return R('div', {className: 'weathercard'},
    R('img', {className: 'weather-icon', src: src}),
    R('div', {className: 'city'}, w.city),
    R('div', {className: 'temperature'}, formatTemp(w.temperature)),
    R('div', {className: 'details'},
      R('span', {className: 'wind'}, w.wind + WIND_SUFFIX),
      SEPARATOR,
      R('span', {className: 'weather'}, w.weather)
    )
  );
}

const WeatherCard =
  React.createClass({
    displayName: 'WeatherCard',
    render: render
  });

exports.WeatherCard = WeatherCard;
