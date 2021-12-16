/*
 * @Author: nemo
 * @Date: 2021-12-08 12:14:11
 * @LastEditTime: 2021-12-08 12:16:10
 * @LastEditors: Please set LastEditors
 * @Description: 实现串行队列
 * @FilePath: /about-js-basic/serialQueue.js
 */
class Queue {
  constructor() {
      this.queue = [];
  }

  async start() {
      for(let i = 0; i < this.queue.length; i+=1) {
          await this.queue[i]();
      }
  }

  task(delay, callback) {
      const p = () => {
          return new Promise((resolve) => {
              setTimeout(() => {
                  callback()
                  resolve()
              }, delay)
          })
      }
      this.queue.push(p);
      return this;
  }
}

new Queue()
.task(1000, () => {
  console.log(1)
})
.task(2000, () => {
  console.log(2)
})
.task(1000, () => {
  console.log(3)
})
.start()