/*
 * @Author: your name
 * @Date: 2022-01-04 14:28:19
 * @LastEditTime: 2022-01-12 15:47:00
 * @LastEditors: Please set LastEditors
 * @Description: async/await generator实现原理
 * @FilePath: /about-js-basic/asyncAwait.js
 */


function fn(nums) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(nums * 2)
    }, 1000)
  })
}

function* gen() {
  const num1 = yield fn(1)
  console.log('num1', num1);
  const num2 = yield fn(num1)
  console.log('num2', num2);
  const num3 = yield fn(num2)
  console.log('num3', num3);
  return num3
}

function generator(generatorFun) {
  return function() {
    const gen = generatorFun.apply(this, arguments)
 
    return new Promise((resolve, reject) => {
      function go(key, args) {
         let res
         try {
           res = gen[key](args) // 如果key == 'next' 即为gen.next(args) 调用下一个
         } catch(error) {
           return reject(error)
         }

         const { value, done } = res;
         if(done) { // 已经执行结束，resolve结果
            return resolve(res)
         } else {
           // 返回新的promise
           return Promise.resolve(value).then(val => go('next', val), err => go('throw', err))
         }
      }

      go('next')
    })
  }
}

const asyncfun = generator(gen)

asyncfun().then(val => console.log(val))
