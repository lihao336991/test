import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        author: 'LiHao'
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setState(state, msg) {
            state.author = msg
        },
    },
    actions: {
        
    }
})

export default store