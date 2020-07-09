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
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3030/echo');
// Connection opened
socket.addEventListener('open', event => {
    socket.send('Hello Server!');
});
// Listen for messages
socket.addEventListener('message', event => {
    console.log(event.data);
    if (event.data === 'done') {
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});
