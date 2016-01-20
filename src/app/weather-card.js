const React = require('react');
const R = React.createElement;

const TEMP_SUFFIX = ' ºF';
const WIND_SUFFIX = ' mph';
const SEPARATOR = ' / ';

function formatTemp(temp) {
  return temp.toFixed(0) + TEMP_SUFFIX;
}

function formatWind(wind) {
  return wind.toFixed(0) + WIND_SUFFIX;
}

function WeatherCard(props) {
  const w = props.weather;
  const template = 'http://icons.wxug.com/i/c/j/<ICON>.gif';
  const src = template.replace('<ICON>', w.icon);
  return R('div', {className: 'weathercard'},
    R('img', {className: 'weather-icon', src: src}),
    R('div', {className: 'city'}, w.city),
    R('div', {className: 'temperature'}, formatTemp(w.temperature)),
    R('div', {className: 'details'},
      R('span', {className: 'wind'}, formatWind(w.wind)),
      SEPARATOR,
      R('span', {className: 'weather'}, w.weather)
    )
  );
}

exports.WeatherCard = WeatherCard;
