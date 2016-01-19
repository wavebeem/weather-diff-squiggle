const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

function get(url) {
  return request(url);
}

function getJSON(url) {
  return get(url).then(r => r.toJSON());
}

exports.getJSON = getJSON;
