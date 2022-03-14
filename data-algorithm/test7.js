// 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

// '123564' '356'
function foo(S,T){
  const n = S.length;
  const m = T.length;

  let pos = 0;

  let startIdx = S.indexOf(T[0]);// first el

  // pos = startIdx;
  let res = [];
  let find = false;
  while(!find && startIdx !== -1){
    // console.log('==startIdx',startIdx)
    if((n-startIdx) < m) {
      break;
    }
    for (let i = startIdx; i < n; i++) {
      const elm = S[i];
      if(elm !== T[pos]){
        // 失败
        // console.log(S.slice(i-1))
        console.log(S.slice(i-1).indexOf(T[0]))
        startIdx = S.slice(i-1).indexOf(T[0]) + startIdx
        console.log('startIdx',startIdx)
        res = []
        pos = 0;
        break;
      }else{
        res.push(elm)
      }
      pos++;
      
    }
    if(res.length === m) {
      find = true;
    }
}
  return startIdx;

}

console.log(foo('1234567', '345'));