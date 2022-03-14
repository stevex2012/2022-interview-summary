// 迭代
// 使用迭代的方式实现 flatten 函数。

// function log(...rest){
//   console.log(rest)
// }

// function *gen(){
//   yield 1;
//   yield 2;
//   yield 3;
// }
// let g = gen();
// log(g.next())
// console.log(g)
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
console.log(arr)
// 使用迭代的方式实现 flatten 函数。
function flatten(arr, result = []){
  while(arr.length){
    const currentItem = arr.shift();
    console.log('currentItem',currentItem)
    if(Array.isArray(currentItem)){
      currentItem.forEach(item => {
        if(Array.isArray(item)){
          queue = queue.concat(item)
        }else{
          result.push(item)
        }
      })
    }else{
      result.push(currentItem);
    }
  }
  return result
}
// console.log(flatten(arr))



var a = {
  val:0,
  valueOf: function(){
    ++this.val ;
    // return this.val;
    return {}
  },
  toString:function(){
    return 'yes'
  }
};

console.log(a == 'yes')
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
