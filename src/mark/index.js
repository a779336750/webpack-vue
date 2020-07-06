import Vue from 'vue';
import App from './components/index.vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import ViewUI from 'iview';
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false;
Vue.use(VueVirtualScroller);
Vue.use(ViewUI);
new Vue({
    render: h => h(App),
}).$mount('#app');
