const m = require('mithril');

const Demo = {
  controller: () => ({message: 'Hello world!'})
  // view: ctrl => m('div', )
};
const root = document.getElementById('root');

m.mount(root, Demo);
