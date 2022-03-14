// 实现 (5).add(3).minus(2) 功能。
Number.prototype._add = function(val){
  console.log('this')
  return this.valueOf()+val;
}
Number.prototype._minus = function(val){
  return this.valueOf() - val;
}

console.log((8)._add(1)._minus(5))


// var  . 语法的优先级比 = 高
var a = {n:1}
var b = a;
a.x =  a = {n:2};// a = {n:2}  {n:2,x:{}}
console.log(a,a.x)
console.log(b.x)

// var aa ;
// var bb;
// aa = bb = 2;
// console.log(aa,bb)
