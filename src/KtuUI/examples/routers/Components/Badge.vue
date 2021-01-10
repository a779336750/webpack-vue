<style lang="scss" >
.demo-badge {
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
}
.demo-badge-alone {
    background: #5cb85c !important;
}
</style>

<template>
    <div class="menu-view">
        <h2>Badge 微标数</h2>

        <div class="view-list">

            <h3>基本结构</h3>

            <template>
                <Badge :count="3">
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
            </template>

        </div>

        <div class="view-list">

            <h3>小红点</h3>

            <template>
                <Badge dot>
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge dot>
                    <Icon
                        type="ios-notifications-outline"
                        size="26"
                    ></Icon>
                </Badge>
                <Badge dot>
                    <a href="#">可以是一个链接</a>
                </Badge>
            </template>

        </div>

        <div class="view-list">

            <h3>封顶数字</h3>

            <template>
                <Badge :count="100">
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="1000"
                    overflow-count="999"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
            </template>

        </div>

        <div class="view-list">

            <h3>独立使用及自定义样式</h3>

            <template>
                <Badge :count="10"></Badge>
                <Badge
                    :count="20"
                    class-name="demo-badge-alone"
                ></Badge>
            </template>

        </div>

        <div class="view-list">

            <h3>自定义内容</h3>

            <template>
                <Row>
                    <Col span="6">
                    <Badge text="new">
                        <a
                            href="#"
                            class="demo-badge"
                        ></a>
                    </Badge>
                    </Col>
                    <Col span="6">
                    <Badge text="hot">
                        <a
                            href="#"
                            class="demo-badge"
                        ></a>
                    </Badge>
                    </Col>
                </Row>
            </template>

        </div>

        <div class="view-list">

            <h3>状态点</h3>

            <template>
                <Badge status="success" />
                <Badge status="error" />
                <Badge status="default" />
                <Badge status="processing" />
                <Badge status="warning" />
                <br />
                <Badge
                    status="success"
                    text="Success"
                />
                <br />
                <Badge
                    status="error"
                    text="Error"
                />
                <br />
                <Badge
                    status="default"
                    text="Default"
                />
                <br />
                <Badge
                    status="processing"
                    text="Processing"
                />
                <br />
                <Badge
                    status="warning"
                    text="Warning"
                />
            </template>

        </div>

        <div class="view-list">

            <h3>预设颜色</h3>

            <template>
                <Badge
                    :count="5"
                    type="primary"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="5"
                    type="success"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="5"
                    type="normal"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="5"
                    type="info"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="5"
                    type="error"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
                <Badge
                    :count="5"
                    type="warning"
                >
                    <a
                        href="#"
                        class="demo-badge"
                    ></a>
                </Badge>
            </template>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
