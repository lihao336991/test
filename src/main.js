// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n.js'
import Echarts from 'echarts'
import Vuex from 'vuex'
import store from './vuex/store'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Echarts)
Vue.use(Vuex)
    /* eslint-disable no-new */

Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: { App },
    template: '<App/>',
})