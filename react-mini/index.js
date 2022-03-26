// import {element} from './a.jsx'
function log(...rest){
  console.log(rest)
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

  const isProperty = key => key !== 'children';
  // add tag property
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name =>{
      dom[name] = fiber.props[name]
    })
  
  return dom;

}

let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

function commitRoot() {
  // add nodes to dom
  commitWork(wipRoot.child)
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if(!fiber){
    return
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);

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
  log(fiber)
  //  add dom node
  if(!fiber.dom){
    fiber.dom = creteDom(fiber)
  }

  // create a new fibers
  const elements = fiber.props.children;

  reconcileChildren(fiber, elements)

 

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
        effectTat: "UPDATE",
      }
    }
    if(element && !sameType){
      // add this node
    }

    if(oldFiber && !sameType){
      // delete the oldFiber's node
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
  render
}
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <p/>
    <b/>
  </div>
)
log('---element',element)
// const element = Didact.createElement(
//   'div',
//   {id: 'foo'},
//   Didact.createElement('a', null,'bar'),
//   Didact.createElement('b'),
// )
const container = document.querySelector('#root');
Didact.render(element, container)

