const isObj = val => Object.prototype.toString.call(val) === '[object Object]';

const deepClone = data => {
  function _deepClone(val) {
    if(Array.isArray(val)) {
      return val.map(item => _deepClone(item));
    }

    if(isObj(val)) {
      const res = {};
      Object.entries(val).forEach(([key, item]) => {
        res[key] = _deepClone(item);
      });

      return res;
    }

    return val;
  }

  return _deepClone(data);
}

const a = {
  foo: { baz: '1'},
  bar: '2',
};

const b = deepClone(a);

console.log(b,b === a);

const shallow = val => {
  if(Array.isArray(val)) {
    return [...val];
  }

  if(isObj(val)) {
    const res = {};
    Object.entries(val).forEach(([key, val]) => {
      res[key] = val;
    });
  }

  return val;
}

shallow([1,2,3]);
console.log(shallow({
  a: { b : 1 },
  c: 2,
}));
console.log(shallow(1));