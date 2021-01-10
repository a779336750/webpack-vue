<style lang="scss" scoped>
.input-wrapper {
    margin: 20px 0;
}
</style>

<template>
    <div class="Input">
        <h2> 数字输入框 InputNumber </h2>

        <div class="view-list">
            <h3>简单样式</h3>
            <template>
                <InputNumber
                    :max="10"
                    :min="3"
                    v-model="value1"
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>纯输入框</h3>
            <template>
                <InputNumber
                    :max="1000000"
                    :min="2"
                    :nohandle="true"
                    v-model="value1"
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>只有底线边框</h3>
            <template>
                <InputNumber
                    :max="1000000"
                    :min="1"
                    :lineborder="true"
                    v-model="value1"
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>小数</h3>
            <template>
                <InputNumber
                    :max="10"
                    :min="1"
                    :step="1.2"
                    v-model="value2"
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>格式化展示</h3>
            <template>
                <div>
                    <InputNumber
                        :max="10000"
                        v-model="value9"
                        :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                        :parser="value => value.replace(/$s?|(,*)/g, '')"
                    ></InputNumber>
                    <InputNumber
                        :max="100"
                        v-model="value10"
                        :formatter="value => `${value}%`"
                        :parser="value => value.replace('%', '')"
                    ></InputNumber>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3>尺寸</h3>
            <template>
                <InputNumber
                    v-model="value3"
                    size="small"
                ></InputNumber>
                <InputNumber v-model="value4"></InputNumber>
                <InputNumber
                    v-model="value5"
                    size="large"
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>不可用</h3>
            <template>
                <InputNumber
                    v-model="value6"
                    :disabled="disabled"
                ></InputNumber>
                <Button
                    type="theme"
                    @click="disabled = !disabled"
                >Toggle Disabled</Button>
            </template>
        </div>

        <div class="view-list">
            <h3>只读</h3>
            <template>
                <InputNumber
                    v-model="value7"
                    readonly
                ></InputNumber>
            </template>
        </div>

        <div class="view-list">
            <h3>不可编辑</h3>
            <template>
                <InputNumber
                    v-model="value8"
                    :editable="false"
                ></InputNumber>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 1,
            value1: 1,
            value2: 1,
            value3: 2,
            value4: 2,
            value5: 3,
            value6: 1,
            value7: 2,
            value8: 2,
            value9: 1000,
            value10: 55,
            disabled: true,
            value6: 1
        };
    }
};
</script>

