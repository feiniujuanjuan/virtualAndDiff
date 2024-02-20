import { createElement } from "./createElement";
import patchVnode from "./patchVnode";

function checkSameVnode(vnode1, vnode2) {
  return vnode1.sel === vnode2.sel && vnode1.key === vnode2.key;
}

// 对比新旧节点的子节点，然后更新
export default function upadateChildren(parentElm, oldCh, newCh) {
  console.log('updateChildren');
  // 旧前
  let oldStartIdx = 0;
  let oldStartVnode = oldCh[0];
  // 旧后
  let oldEndIdx = oldCh.length -1;
  let oldEndVnode = oldCh[oldEndIdx];
  // 新前
  let newStartIdx = 0;
  let newStartVnode = newCh[0];
  // 旧后
  let newEndIdx = newCh.length - 1;
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (checkSameVnode(newStartVnode, oldStartVnode)) {
      // 1、新前和旧前命中
      patchVnode(newStartVnode, oldStartVnode);
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(newEndVnode, oldEndVnode)) {
      // 2、新后和旧后命中
      patchVnode(newEndVnode, oldEndVnode);
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      // 3、新后和旧前命中
      patchVnode(newEndVnode, oldStartVnode);
      // 移动旧前到旧后之后
      // 只要插入一个已经在dom树上存在的节点，就是移动该节点
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 4、新前和旧后命中
      patchVnode(newStartVnode, oldEndVnode);
      // 移动旧后到旧前之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      newStartVnode = newCh[++newStartIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else {
      // 前面四种都没匹配到，直接去老的节点去查找
      if (!keyMap) {
        keyMap = [];
        for(let i = 0; i < oldCh.length; i++) {
          if (oldCh[i].key !== undefined) {
            keyMap[oldCh[i].key] = i;
          }
        }
      }
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld) {
        const moveVnode = oldCh[idxInOld];
        patchVnode(moveVnode, newStartVnode);
        // 标识这个节点已经处理
        oldCh[idxInOld] = undefined;
        // 移动到旧前之前
        parentElm.insertBefore(moveVnode.elm, oldStartVnode.elm);
      } else {
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 添加dom节点
  if (newStartIdx <= newEndIdx) {
    // 插入的标杆
    const before = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm;
    for(let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  }

  // 删除dom节点
  if (oldStartIdx <= oldEndIdx) {
    for(let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}