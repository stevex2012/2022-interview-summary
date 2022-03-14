// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
const data = {1:222, 2:123, 5:888};

function change(data){

  var result = new Array(10);
  result.f
  for(let key in data){
    console.log('key',typeof Number(key))
    if(typeof Number(key) === 'number' && !isNaN(key)){
      result[Number(key)-1]  = data[key]
    }
  }
  console.log(result)

}

change(data)

function change2(data){
  const arr = Array.from({length: 12})
  const res = arr.map((item,idx)=> {
    if(data[idx+1]){
      return data[Number(idx)+1]
    }
    return null;
  })
  console.log(res)
}
change2(data)