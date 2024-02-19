import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数（diff算法的核心）
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

// 创建虚拟节点
const myVnode1 = h("a", { props: { 
  href: "http://www.baidu.com",
  target: "_blank"
} }, "百度");
console.log(myVnode1);

// 让虚拟节点上树
const container = document.getElementById("container");
patch(container, myVnode1);
