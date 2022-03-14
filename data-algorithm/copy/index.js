// 深度+广度拷贝
// 对象是否可枚举
// 是否过滤掉prototype上的属性

const target = {
  a: 1,
  null1:null,
  foo:()=>console.log(123),//不能复制？
  unde: undefined,
  // set: new Symbol(214),
  arr: [1,2,3],
  b: {
    c:2,
    d: {
      a:1
    }
  },
  c:'llll'
}
const log = (...rest) => console.log(rest)
// 
// 深度
const dfsCopy = (target, result = {})=>{
  // log(result)
  // log(target)
  Object.keys(target).forEach(key=>{
    if(Object.prototype.toString.call(target[key]) === '[object Object]'){

      result = {
        ...result,
        [key]: dfsCopy(target[key], {}),
      }
    }else{
      result[key] = target[key]
    }
  })
  return result;
}
const dfsCopy1 = (target, result = {})=>{
  return Object.keys(target).reduce((result, key)=>{
    if(Object.prototype.toString.call(target[key]) === '[object Object]'){
      result = {
        ...result,
        [key]: dfsCopy1(target[key])
      }
    }else{
      result[key] = target[key]
    }
    return result
  }, result)
}
// 非递归
const dfsCopy2 = (target, result = {})=>{
  let stack = [{parent:[], source: target}];
  // 记录层级 [[], [],[]] {parent: 'a/b/c/'} obj[a][b][c]
  const getParentPath = (p)=>{

  }
  while(stack.length){
    const item = stack.pop();
    const workTarget = item.source;
    const parent = item.parent || []
    const keys = Object.keys(workTarget);
    for(let i=0;i<keys.length;i++){
      if(Object.prototype.toString.call(workTarget[keys[i]]) === '[object Object]'){

        stack.push({
          parent: [...parent, keys[i]],
          source: workTarget[keys[i]]
        })
        if(parent.length){
          
        }else{
          result[keys[i]] = {}
          
        }
        // {b:{}}
      }else{
        if(!parent || !parent.length){
          result[keys[i]] = workTarget[keys[i]];

        }else{
          // [a,b,c];
          // log(parent)
          // log(parent.split())
          // result[parent] = 1
          // result[parent[0]] = {
          //   ...result[parent[0]],
          //   [keys[i]]: workTarget[keys[i]],
          // }
        }

      }
    }
  }
  return result;
}

log(JSON.stringify(dfsCopy(target, {})))
log(JSON.stringify(dfsCopy1(target, {})))
// log(JSON.stringify(dfsCopy2(target, {})))//待完善

// value 对象

// 广度
const bfsCopy = (target) =>{
  
}

class Foo{
  constructor(){
    this.value = 123;
  }
  log(res){
    console.log(res)
  }
}
const foo = new Foo();
log(foo.log(123))

const typeOf = (arg)=> Object.prototype.toString.call(arg);

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
const flatten =(arr, result = [])=>{
  return arr.reduce((res, item)=>{
    if(typeOf(item) === '[object Array]'){
      result = result.concat(flatten(item))
    }else{
      result = result.concat(item)
    }
    return result;
  }, result)
}
// 快排
const quickSort =(arr, start, end)=>{
  // 取中
  // 左边排好，右边拍好
  if(arr.length === 1) return arr;
  const mid = Math.floor((end-start)/2);

  if(mid<=0) return arr;
  const left = [];
  const right = [];
  arr.forEach(item=>{
    if(item<arr[mid]){
      left.push(item)
    }else if(item>arr[mid]){
      right.push(item)
    }
  })
  return quickSort(left,0,left.length).concat(arr[mid]).concat(quickSort(right, 0, right.length))
}
// log(quickSort([3,4,2,1,6], 0, 5))
// log(flatten(arr)) // test ok
const sort =(arr, result)=>{
  // 拍平，去重，排序
  const newArr = [...new Set(flatten(arr))];
  return quickSort(newArr,0, newArr.length)

  
}
log(sort(arr))