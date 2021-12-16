/*
 * @Author: nemo
 * @Date: 2021-12-05 14:30:51
 * @LastEditTime: 2021-12-05 14:37:50
 * @LastEditors: Please set LastEditors
 * @Description: lodash.groupBy
 * @FilePath: /about-js-basic/groupBy.js
 */

function groupBy(list, iterator) {
  return list.reduce((acc, x) => {
    if(acc[iterator(x)]) acc[iterator(x)].push(x);
    else {
      acc[iterator(x)] = [x];
    }
    return acc;
  }, {})
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

console.log(groupBy(list, x => x.id));