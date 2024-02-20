// 作用: 创建虚拟节点
export default function (sel, data, children, text, elm) {
  const key = data.key;
  return { sel, data, children, text, elm, key }
}