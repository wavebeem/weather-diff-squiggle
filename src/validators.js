const REGEX_ZIP = /^[0-9]{5}$/;

function zip(str) {
  return REGEX_ZIP.test(str);
}

exports.zip = zip;
