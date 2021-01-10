<template>
    <div class="radio-view">
        <h2>Switch 开关</h2>

        <div class="view-list">
            <h3>基本用法</h3>

            <template>
                <iSwitch
                    v-model="switch1"
                    @on-change="change"
                />
            </template>

        </div>

        <div class="view-list">
            <h3>尺寸</h3>

            <template>
                <iSwitch size="large" />
                <iSwitch />
                <iSwitch size="small" />
            </template>

        </div>

        <div class="view-list">
            <h3>文字和图标</h3>

            <template>
                <iSwitch>
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </iSwitch>
                <iSwitch>
                    <Icon
                        type="md-checkmark"
                        slot="open"
                    ></Icon>
                    <Icon
                        type="md-close"
                        slot="close"
                    ></Icon>
                </iSwitch>
                <br><br>
                <iSwitch size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </iSwitch>
                <iSwitch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </iSwitch>
            </template>

        </div>

        <div class="view-list">
            <h3>不可用</h3>

            <template>
                <iSwitch :disabled="disabled" />
                <Button
                    type="primary"
                    @click="disabled = !disabled"
                >Toggle Disabled</Button>
            </template>

        </div>

        <div class="view-list">
            <h3>加载中</h3>

            <template>
                <iSwitch
                    loading
                    :value="true"
                />
                <iSwitch
                    loading
                    :value="false"
                    size="small"
                />
            </template>

        </div>

    </div>

</template>
<script>
export default {
    data() {
        return {
            switch1: false,
            disabled: true
        };
    },
    methods: {
        change(status) {
            this.$Message.info("开关状态：" + status);
        }
    }
};
</script>
