<template>
    <div class="Slider">
        <h2>Slider 滑动条</h2>

        <div class="view-list">
            <h3>简单样式</h3>
            <template>
                <Slider
                    v-model="value1"
                    show-tip="never"
                ></Slider>
                <Slider
                    v-model="value2"
                    range
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>禁用滑块</h3>
            <template>
                <Slider
                    v-model="value1"
                    disabled
                ></Slider>
                <Slider
                    v-model="value2"
                    range
                    disabled
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>离散值</h3>
            <template>
                <Slider
                    v-model="value4"
                    :step="10"
                ></Slider>
                <Slider
                    v-model="value5"
                    :step="10"
                    range
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>显示间断点</h3>
            <template>
                <Slider
                    v-model="value6"
                    :step="10"
                    show-stops
                ></Slider>
                <Slider
                    v-model="value7"
                    :step="10"
                    show-stops
                    range
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>带有输入框</h3>
            <template>
                <Slider
                    v-model="value8"
                    show-input
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>自定义提示</h3>
            <template>
                <Slider
                    v-model="value9"
                    :tip-format="format"
                ></Slider>
                <Slider
                    v-model="value10"
                    :tip-format="hideFormat"
                ></Slider>
            </template>
        </div>

        <div class="view-list">
            <h3>零刻度点</h3>
            <template>
                <Slider
                    v-model="value11"
                    :min="-360"
                    :max="360"
                ></Slider>
            </template>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: 25,
            value2: [20, 50],
            value3: [20, 50],
            value4: 30,
            value5: [20, 50],
            value6: 30,
            value7: [20, 50],
            value8: 25,
            value9: 25,
            value10: 25,
            value11: 25
        };
    },
    methods: {
        format(val) {
            return "Progress: " + val + "%";
        },
        hideFormat() {
            return null;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>