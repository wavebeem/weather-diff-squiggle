const m = require('mithril');

function controller(opts) {
  return {
    key: opts.key,
    place: opts.place,
    updateZip: opts.updateZip,
  };
}

function view(ctrl) {
  console.log('SHOWING ZIP AS ', ctrl.place);
  return m('.weatherpicker',
    m('input.zip', {
      key: ctrl.key,
      value: ctrl.place.zip,
      oninput: ctrl.updateZip
    }),
    m('pre', JSON.stringify(ctrl.place))
  );
}

exports.controller = controller;
exports.view = view;
