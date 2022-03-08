// my promse

const PENDIND = 'PENDIND';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function log(...rest){
  console.log(...rest)
}
class myPromise {
  constructor(executor){
    this.state = PENDIND;
    this.value = null;
    this.onResolvedList = [];
    this.onRejectedList = [];
    try {
      executor(this.resolve.bind(this),this.reject.bind(this))
    } catch (error) {
      throw new Error(error)
    }
    this.then.bind(this)
  }

  resolve(value){
    if(this.state === PENDIND){
      this.value = value;
      this.state = RESOLVED;
      this.onResolvedList.forEach(fn=>fn(this.value))
    }
    
  }

  reject(value){
    if(this.state === PENDIND){
      this.value = value;
      this.state = REJECTED;
      this.onRejectedList.forEach(fn=>fn(this.value))
    }

  }

  then(onResolved,onRejected){
    if(this.state === RESOLVED){
      // log(this)
      // onResolved(this.value)
    }else if(this.state === REJECTED){
      // onRejected(this.value)
    }else{
      this.onResolvedList.push(onResolved);
      this.onRejectedList.push(onRejected);

    }
  }
}

export {
  myPromise,
  log
}