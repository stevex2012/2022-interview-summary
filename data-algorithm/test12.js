// // add(1); 			// 1
// add(1)(2);  	// 3
// add(1)(2)(3)；// 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

// function curry
// collection args

function curry(fn) {
  const arg = Array.from(arguments).slice(1);
  const res = 1;
  return function(){
    const args = [...arg, Array.from(arguments)]
    fn.apply(null,args);
  }
}

function add(...rest){
  return Array.from(rest).reduce((total, item)=>{
    total+= parseInt(item, 10);
    return total
  }, 0)
}

function add1(...rest) {
  const res = Array.from(rest).reduce((total, item)=>{
    total+=item;
    return total
  }, 0)
  console.log('res',res)
  return function tailFn(...p) {
    return add1.apply(null, [...rest,...p])
  }
}
console.log(add1(1)(2,3))
console.log(add1(1,2,3))
console.log(add1(1,2)(4))