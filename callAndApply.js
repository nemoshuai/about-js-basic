Function.prototype._call = function() {
  const [context, ...args] = [...arguments];
  context.func = this; // this为当前调用的方法，绑定到传入context中;

  const res = args.length === 0 ? context.func() : context.func(...args);
  
  // 因为上面添加了func。为了避免污染，需要删除掉
  delete context.func;
  return res;
}

Function.prototype._apply = function() {
  const [context, args] = [...arguments];
  context.func = this; // this为当前调用的方法，绑定到传入context中;

  const res = args.length === 0 ? context.func() : context.func(...args);
  
  // 因为上面添加了func。为了避免污染，需要删除掉
  delete context.func;
  return res;
}

const java = {
  language: 'java',
  say: function() {
    console.log(...arguments);
    return this.language;
  }
};

const javascript = {
  language: 'javascript',
};

console.log(java.say());
console.log(java.say.call(javascript, '1', '2', '3'));
console.log(java.say.apply(javascript, ['1', '2', '3']));

console.log(java.say._call(javascript, '1', '2', '3'));
console.log(java.say._apply(javascript, ['1', '2', '3']));