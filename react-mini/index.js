// import {element} from './a.jsx'
function log(...rest){
  console.log(rest)
}
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = null;
let hookIndex = null;
let wipFiber = null;

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next)=> key=>prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)

function useState(initial) {
  const oldHook = 
    wipFiber.alternate &&
    wipFiber.alternate.hooks && 
    wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }
  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action =>{
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state,setState]
}


function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child)=> typeof child === 'object' ? child : createTextElement(child))
    }
  }
}
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function creteDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT'
  ? document.createTextNode('')
  : document.createElement(fiber.type)

  // const isProperty = key => key !== 'children';
  // add tag property
  updateDom(dom, {}, fiber.props)
  // Object.keys(fiber.props)
  //   .filter(isProperty)
  //   .forEach(name =>{
  //     dom[name] = fiber.props[name]
  //   })
  
  return dom;

}





function commitRoot() {
  deletions.forEach(commitWork)
  // add nodes to dom
  commitWork(wipRoot.child)
  currentRoot = wipRoot;
  wipRoot = null;
}

function updateDom(dom, prevProps,nextProps) {
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key=> !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })
  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => dom[name] = '')
  // set or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => dom[name] = nextProps[name])
  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name=>{
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name]) 

    })
}

function commitWork(fiber) {
  // deal width dif effectTags
  if(!fiber){
    return
  }
  // domParent
  // const domParent = fiber.parent.dom;
  let domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }

  const domParent = domParentFiber.dom;

  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  }else if(
    fiber.effectTag === "UPDATE" &&
    fiber.dom !=null
  ){
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  }else if(fiber.effectTag === 'DELETION'){
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent)
  }
  
  // domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);

}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}


function render(element, container) {
  // set next unit of work
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
  }
  deletions = []
  nextUnitOfWork = wipRoot
}





function workLoop(deadline) {
  let shouldYield = false;
  // log(deadline.timeRemaining())
  while (nextUnitOfWork && !shouldYield) {

    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  } 
  if(!nextUnitOfWork && wipRoot){
    // when fiber tree create complete,do cmomit

    commitRoot();
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  log('fiber',fiber)

  //  add dom node
  // if(!fiber.dom){
  //   fiber.dom = creteDom(fiber)
  // }

  // create a new fibers
  // const elements = fiber.props.children;

  // reconcileChildren(fiber, elements)

 

  // return next unit of work
  // child --- sibling--- parent 
  if(fiber.child){
    return fiber.child
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling  
    }
    nextFiber = nextFiber.parent
  }
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber,children)
}

function updateHostComponent(fiber) {
  if(!fiber.dom){
    fiber.dom = creteDom(fiber)
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements)
}


function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];

    let newFiber = null;

    const sameType = 
      oldFiber &&
      element && 
      element.type === oldFiber.type

    if(sameType){
      //  update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
    if(element && !sameType){
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate:null,
        effectTag: "PLACEMENT",
      }
    }

    if(oldFiber && !sameType){
      // delete the oldFiber's node
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber)
    }

    // cpmpare oldFiber to elment

    // const newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: wipFiber,
    //   dom: null,
    // }
    if(index === 0 ){
      wipFiber.child = newFiber
    }else{
      // 单向链表
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;

    index++;
  } 
}




const Didact = {
  createElement,
  render,
  useState,
}
/** @jsx Didact.createElement */
function App(props){
  const [state, setState] = Didact.useState(1)
  return <h1 onClick={()=> setState(c => c+1)}>count {state}</h1>
}
// const element = (
//   <div id="foo">
//     <a onClick={()=>console.log('24233')}>bar</a>
//     <App name='steve'/>
//     <p/>
//     <b/>
//   </div>
// )
const element = (<App name='steve'/>)
log('---element',element)
// const element = Didact.createElement(
//   'div',
//   {id: 'foo'},
//   Didact.createElement('a', null,'bar'),
//   Didact.createElement('b'),
// )
const container = document.querySelector('#root');
Didact.render(element, container)

