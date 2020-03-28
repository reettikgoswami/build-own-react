

function createTextElement(text){
  return {
    type : "TEXT_ELEMENT",
    props :{
      nodeValue:text,
      children : [],
    },
  }
}

function createElement(type , props , ...children){
  return {
    type , 
    props:{
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    },
  }
}

function createDom(fiber){
  
  // const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

  // const isProperty = key => key !== "children"

  // Object.keys(element.props)
  //   .filter(isProperty)
  //   .forEach(name => {
  //     dom[name] = element.props[name]
  //   })

  // element.props.children.forEach(child =>{
  //   render(child , dom)
  // })

  // container.appendChild(dom);

}


function commitRoot(){
commitWork(wipRoot.child);
wipRoot = null;
}

function commitWork(fiber){
  if(!fiber){
    return
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}


function render(element , container){
   wipRoot = {
     dom : container,
     props: {
       children : [element],
     }
   }
   nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1 ;
  }
​
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
​
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)

​
function performUnitOfWork(fiber) {   
  if(!fiber.dom){
  fiber.dom = createDom(fiver);
  }
  

//  create a new fiber
 const elements = fiber.props.children;
 let index = 0;
 let prevSibling = null

 while(index < elements.length){
   const element  = element[index]

   const newFiver = {
      type : element.type,
      props : element.props,
      parent : fiver,
      dom : null
   }
 
    if(index === 0){
      fiber.child = newFiber
    }else{
      prevSibling.sibling = newFiver
    }
  
     prevSibling = newFiber
     index++

 }

 if(fiber.child){
   return fiber.child
 }
 let nextFiber = fiber
 while(nextFiber){
   if(newFiber.sibling){
     return nextFiber.sibling
   }else{
     nextFiber = nextFiber.parent
   }
 }

  


}









const demoReact = {
  createElement,
  render
}

 
/** @jsx demoReact.createElement */

const element = (
  <span>
    <h1>reettik</h1>
   <a>link</a>
   <b />
  </span>
);




// const element = demoReact.createElement(
//   "div",
//   {id : "foo"},
//   demoReact.createElement("a" , null , "link"),
//   demoReact.createElement("b")
// ) 


const container = document.getElementById("root");


demoReact.render(element , container);