import React, { useEffect, useRef } from "react";

import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const eventListener = (content) => () => {
  console.log(content);
};

const Father = () => {
  const fatherRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    const father = fatherRef.current;
    const child = childRef.current;
    document.addEventListener("click", eventListener("document - 原生捕获"), true);
    document.addEventListener("click", eventListener("document -原生冒泡"), false);
    father?.addEventListener("click", eventListener("父组件 - 原生捕获"), true);
    father?.addEventListener("click", eventListener("父组件 - 原生冒泡"), false);
    child?.addEventListener("click", eventListener("子组件 - 原生捕获"), true);
    child?.addEventListener("click", eventListener("子组件 - 原生冒泡"), false);
  }, []);

  const fatherReactBubbleClick = () => console.log('父组件-react合成事件-冒泡') // 相当于执行了 dispatchEvent，会重新模拟一遍 (  捕获和冒泡 )
  const fatherReactCaptureClick = () => console.log('父组件-react合成事件-捕获')
  const childReactBubbleClick = () => console.log('子组件-react合成事件-冒泡')
  const childReactCaptureClick = () => console.log('子组件-react合成事件-捕获')

  return (
    <div ref={fatherRef}
      onClick={fatherReactBubbleClick}
      onClickCapture={fatherReactCaptureClick}
    >
      <div>father</div>
      <div ref={childRef}
       onClick={childReactBubbleClick}
       onClickCapture={childReactCaptureClick}
      >child</div>
    </div>
  );
};

root.render(<Father />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
