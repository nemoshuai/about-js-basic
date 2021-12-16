/*
 * @Author: nemo
 * @Date: 2021-12-08 10:38:01
 * @LastEditTime: 2021-12-08 10:58:44
 * @LastEditors: Please set LastEditors
 * @Description: 实现json.stringify
 * @FilePath: /about-js-basic/JsonStringify.js
 */

var mockJSON = {
  parse: function(jsonStr) {
    return eval('(' + jsonStr + ')');
  },
  stringify: function(jsonObj) {
    if(jsonObj === null) {
      return String(jsonObj)
    }

    switch(typeof jsonObj) {
      case 'number':
      case 'boolean':
        return String(jsonObj);
      case 'string':
        return `"${jsonObj}"`;
      case 'symbol':
      case 'undefined':
      case 'function':
        return 'undefined';
    }

    let result = '', curVal;
    switch(Object.prototype.toString.call(jsonObj)) {
      case '[object Array]':
        result+='[';
        for(let i = 0; i < jsonObj.length; i+=1) {
          curVal = mockJSON.stringify(jsonObj[i]);
          result += `${curVal === 'undefined' ? 'null' : curVal}${i < jsonObj.length - 1 ? ',' : ''}`;
        }

       result += ']';
       return result;
      case '[object Date]':
        return `"${jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()}"`;
      case '[object RegEpx]':
        return "{}";
      case '[object Object]':
        result += '{';
        const keys =  Object.keys(jsonObj);
        keys.forEach((key,index) => {
          curVal = mockJSON.stringify(jsonObj[key]);
          if(curVal !== undefined) {
            result += `${key}:${curVal}${index < keys.length - 1 ? ',' : ''}`;
          }
        })
        result += '}';
        return result;
      case '[object String]':
        return `"${jsonObj.toString()}"`;
      case '[object Number]':
      case '[object Boolean]':
        return jsonObj.toString();
    }
  }
}

console.log(mockJSON.stringify( 
  [undefined, Object, Symbol("")]
));