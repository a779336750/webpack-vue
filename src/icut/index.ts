import Vue from 'vue';
import axios from 'axios';
import './scss/index.scss';

import './vue/base/global/init';
// @ts-ignore
import store from './vue/store/index';
import main from './vue/base/main';
// @ts-ignore
import API from '../KtuUI/base/index.js';
import Index from './vue/component/Index.vue';
// const API = require('../KtuUI/base/index.js');


Vue.use(API);
Vue.prototype.$ajax = axios;
window.Ktu = {
    vm: {},
};
window.Ktu.vm = new Vue({
    el: '#app',
    render: h => h(Index),
    store,
    mounted() {
        main();
    },
});
