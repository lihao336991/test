import HelloWorld from './hello-world/HelloWorld'
import Vuex from './vue-x/Vuex.vue'
import Editor from './editor/Editor'
const routes = [{
    path: '/vuex',
    name: 'Vuex',
    component: Vuex,
    meta: { title: 'Vuex' }
}, {
    path: '/i18n',
    name: 'HelloWorld',
    component: HelloWorld
}, {
    path: '/editor',
    name: 'editor',
    component: Editor
}, ]
export default {
    routes
}