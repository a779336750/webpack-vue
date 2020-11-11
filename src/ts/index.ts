import Vue from 'vue';
import Hello from './components/Hello.vue';
const v = new Vue({
    el: '#app',
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        <Hello></Hello>
    </div>`,
    data: {
        name: 'World',
    },
    components: {
        Hello,
    },
});
