// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。

function reWrite(str) {
  const tmp1 = str.toLowerCase();
  // console.log(tmp1)
  let res = [];
  for (let i = 0; i < str.length; i++) {
    const element = str[i]
    console.log(element,tmp1[i]);
    if(element == tmp1[i]){
      // 本来就是小写
      res.push(tmp1[i].toUpperCase());
    }else{
      // 是大写
      res.push(tmp1[i]);
    }
    
  }
  console.log(res)
}

reWrite('AbC')