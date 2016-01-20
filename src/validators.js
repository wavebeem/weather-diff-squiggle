const REGEX_ZIP = /^[0-9]{5}$/;

function zip(str) {
  if (REGEX_ZIP.test(str)) {
    return [true, str];
  } else {
    return [false, 'Not a valid ZIP code. Should be 5 digits (0-9).'];
  }
}

exports.zip = zip;
