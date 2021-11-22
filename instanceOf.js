// 判断a对象的原型链上是否存在b构造函数的prototype

// 递归
const _instanceOf1 = (a, b) => {
  const prototype = b.prototype;
  if(a.__proto__ === b.prototype) return true;
  if(a.__proto__ === null) return false;
  return _instanceOf1(a.__proto__, b);  
}

// 循环
const _instanceOf2 = (a, b) => {
  const prototype = b.prototype;
  let proto = a.__proto__;
  while(true) {
    if(proto === prototype) return true;
    if(proto === null) return false;
    proto = proto.__proto__;
  }
}


function Person(id) {
  this.id = id;
}

Person.prototype = {
  species: 'human',
}

const p1 = new Person('123');

function Person1(id) {
  const obj = {};
  obj.__proto__ = Person1.prototype;
  obj.id = id;
  return obj;
}

Person1.prototype = {
  species: 'human',
}

const p2 = Person1('123');

_instanceOf1(p1, Person);
_instanceOf2(p2, Person1);

console.log(_instanceOf1(p1, Person));
console.log(_instanceOf1(p2, Person));
console.log(_instanceOf2(p2, Person1));
console.log(_instanceOf2(p1, Person1));