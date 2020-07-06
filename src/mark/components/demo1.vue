<template>
    <div class="example">
        <div >{{list.name}}</div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'Hello world!',
            };
        },
        props: {
            list: Array,
        },
    };
</script>

<style scoped>
    .example {
        color: blue;
        width: 200px;
        height: 200px;
    }
</style>
