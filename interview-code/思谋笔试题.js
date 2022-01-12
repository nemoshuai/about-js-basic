/*
 * @Author: your name
 * @Date: 2021-12-27 19:30:34
 * @LastEditTime: 2021-12-28 15:30:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /undefined/Users/nemo/Desktop/simou.js
 */

// 扁平化数组
function flat(ary) {
  return ary.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat(cur)) : [...acc, cur],  [])
}

// console.log(flat([1,2,3,4,[9,8,7,[2,3,4],5],5,6,7]))

/** @format */

var price = [
  {
    key: '0001',
    price: 100
  },
  {
    key: '0002',
    price: 100
  },
  {
    key: '0003',
    price: 100
  },
  {
    key: '0004',
    price: 100
  }
];

var discount = [
  {
    key: '0001',
    discount: 5
  },
  {
    key: '0002',
    discount: 5
  },
  {
    key: '0003',
    discount: 5
  },
  {
    key: '0004',
    discount: 4
  }
];

// 数组组装
// [{key: '',discount: '',price: ''}]
function format(prices, discounts) {
  return prices.map(price => {
    const target = discounts.find(discount => discount.key === price.key)

    let temp = 10;
    if(target && target.discount !== 0) {
      temp = target.discount
    }

    return {
      ...price,
      discount: temp
    }
  });
}

console.log(format(price, discount))


