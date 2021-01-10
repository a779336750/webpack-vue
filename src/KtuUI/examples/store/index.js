import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: localStorage.getItem('loginInfo') || '',
        isEditDoc: localStorage.getItem('isEditDoc') || false,
    },
    mutations: {
        changeState(state, obj) {
            state[obj.prop] = obj.value;
        },
    },
});
