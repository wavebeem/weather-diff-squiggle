const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'));

function getJSON(url) {
  return request(url).then(r => r.toJSON());
}

function withKey(API_KEY) {
  var PREFIX = 'https://api.wunderground.com/api/' + API_KEY;

  function weather(zipCode) {
    const url = PREFIX + '/conditions/q/' + zipCode + '.json';
    return getJSON(url)
      .then(x => x.body)
      .then(JSON.parse);
  }

  return {weather};
}

exports.withKey = withKey;
