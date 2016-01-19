var Request = require('./request');

function withKey(API_KEY) {
  var PREFIX = 'https://api.wunderground.com/api/' + API_KEY;

  function weather(zipCode) {
    const url = PREFIX + '/conditions/q/' + zipCode + '.json';
    return Request.getJSON(url)
      .then(x => x.body)
      .then(JSON.parse);
  }

  return {weather};
}

exports.withKey = withKey;
