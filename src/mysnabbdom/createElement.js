export function createElement(newVnode) {
  const newDom = document.createElement(newVnode.sel);
  if (newVnode.text !== '' && (newVnode.children === undefined || newVnode.children.length === 0)) {
    newDom.innerText = newVnode.text;
  } else if (Array.isArray(newVnode.children) && newVnode.children.length > 0) {
    // 递归创建子节点
    for (let i = 0; i < newVnode.children.length; i++) {
      const child = newVnode.children[i];
      const childDom = createElement(child);
      newDom.appendChild(childDom);
    }
  }
  newVnode.elm = newDom;
  return newVnode.elm;
}