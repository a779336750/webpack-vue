<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Rate 评分</h2>

        <div class="view-list">

            <h3>基本结构</h3>
            <template>
                <Rate v-model="value" />
            </template>
        </div>

        <div class="view-list">

            <h3>半星</h3>
            <template>
                <Rate
                    allow-half
                    v-model="valueHalf"
                />
            </template>
        </div>

        <div class="view-list">

            <h3>显示提示</h3>
            <template>
                <Row>
                    <Col span="12">
                    <Rate
                        show-text
                        v-model="valueText"
                    />
                    </Col>
                    <Col span="12">
                    <Rate
                        show-text
                        allow-half
                        v-model="valueCustomText"
                    >
                        <span style="color: #f5a623">{{ valueCustomText }}</span>
                    </Rate>
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">

            <h3>只读</h3>
            <template>
                <Rate
                    disabled
                    v-model="valueDisabled"
                />
            </template>
        </div>

        <div class="view-list">

            <h3>清除</h3>
            <template>
                <Rate
                    clearable
                    v-model="value1"
                /> clearable: true
                <Rate v-model="value2" /> clearable: false
            </template>
        </div>

        <div class="view-list">

            <h3>自定义字符或图标</h3>
            <template>
                <Rate
                    v-model="value3"
                    character="A"
                />
                <Rate
                    v-model="value4"
                    character="好"
                />
                <Rate
                    v-model="value5"
                    icon="ios-heart"
                />
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 0,
            value1: 3,
            value2: 3,
            value3: 3,
            value4: 3,
            value5: 3,
            valueHalf: 2.5,
            valueText: 3,
            valueCustomText: 3.8,
            valueDisabled: 2
        };
    },
    computed: {},
    methods: {}
};
</script>
