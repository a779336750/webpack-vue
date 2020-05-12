import Vue from 'vue'
import App from './components/index.vue'
import './components/style.scss'
import VueVirtualScroller from 'vue-virtual-scroller'
Vue.config.productionTip = false
Vue.use(VueVirtualScroller)

new Vue({
    render: h => h(App),
}).$mount('#app')