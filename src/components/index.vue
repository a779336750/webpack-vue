<template>
    <div class="example">
        <VirtualScroller></VirtualScroller>
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

<style>
    .example {
        color: blue;
    }
</style>
