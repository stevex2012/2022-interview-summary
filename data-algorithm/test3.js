// 异步编程
class LazyManClass{
  constructor(name){
    this.name = name;
    console.log('I am ' + name)
    this.task = [];
    setTimeout(() => {
      this.next();  
    }, 0);
  }

  eat(food){
    const _this = this;
    const fn = function(){
      console.log('I am eating'+food)
      _this.next();  

    }
    this.task.push(fn)
    return this;
  }

  sleep(time){
    const _this = this;
    const fn = function(){
      new Promise((res)=>{
        setTimeout(() => {
          console.log(this)
          _this.next();
        }, time * 1000);
      })
    }
    this.task.push(fn)

    return this;
  }

  sleepFirst(time){
    const _this = this;
    const fn = function(){
      new Promise((res)=>{
        setTimeout(() => {
          res();
          _this.next();
        }, time * 1000);
      })
    }
    this.task.unshift(fn)

    return this;
  }

  next(){
    const fn = this.task.shift();
    typeof fn === 'function' && fn();
  }
}


function LazyMan(name){
  return new  LazyManClass(name)
}

// LazyMan('steve').eat('lunch').sleep(3).eat('dinner');

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(3).sleep(5).eat('junk food');
// 队列 宏，微任务