/*
 * @Author: nemo
 * @Date: 2021-12-05 14:18:49
 * @LastEditTime: 2021-12-05 14:30:06
 * @LastEditors: Please set LastEditors
 * @Description: 实现maxBy 获取满足条件的最大的数组项
 * @FilePath: /about-js-basic/maxBy.js
 */

function maxBy(list, iterator) {
  return list.reduce((x, y) => iterator(x) > iterator(y) ? x : y)
}

// 返回多个
function maxBy1(list, iterator) {
  return list.slice(1).reduce((acc, x) => {
    if(iterator(x) > iterator(acc[0])) {
      return [x];
    } else {
      return [...acc, x]
    }
  }, [list[0]])
}

const list = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 2,
  }
]

console.log(maxBy(list, x => x.id));
console.log(maxBy1(list, x => x.id));