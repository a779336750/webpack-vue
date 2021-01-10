<style lang="scss" >
.demo-tabs-style1 > .tabs-card > .tabs-content {
    height: 120px;
    margin-top: -16px;
}

.demo-tabs-style1 > .tabs-card > .tabs-content > .tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.demo-tabs-style1 > .tabs.tabs-card > .tabs-bar .tabs-tab {
    border-color: transparent;
}

.demo-tabs-style1 > .tabs-card > .tabs-bar .tabs-tab-active {
    border-color: #fff;
}
.demo-tabs-style2 > .tabs.tabs-card > .tabs-bar .tabs-tab {
    border-radius: 0;
    background: #fff;
}
</style>

<template>
    <div class="con-view">
        <h2>Tabs 标签页</h2>

        <div class="view-list">

            <h3>基础用法</h3>

            <template>
                <Tabs value="name1">
                    <TabPane
                        label="标签一"
                        name="name1"
                    >标签一的内容</TabPane>
                    <TabPane
                        label="标签二"
                        name="name2"
                    >标签二的内容</TabPane>
                    <TabPane
                        label="标签三"
                        name="name3"
                    >标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>禁用 </h3>

            <template>
                <Tabs>
                    <TabPane label="标签一">标签一的内容</TabPane>
                    <TabPane
                        label="标签二"
                        disabled
                    >标签二的内容</TabPane>
                    <TabPane label="标签三">标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>图标</h3>

            <template>
                <Tabs>
                    <TabPane
                        label="macOS"
                        icon="#svg-type-web"
                    >标签一的内容</TabPane>
                    <TabPane
                        label="Windows"
                        icon="#svg-type-web"
                    >标签二的内容</TabPane>
                    <TabPane
                        label="Linux"
                        icon="#svg-type-web"
                    >标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>迷你型</h3>

            <template>
                <Tabs size="small">
                    <TabPane label="标签一">标签一的内容</TabPane>
                    <TabPane label="标签二">标签二的内容</TabPane>
                    <TabPane label="标签三">标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>卡片样式</h3>

            <template>
                <Tabs type="card">
                    <TabPane label="标签一">标签一的内容</TabPane>
                    <TabPane label="标签二">标签二的内容</TabPane>
                    <TabPane label="标签三">标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>可关闭</h3>

            <template>
                <Tabs
                    type="card"
                    closable
                    @on-tab-remove="handleTabRemove"
                >
                    <TabPane
                        label="标签一"
                        v-if="tab0"
                    >标签一的内容</TabPane>
                    <TabPane
                        label="标签二"
                        v-if="tab1"
                    >标签二的内容</TabPane>
                    <TabPane
                        label="标签三"
                        v-if="tab2"
                    >标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>附加内容</h3>

            <template>
                <Tabs type="card">
                    <TabPane
                        v-for="tab in tabs"
                        :key="tab"
                        :label="'标签' + tab"
                    >标签{{ tab }}</TabPane>
                    <Button
                        @click="handleTabsAdd"
                        size="small"
                        slot="extra"
                    >增加</Button>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>不使用动画</h3>

            <template>
                <Tabs :animated="false">
                    <TabPane label="标签一">标签一的内容</TabPane>
                    <TabPane label="标签二">标签二的内容</TabPane>
                    <TabPane label="标签三">标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>

        <div class="view-list">

            <h3>其它样式</h3>

            <template>
                <Row :gutter="32">
                    <Col
                        span="12"
                        class="demo-tabs-style1"
                        style="background: #e3e8ee;padding:16px;"
                    >
                    <Tabs type="card">
                        <TabPane label="标签一">标签一的内容</TabPane>
                        <TabPane label="标签二">标签二的内容</TabPane>
                        <TabPane label="标签三">标签三的内容</TabPane>
                    </Tabs>
                    </Col>
                    <Col
                        span="12"
                        class="demo-tabs-style2"
                    >
                    <Tabs type="card">
                        <TabPane label="标签一">标签一的内容</TabPane>
                        <TabPane label="标签二">标签二的内容</TabPane>
                        <TabPane label="标签三">标签三的内容</TabPane>
                    </Tabs>
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">

            <h3>自定义样式</h3>

            <template>
                <Tabs
                    value="name1"
                    type="custom"
                >
                    <TabPane
                        label="标签一"
                        name="name1"
                    >标签一的内容</TabPane>
                    <TabPane
                        label="标签二"
                        name="name2"
                    >标签二的内容</TabPane>
                    <TabPane
                        label="标签三"
                        name="name3"
                    >标签三的内容</TabPane>
                </Tabs>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab0: true,
            tab1: true,
            tab2: true,
            tabs: 2
        };
    },
    computed: {},
    methods: {
        handleTabRemove(name) {
            this["tab" + name] = false;
        },

        handleTabsAdd() {
            this.tabs++;
        }
    }
};
</script>
