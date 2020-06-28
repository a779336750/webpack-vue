<template>
    <div class="example">
        <div class="box1">aaaa</div>
        <div class="box2">bbbbb</div>
    </div>
</template>
<script>
    import VirtualScroller from './plugin-test/vue-virtual-scroller.vue'
    export default {
        data () {
            return {
                msg: 'Hello world!',
            }
        },
        components: {
            VirtualScroller,
        }
    }
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
