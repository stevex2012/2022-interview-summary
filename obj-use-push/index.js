// obj use push method
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'slice': Array.prototype.slice,
  'push': Array.prototype.push,
}

obj.push(1)
obj.push(2)
console.log(obj)
/**
 * length ==> 4
 * 2:1
 * 3:3
 * will change Array? : node and browser will not change
 */
