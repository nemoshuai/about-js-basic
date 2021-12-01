/*
 * @Author: nemo
 * @Date: 2021-12-01 09:05:36
 * @LastEditTime: 2021-12-01 09:25:03
 * @LastEditors: Please set LastEditors
 * @Description: Least recently used 最近最少使用, 保护最近被访问过的数据，淘汰最长时间没被访问过的数据
 * @FilePath: /about-js-basic/LRU.js
 */

/**
 * 一般采用hashmap+双链表，双链表在于频繁删除节点。
 * 新数据插入尾部，每当缓存命中，将数据移到末尾，缓存满时，删除头部数据
 * js map.keys() 返回的是插入顺序可迭代的键值列表 map.keys().next() 从头迭代
 */

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map()
  }

  // 访问某个值
  get(key) {
    if(this.cache.has(key)) {
      const temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }

    return -1;
  }
  
  // 添加新缓存
  put(key, value) {
    if(this.cache.has(key)) {
      this.cache.delete(key)
    } else if(this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value)
  }
  
  toString() {
    console.table(this.cache)
  }
}

let lru = new LRU(3)
lru.put(2,1);
lru.put(3,3);
lru.put(4,4);
lru.put(1,1);
console.log(lru.get(2));
console.log(lru.get(3));
lru.put(5,5);
console.log(lru.get(4));
lru.toString()