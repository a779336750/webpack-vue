<style lang="scss" scoped>
</style>

<template>
    <i
        :class="classes"
        @click="handleClick"
    >
        <svg
            class="svg-icon"
            :fill="color"
        >
            <use :xlink:href="imageid"></use>
        </svg>
    </i>
</template>

<script>
export default {
    name: "icon",

    data() {
        return {
            prefixCls: "icon"
        };
    },
    props: {
        color: String,
        id: {
            type: String,
            default: ""
        }
    },
    computed: {
        classes() {
            return [`${this.prefixCls}`];
        },
        imageid() {
            return this.id[0] == "#" ? this.id : "#" + this.id;
        }
    },
    methods: {
        handleClick(event) {
            this.$emit("click", event);
        }
    }
};
</script>