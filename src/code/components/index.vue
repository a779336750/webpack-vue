<template>
    <div class="example">
        <button @click="showLog('name')">click</button>
    </div>
</template>
<script>
    import demo1 from './demo1.vue';
    import throttle from '../code-exercise/throttle';
    export default {
        data() {
            return {
                msg: 'Hello world!',
                list: [
                    {
                        name: 'dick',
                    },
                    {
                        name: 'mark',
                    },
                ],
            };
        },
        components: {
            demo1,
        },
        watch: {
            list: {
                handler() {
                    console.log(this.list);
                },
                deep: true,
            },
        },

        methods: {
            showLog(name) {
                console.log(name);
            },
        },
        created() {
            this.showLog = throttle(name => {
                console.log(name);
            });
        },
    };
</script>
<style lang="scss">
    .example {
        color: blue;
        .box1, .box2 {
            width: 200px;
            height: 200px;
            background: url("../image/aaaa.png");
        }
        .box2 {
            background: url("../image/ccc.png");
        }
    }
</style>
