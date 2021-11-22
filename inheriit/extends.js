function Parent(name) {
  this.name = name;
  this.sayHi = () => {
    console.log('say hi');
  }
}

Parent.prototype = {
  constructor: Parent,
  say: function() {
    console.log('dede', this.name);
  }
}

function Child(name, age) {
  // 继承属性
  Parent.call(this, name);
  this.age = age;
}

// 子类的原型指向父类实例
// Child.prototype = new Parent();
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Parent();

const child = new Child('123', 12);
/**
 * 输出结果
 * dede 123
 */
child.say();
/**
 * 输出结果
 * say hi
 */
child.sayHi();
/**
 * 输出结果
 * 123
 */
console.log(child.name);