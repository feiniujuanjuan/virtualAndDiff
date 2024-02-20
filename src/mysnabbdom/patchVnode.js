import upadateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  // 判断新vnode和老vnode是不是同一个对象
  if (oldVnode === newVnode) return;
  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // 新vnode有text属性
    if (newVnode.text !== oldVnode.text) {
      // 如果新vnode的text和老vnode的text不同，直接修改即可
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性，有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 老vnode和新vnode都有children，需要对比children
      upadateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老vnode没有children，新vnode有children
      // 清空老vnode的text
      oldVnode.elm.innerText = '';
      // 遍历新vnode的children，创建DOM，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = newVnode.children[i];
        oldVnode.elm.appendChild(createElement(ch));
      }
    }
  }
}