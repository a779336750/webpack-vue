
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import API from '../base/index.js';
import ComponentsRouter from './routers/routerConf.js';
import store from './store/index.js';

Vue.use(VueRouter);
Vue.use(API);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    routes: [
        {
            path: '/Components',
            component: resolve => require(['./routers/Components.vue'], resolve),
            children: (() => {
                const routerList = [];

                ComponentsRouter.forEach(item => {
                    routerList.push({
                        path: item,
                        component: resolve => require([`./routers/Components/${item}.vue`], resolve),
                    });
                });

                return routerList;
            })(),
        },
        {
            path: '/Specification',
            component: resolve => require(['./routers/Specification.vue'], resolve),
            children: [

            ],
        },
        {
            path: '*',
            redirect: '/Components',
        },
    ],
});

const app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
