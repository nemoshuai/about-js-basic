const curry = function(){
  const [func, ...args] = [...arguments];
  // func.length ,length是func调用应有的参数个数
  const len = func.length;
  return function () {
    const newArgs = Array.prototype.concat.call([...arguments], args); // 合并参数

    if(len > newArgs.length) {
      // 参数不够，继续递归
      return curry.call(this, func, ...newArgs);
    }

    // 参数齐全
    return func.call(this, ...newArgs);
  }
}

const add = function(a, b) {
  return a + b;
}

const addFunCurry= curry(add);
console.log(addFunCurry(1)(2));