const m = require('mithril');
const store = require('./store').store;
const WeatherPicker = require('./weather-picker');

function send(type) {
  function sendValue(value) {
    store.dispatch({
      type: type,
      value: value
    });
  }
  return m.withAttr('value', sendValue);
}

function controller() {
  return {
    updateZip1: send('ZIP_CHANGE_1'),
    updateZip2: send('ZIP_CHANGE_2'),
  };
}

function view(ctrl) {
  const state = store.getState();
  return m('.weatherdiff',
    m.component(WeatherPicker, {
      key: '1',
      place: state.place1,
      updateZip: ctrl.updateZip1
    }),
    m.component(WeatherPicker, {
      key: '2',
      place: state.place2,
      updateZip: ctrl.updateZip2
    }),
    m('div', 'ZIP1: ', state.place1.zip),
    m('div', 'ZIP2: ', state.place2.zip)
  );
}

exports.controller = controller;
exports.view = view;
