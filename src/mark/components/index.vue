<template>
    <div class="example">
        aaaa
        <demo1 :list="list"></demo1>
        <button @click="changeList">click</button>
    </div>
</template>
<script>
    import demo1 from './demo1.vue';
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
            changeList() {
                // This.list.push({ name: this.list.length });
                this.list[0].name = 0;
            },
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
