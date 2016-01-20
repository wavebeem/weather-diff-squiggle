const React = require('react');
const R = React.createElement;

const EM_DASH = '—';
const TEMP_SUFFIX = ' ºF';
const WIND_SUFFIX = ' mph';
const SEPARATOR = ' / ';

const emptyWeather = {
  city: EM_DASH,
  weather: EM_DASH,
  temperature: null,
  wind: EM_DASH,
  icon: 'mostlycloudy',
};

function formatTemp(temp) {
  if (typeof temp === 'number') {
    return temp.toFixed(0) + TEMP_SUFFIX;
  } else {
    return EM_DASH + TEMP_SUFFIX;
  }
}

function render() {
  const weather = this.props.weather || emptyWeather;
  const template = 'http://icons.wxug.com/i/c/j/<ICON>.gif';
  const src = template.replace('<ICON>', weather.icon);
  return R('div', {className: 'weathercard'},
    R('img', {className: 'weather-icon', src: src}),
    R('div', {className: 'city'}, weather.city),
    R('div', {className: 'temperature'}, formatTemp(weather.temperature)),
    R('div', {className: 'details'},
      R('span', {className: 'wind'}, weather.wind + WIND_SUFFIX),
      SEPARATOR,
      R('span', {className: 'weather'}, weather.weather)
    )
  );
}

const WeatherCard = React.createClass({render: render});

exports.WeatherCard = WeatherCard;
