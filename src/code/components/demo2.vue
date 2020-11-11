<template>
    <div class="example">
        {{ msg }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'Hello world!',
            };
        },
    };
</script>

<style scoped>
    .example {
        color: red;
        width: 200px;
        height: 200px;
    }
</style>
