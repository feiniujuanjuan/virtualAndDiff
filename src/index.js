import { h } from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const vnode1 = h('ol', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
])

const container = document.getElementById('container');
const btn = document.getElementById('btn');

btn.onclick = function() {
  const vnode2 = h('ol', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, 'C'),
    h('li', {}, [
      h('ul', {}, [
        h('li', {}, 'D'),
        h('li', {}, 'E'),
      ]),
    ]),
  ])
  patch(vnode1, vnode2)
}

patch(container, vnode1)
// console.log(vnode1)