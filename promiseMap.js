/*
 * @Author: your name
 * @Date: 2021-12-05 15:37:49
 * @LastEditTime: 2021-12-05 15:54:52
 * @LastEditors: Please set LastEditors
 * @Description: 并发
 * @FilePath: /about-js-basic/promiseMap.js
 */

function promiseMap(list, iterator, currency = Infinity) {
  return new Promise((resolve, reject) => {
    let result = [];
    let currentIndex = 0;
    let resolveCount = 0;
    let len = Math.min(list.length, currency);
    function next() {
      const index = currentIndex;
      currentIndex++;
      Promise.resolve(list[index]).then(res => iterator(res, index)).then(res => {
        result[index] = res;
        resolveCount++;
        if(resolveCount === len) {
          resolve(result);
        }
        else if(currentIndex < len){
          next()
        }
      })
    }
    for(let i = 0; i < len && i < currency; i+=1) {
      next()
    }
  });
}

promiseMap([1,2,3,4,5], x => `value:${x}`).then(res => {
  console.log('res', res)
})
