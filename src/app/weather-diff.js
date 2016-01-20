const React = require('react');
const ReactRedux = require('react-redux');
const store = require('./store').store;
const WeatherPicker = require('./weather-picker').WeatherPicker;

const R = React.createElement;

function render() {
  return R('div', {className: 'weatherdiff'},
      this.createSummary(),
      R('div', {className: 'cardholder'},
        R(WeatherPicker, {
          key: '1',
          place: this.props.place1,
          updateZip: this.props.updateZip1
        }),
        R(WeatherPicker, {
          key: '2',
          place: this.props.place2,
          updateZip: this.props.updateZip2
        })
      )
    );
}

const helpText = 'Enter two valid ZIP codes below to compare weather.';

function createSummary() {
  const p1 = this.props.place1;
  const p2 = this.props.place2;
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

function mapStateToProps(state) {
  return state;
}

function updateZip(dispatch, n, value) {
  return dispatch({
    type: 'ZIP_CHANGE_' + n,
    value: value
  });
}

function mapDispatchToProps(dispatch) {
  return {
    updateZip1: updateZip.bind(null, dispatch, 1),
    updateZip2: updateZip.bind(null, dispatch, 2)
  };
}

const WeatherDiff =
  React.createClass({
    displayName: 'WeatherDiff',
    createSummary: createSummary,
    render: render
  });

exports.WeatherDiff =
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherDiff);
