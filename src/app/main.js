const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');
const store = require('./store').store;
const WeatherDiff = require('./weather-diff').WeatherDiff;

const R = React.createElement;

const root = document.getElementById('root');
const component =
  R(ReactRedux.Provider, {store: store},
    R(WeatherDiff)
  );
ReactDOM.render(component, root);
