import React, { Children } from "react";
import ReactDOM from "react-dom";

// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const root = document.getElementById("root");

const component = (
  <div id="father">
    <div id="child1">child1</div>
    <div id="child1">child2</div>
  </div>
);

function setElementAttribute(component, element) {
  // 广度优先，设置元素的 - 属性
  Reflect.ownKeys(component.props)
    .filter((key) => key !== "children") // 过滤掉 children 属性
    .forEach((key) => element.setAttribute(key, component.props[key]));
}

function mounted(children, element, mountDOM) {
  // props.children -------------------> array
  if (Array.isArray(children)) {
    children.forEach((child) => {
      react15Render(child, element); // 递归
    });
  } else {
    //  props.children ----------------> string ...
    element.innerHTML = children;
  }
  mountDOM.appendChild(element);
}

// 存在问题
// - 1. 如果渲染的 ( 节点多，层次很深 )，还是使用 ( 递归的方式的话，比较耗时 ) 性能会很低
// - 2. js是单线程，导致渲染动画卡顿
function react15Render(component, mountDOM) {
  const element = document.createElement(component.type);
  const children = component.props.children;

  setElementAttribute(component, element);
  mounted(children, element, mountDOM);
}

react15Render(component, root);
