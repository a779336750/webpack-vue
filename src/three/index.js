import Vue from 'vue';
import App from './components/index.vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import ViewUI from 'iview';
import 'iview/dist/styles/iview.css';
import  './base/fonts/ttf/kenpixel.ttf';

Vue.config.productionTip = false;
Vue.use(VueVirtualScroller);
Vue.use(ViewUI);
new Vue({
    render: h => h(App),
}).$mount('#app');
// Listen for messages
socket.addEventListener('message', event => {
    console.log(event.data);
    if (event.data === 'done') {
        location.reload();
    }
});
