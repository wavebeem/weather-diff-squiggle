const React = require('react');
const ReactRedux = require('react-redux');
const store = require('./store').store;
const WeatherPicker = require('./weather-picker').WeatherPicker;

const R = React.createElement;

function render() {
  return R('div', {className: 'weatherdiff'},
      R('div', {}, this.props.message),
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
    );
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    updateZip1: value => dispatch({
      type: 'ZIP_CHANGE_1',
      value: value
    }),
    updateZip2: value => dispatch({
      type: 'ZIP_CHANGE_2',
      value: value
    })
  };
}

const WeatherDiff =
  React.createClass({
    displayName: 'WeatherDiff',
    render: render
  });

exports.WeatherDiff =
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherDiff);
