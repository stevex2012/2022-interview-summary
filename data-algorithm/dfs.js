// 深度优先遍历
var pNode = document.querySelector('.parent');

function log(...rest){
  console.log(rest)
}

// 非递归
function dfs1(node, nodeList = []){
  // nodeList.push(node);
  // 栈filo
  const stack = []
  if(node){
    stack.push(node)
    while(stack.length){
      // 从后面取一个
      let currentNode = stack.pop();
      nodeList.push(currentNode);
      let children = currentNode.children;
      for(let i = children.length -1;i>=0;i--){
        stack.push(children[i])
      }
    }
  }
  
  return nodeList
}
log(dfs1(pNode));
// 递归
function dfs2(node, nodeList = []){
  if(!nodeList.includes(node)) nodeList.push(node)
  let children = node && node.children || '';
  if(children || children.length){
    Array.from(children).forEach(item=>{
      dfs2(item, nodeList)
    })
  }
  return nodeList;
}
// log(dfs2(pNode));