const React = require('react');
const ReactRedux = require('react-redux');
const WeatherPicker = require('./weather-picker').WeatherPicker;

const R = React.createElement;

function WeatherDiff(props) {
  return R('div', {className: 'weatherdiff'},
      createSummary(props),
      R('div', {className: 'cardholder'},
        R(WeatherPicker, {
          key: '1',
          place: props.place1,
          updateZip: props.updateZip1
        }),
        R(WeatherPicker, {
          key: '2',
          place: props.place2,
          updateZip: props.updateZip2
        })
      )
    );
}

const helpText = 'Enter two valid ZIP codes below to compare weather.';

// Either show a summary or help text depending on weather data existing
function createSummary(props) {
  const p1 = props.place1;
  const p2 = props.place2;
  var w1 = p1.weather;
  var w2 = p2.weather;
  if (w1 && w2) {
    const t1 = w1.temperature;
    const t2 = w2.temperature;
    const c1 = w1.city + ' (' + p1.zip + ')';
    const c2 = w2.city + ' (' + p2.zip + ')';
    const dt = t1 - t2;
    return R('div', {className: 'summary'}, formatDiff(c1, c2, dt));
  } else {
    return R('div', {className: 'summary'}, helpText);
  }
}

// Format the actual weather diff text, swapping the order of the locations so
// that we only use the word 'warmer' and not the word 'cooler'
function formatDiff(c1, c2, dt) {
  c1 = formatCity(c1);
  c2 = formatCity(c2);
  const diff = Math.abs(dt);
  if (dt < 0) {
    return R('span', {}, c2, ' is ', diff, ' ºF warmer than ', c1, '.');
  } else if (dt > 0) {
    return R('span', {}, c1, ' is ', diff, ' ºF warmer than ', c2, '.');
  } else {
    return R('span', {}, c1, ' is the same temperature as ', c2, '.');
  }
}

function formatCity(cityName) {
  return R('span', {className: 'city-name'}, cityName);
}

// Pass the entire state from store.js to WeatherDiff since it's our root
function mapStateToProps(state) {
  return state;
}

// Helper to dispatch changes to ZIP codes
function updateZip(dispatch, n, value) {
  return dispatch({
    type: 'ZIP_CHANGE_' + n,
    value: value
  });
}

// Wrap up calls to dispatch so subcomponents just use regular functions and are
// shielded from the Redux implementation details
function mapDispatchToProps(dispatch) {
  return {
    updateZip1: updateZip.bind(null, dispatch, 1),
    updateZip2: updateZip.bind(null, dispatch, 2)
  };
}

// Wrap WeatherDiff with a ReactRedux connector so it can have its state managed
// automatically by Redux
exports.WeatherDiff =
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherDiff);
