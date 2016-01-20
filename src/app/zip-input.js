const React = require('react');
const validators = require('../validators');
const R = React.createElement;

function onInput(event) {
  const text = event.target.value.trim();
  this.props.updateZip(text);
}

function render() {
  return R('div', {className: 'zipinput'},
    R('label', {},
      'ZIP Code',
      R('input', {
        placeholder: 'e.g. 97217',
        key: this.props.key,
        value: this.props.value,
        onInput: this.onInput
      })
    )
  );
}

const ZipInput =
  React.createClass({
    displayName: 'ZipInput',
    render: render,
    onInput: onInput
  })

exports.ZipInput = ZipInput;
