import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/Home'
import Content from '@/components/content/router'
Vue.use(Router)
var router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        children: [
            ...Content.routes
        ]
    }, ]
})
export default router