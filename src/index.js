import { h } from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const vnode1 = h('ol', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'C'}, 'C'),
])

const container = document.getElementById('container');
const btn = document.getElementById('btn');

btn.onclick = function() {
  const vnode2 = h('ol', {}, [
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'E'}, 'E'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'F'}, 'F'),
  ])
  patch(vnode1, vnode2)
}

patch(container, vnode1)
// console.log(vnode1)