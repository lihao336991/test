import HelloWorld from './hello-world/HelloWorld'
import Vuex from './vue-x/Vuex.vue'
import Editor from './editor/Editor'
import ToHtml from './to-html/ToHtml'
import iSocket from './socket/Socket'
import SocketList from './socket/SocketList'
const routes = [{
    path: '/vuex',
    name: 'Vuex',
    component: Vuex,
    meta: { title: 'Vuex' }
}, {
    path: '/i18n',
    name: 'HelloWorld',
    component: HelloWorld,
}, {
    path: '/editor',
    name: 'editor',
    component: Editor
}, {
    path: "/to-html",
    name: 'to-html',
    component: ToHtml
}, {
    path: "/socket/:id",
    name: 'socket',
    component: iSocket
}, {
    path: "/socket-list",
    name: 'socket-list',
    component: SocketList
}]
export default {
    routes
}