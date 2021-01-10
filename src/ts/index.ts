import Vue from 'vue';
import Hello from './components/Hello.vue';
import interface1 from './components/demo/day1/interface';
import functionInterface from './components/demo/day1/function-interface';
import fanxing from './components/demo/day2/fanxing';
import highClassType from './components/demo/day4/nameSpace';
import enumFunc from './components/demo/day3/enum';
import nameSpace from './components/demo/day4/nameSpace';
const v = new Vue({
    el: '#app',
    template: `
    <div>
      <button @click="runInterface">click</button>
      <Hello></Hello>
    </div>`,
    data: {
        name: 'World',
    },
    components: {
        Hello,
    },
    methods: {
        runInterface() {
            /* interface1();
               fanxing(); */
            /* enumFunc();
               highClassType(); */
            nameSpace();
        },
    },
    mounted() {
    },
});
