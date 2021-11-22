/*
 * @Author: nemo
 * @Date: 2021-02-20 16:02:01
 * @LastEditTime: 2021-11-22 15:22:20
 * @LastEditors: Please set LastEditors
 * @Description: 手写Javascript数组方法
 * @FilePath: /about-js-basic/arrayFunc.js
 */

/**
 * 手写find
 * @param {*} callback 
 * @returns 
 */
Array.prototype._find = function(callback) {
  if(typeof callback !== 'function') {
    throw new Error('callback is not a function');
  }

  for(let value of this) {
    if(callback(value)) {
      return value;
    }
  }
}

let arr = [1,2,3,4,5,6,7]
// console.log(arr._find(i => i === 2))  // 2

/**
 * 手写reduce
 * @param {*} callback 
 * @param {*} initialValue 若没有initialValue,则数组第0个作为initialValue, 而curIndex指到1
 */
Array.prototype._reduce = function(callback, initialValue) {
   let arr = this;
   let accumulator = initialValue || initialValue === 0 ? initialValue : arr[0];
   let curIndex = initialValue || initialValue === 0 ? 0 : 1;

   for(let i = curIndex; i < arr.length; i+=1) {
    accumulator = callback(accumulator, arr[i], i, arr);
   }
  
   return accumulator;
}

console.log(arr.reduce((sum, cur) => sum+cur));
console.log(arr._reduce((sum, cur) => sum+cur)); // 28
