// 手写new
// is func
// create runtime context
// run fn
// is result obj ? 
// 


const myNew = (fn, args)=>{
  // is func
  // constructor fn runtime context
  // return result
  if(typeof fn !== 'function'){
    throw new Error('fn must be a function')
  }
  const context = Object.create(null);

  context.this = fn;
  
  return fn.apply(context, [...args]);
}

function _new(fn,...arg){
  const ctx = Object.create(fn.prototype);
  const res = fn.apply(ctx, arg);
  return res instanceof Object ? res : ctx;
}
// 