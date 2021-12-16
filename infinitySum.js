/*
 * @Author: your name
 * @Date: 2021-12-05 16:34:17
 * @LastEditTime: 2021-12-05 16:38:59
 * @LastEditors: Please set LastEditors
 * @Description: 无限累加
 * @FilePath: /about-js-basic/infinitySum.js
 */

function sum(...args) {
  const f = (...rest) => sum(...args, ...rest);
  f.valueOf = () => args.reduce((x, y) => x + y)
  return f;
}

const a = sum(1, 2, 3).valueOf() //6
const b = sum(2, 3)(2).valueOf() //7
const c = sum(1)(2)(3)(4).valueOf() //10
const d = sum(2)(4, 1)(2).valueOf() //9
const e = sum(1)(2)(3)(4)(5)(6).valueOf() // 21

console.log(a, b, c, d, e)