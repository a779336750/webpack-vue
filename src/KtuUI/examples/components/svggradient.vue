<style lang="scss" scoped>
.svg-gradient {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
}
</style>

<template>
    <svg class="svg-gradient">
        <linearGradient id="svg_logo" gradientUnits="userSpaceOnUse" x1="15.7643" y1="8.3159" x2="35.2085" y2="41.9943">
            <stop offset="0.1" style="stop-color:#F4D039"/>
            <stop offset="1" style="stop-color:#FD7255"/>
        </linearGradient>
    </svg>
</template>


<script>
    export default {
        name : 'svggradient',
        data () {
            return {

            }
        }
    }
</script>
