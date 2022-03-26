this
指向当前运行函数的执行上下文（ctx）
函数在执行的时候，可以通过bind，apply方法动态修改this指向，


call
fn.call(ctx,arg1,arg2)
```js
Function.prototype.maCall = function (ctx, ...rest){
  const fn = this;
  return this.apply(cxt,rest)
}
```


apply
fn.apply(ctx,[arg1,arg2...])
```js
Function.prototype.myApply = function(ctx,...rest){
  const fn = this;
  return fn.call(ctx,...rest)
}
```

bind
绑定函数的this，并返回一个新函数
```js
Function.prototype.myCall = function(context, ...args){
  context = context || window;
  const fn = this;
  return function newFn(...newArg){
    return fn.apply(context,[...args,...newArg])
  }
}
// 修改一下, 当使用new操作函数时候,保证this的指向, 原型链也关联上
Function.prototype.myCall1 = function(context, ...args){
  const ctx = context || window;
  const fn = Symbol();
  ctx[fn] = this;


  var result = function(...newArgs){
    if(this instanceOf ctx[fn]){
      this[fn] = ctx[fn]
      this[fn](...[...args, ...innerArgs])
      delete this[fn]
    }else{
      ctx[fn](...[...args,...newArgs])
      delete ctx[fn]
    }
  }
  result.prototype = Object.create(this.prototype)
  return result;

}

```
