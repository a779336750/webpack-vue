<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>ColorPicker 颜色选择器</h2>

        <div class="view-list">

            <h3>基本结构</h3>
            <template>
                <Row>
                    <Col span="12">
                    有默认值
                    <ColorPicker v-model="color1" />
                    </Col>
                    <Col span="12">
                    无默认值
                    <ColorPicker v-model="color2" />
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">

            <h3>透明度</h3>
            <template>
                <ColorPicker
                    v-model="color3"
                    alpha
                />
            </template>
        </div>

        <div class="view-list">

            <h3>色彩</h3>
            <template>
                <ColorPicker
                    v-model="color7"
                    :hue="false"
                />
            </template>
        </div>

        <div class="view-list">

            <h3>颜色预设</h3>
            <template>
                <Row>
                    <Col span="12">
                    <ColorPicker
                        v-model="color4"
                        recommend
                    />
                    </Col>
                    <Col span="12">
                    <ColorPicker
                        v-model="color5"
                        :colors="colors"
                    />
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">

            <h3>尺寸</h3>
            <template>
                <Row>
                    <Col span="8">
                    <ColorPicker
                        v-model="color6"
                        size="large"
                    />
                    </Col>
                    <Col span="8">
                    <ColorPicker v-model="color6" />
                    </Col>
                    <Col span="8">
                    <ColorPicker
                        v-model="color6"
                        size="small"
                    />
                    </Col>
                </Row>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            color1: "#19be6b",
            color2: "",
            color3: "rgba(25, 190,107, .5)",
            color7: "#19be6b",
            color6: "#19be6b",
            color4: "#19be6b",
            color5: "#19be6b",
            colors: ["#311B92", "#512DA8", "#673AB7", "#9575CD", "#D1C4E9"]
        };
    },
    computed: {},
    methods: {}
};
</script>
