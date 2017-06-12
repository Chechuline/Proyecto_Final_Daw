import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 1,
        refresh: false,
    },
    mutations: {
        increment(state, data) {
            state.count = data;
        },
        actualizarConjuntos(state, payload) {
            console.log("se lanzo el actualizar");
            state.refresh = payload.data;
        }
    },
    getters: {
        getRefresh: state => state.refresh
    }
});