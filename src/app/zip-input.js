const React = require('react');
const R = React.createElement;

function onInput(props, event) {
  const text = event.target.value.trim();
  props.updateZip(text);
}

function ZipInput(props) {
  return R('div', {className: 'zipinput'},
    R('label', {},
      'ZIP Code',
      R('input', {
        placeholder: 'e.g. 97217',
        key: props.key,
        value: props.value,
        onInput: onInput.bind(null, props)
      })
    )
  );
}

exports.ZipInput = ZipInput;
