/*
 * @Author: nemo
 * @Date: 2021-12-05 14:11:23
 * @LastEditTime: 2021-12-05 14:18:10
 * @LastEditors: nemo
 * @Description: lodash.keyBy
 * @FilePath: /about-js-basic/keyBy
 */

/**
 * 创建一个对象组成， key（键） 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果。 
 * 每个 key（键）对应的值是生成key（键）的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。
 */
function keyBy(list, iterator) {
  return list.reduce((acc, item) => {
    acc[iterator(item)] = item;
    return acc;
  }, {})
}

console.log(keyBy([1,2,3,4,5], x => `${x+1}`))
