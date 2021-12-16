// 事件循环
/**
 * 宏任务:
 * script 整体代码
 * IO
 * UI render
 * setTimeOut
 * setInterval
 * setImmediate
 */

 /**
  * 微任务：
  * process.nextTick
  * Promise.then
  * async/await
  * mutationObverse h5新特性 监听dom的变化
  */

  /**
   * 先执行宏任务
   * 再执行宏任务产生的微任务
   * 继续微任务中产生的微任务
   * 微任务结束 回到宏任务队列中进行下一轮
   */
// console.log('script start')

// async function async1() {
// 	await async2()
// 	console.log('async1 end') // -- (1)
// }

// async function async2() {
// 	console.log('async2 end')
// }
// async1()

// setTimeout(function() {
// 	console.log('setTimeout') // -- (2)
// }, 0)

// new Promise(resolve => {
// 	console.log('Promise')
// 	resolve()
// }).then(function() { // -- (3)
// 	console.log('promise1')
// }).then(function() {
// 	console.log('promise2') // -- (4)
// })

// console.log('script end')


// 先输出'script start', 执行到async1(), async1中调用到async2，输出'async2 end', (2)是宏任务，进入宏任务队列作为下一轮，
// 执行到 new Promise,  输出 'Promise', (3)(4)是Promise.then, 进入微任务队列，输出'script end', 此次的宏任务完成，开始执行该宏任务的微任务，
// 按顺序执行(1)(3)(4)即输出'async1 end'，'promise1'，'promise2'，微任务队列清空后，进入下一轮宏任务，执行(2)，输出'setTimeout'。

/**
 * async/await执行顺序
 * 遇到await async2(), 执行完async2，是直接跳出async async1，等待注册微任务完成后 在将await async2()的后面语句注册到微任务中
 * 新版chrome，优化async/await执行较快，所以变成(1)先于(3)(4)执行
 */


console.log('script start') // -- (1)

async function async1() {
    await async2()
    console.log('async1 end') // -- (2)
}
async function async2() {
    console.log('async2 end') // -- (3)
    return Promise.resolve().then(()=>{
        console.log('async2 end1') // -- (4)
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout') // -- (5)
}, 0)

new Promise(resolve => {
    console.log('Promise') // -- (6)
    resolve()
}).then(function() {
    console.log('promise1') // -- (7)
}).then(function() {
    console.log('promise2') // -- (8)
})

console.log('script end') // -- (9)

/**
 * 先输出(1), 接着执行async1, async1调用了async2，进入async2，输出(3), async2返回了Promise.then,(4)进入微任务队列
 * 由于async1是async/await, 执行完await后，直接跳出，到setTimeout是宏任务，进入宏任务队列等下一轮，继续执行到new Promise,
 * 输出(6), (7)(8)都是Promise.then 进入微任务队列，输出(9), 这一轮宏任务执行完，开始执行该宏任务的微任务，按照队列先进先出
 * 先输出(4)(7)(8),然后把控制权交还async1, 输出(2), 微任务到此结束，执行下一轮宏任务，输出(3)
 */

 async function test() {
    console.log(1);
    setTimeout(() => {
      console.log(2);
    })
    await new Promise((resolve) => {
      console.log(3);
      setTimeout(resolve)
    }) 
    console.log(4);
  }
  
  test()

  /**
   * 输出了3后 宏任务队列里面是 第一个setTimeout，第一个setTimeout 然后此时微任务为空
   * 就去执行宏任务，拿第一个setTimeout出来 输出2，然后没有微任务，继续执行宏任务setTimeout(resolve), 
   * 这个时候promise才resolve，因为有await，所以要等resolve后才能够执行到console.log(4)
   */