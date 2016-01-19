function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

exports.merge = merge;
