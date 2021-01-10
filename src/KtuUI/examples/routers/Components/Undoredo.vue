<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Undoredo 前进撤销</h2>

        <div class="view-list">

            <h3>基本用法</h3>

            <template>
                <InputNumber
                    :max="1000000"
                    :min="1"
                    :lineborder="true"
                    v-model="value1"
                    @on-blur="blur"
                    @on-focus="focus"
                ></InputNumber>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: 0
        };
    },
    computed: {},
    methods: {
        focus() {
            console.log("focus");
        },
        blur() {
            console.log("change");
        }
    },
    mounted() {
        this.history = new this.$Undoredo();
        // this.historyList.push();
    }
};
</script>
