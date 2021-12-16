/*
 * @Author: once
 * @Date: 2021-12-05 15:01:00
 * @LastEditTime: 2021-12-05 15:09:18
 * @LastEditors: Please set LastEditors
 * @Description: lodash.once
 * @FilePath: /about-js-basic/once.js
 */

function once(fn) {
  let result;
  let revoked = false; // 是否已经被调用
  return function(...args) {
    if(revoked) return result;
    result = fn(...args);
    revoked = true;
    return result;
  }
}

