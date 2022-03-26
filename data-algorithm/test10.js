// 打印出 1 - 10000 之间的所有对称数
// 例如：121、1331 等
function isLog(num) {
  // 栈 filo
  
  const str = (num).toString();
  // console.log('str',str)
  if(str.length < 2) return false
  const stack = [str[0]];
  function stackOpt(stack, item){
    if(stack[stack.length -1] !==item){
      stack.push(item)
    }else{
      stack.pop();
    }
  }
  for(let i =1;i<str.length;i++){
    if(str.length%2 === 0){// 偶数位
    stackOpt(stack, str[i])

      // if(stack[stack.length -1] !== str[i]){
      //   stack.push(str[i])
      // }else{
      //   stack.pop();
      // }
    }else{// 奇数位
      const mid = Math.floor(str.length/2);
      if(i===mid) continue

      stackOpt(stack, str[i])

      // if(stack[stack.length -1] !== str[i]){
      //   stack.push(str[i])
      // }else{
      //   stack.pop();
      // }
    }
  }
  return !stack.length;
}

function run9(start, max){
  for (let i = start; i <= max; i++) {
    if(isLog(i)){
      console.log(i)
    }
    
  }
}

run9(1,1000)