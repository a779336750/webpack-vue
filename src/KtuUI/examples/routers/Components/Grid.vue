<template>
    <div class="Divider">
        <h2>Divider 分割线</h2>

        <div class="view-list">
            <h3> 基础用法 </h3>
            <template>
                <Row>
                    <Col span="12">col-12</Col>
                    <Col span="12">col-12</Col>
                </Row>
                <br>
                <Row>
                    <Col span="8">col-8</Col>
                    <Col span="8">col-8</Col>
                    <Col span="8">col-8</Col>
                </Row>
                <br>
                <Row>
                    <Col span="6">col-6</Col>
                    <Col span="6">col-6</Col>
                    <Col span="6">col-6</Col>
                    <Col span="6">col-6</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 区块间隔 </h3>
            <template>
                <Row :gutter="16">
                    <Col span="6">
                    <div>col-6</div>
                    </Col>
                    <Col span="6">
                    <div>col-6</div>
                    </Col>
                    <Col span="6">
                    <div>col-6</div>
                    </Col>
                    <Col span="6">
                    <div>col-6</div>
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 栅格顺序(Flex) </h3>

            <template>
                <Row type="flex">
                    <Col
                        span="6"
                        order="4"
                    >1 | order-4</Col>
                    <Col
                        span="6"
                        order="3"
                    >2 | order-3</Col>
                    <Col
                        span="6"
                        order="2"
                    >3 | order-2</Col>
                    <Col
                        span="6"
                        order="1"
                    >4 | order-1</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 栅格排序 </h3>

            <template>
                <Row>
                    <Col
                        span="18"
                        push="6"
                    >col-18 | push-6</Col>
                    <Col
                        span="6"
                        pull="18"
                    >col-6 | pull-18</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 左右偏移 </h3>

            <template>
                <Row>
                    <Col span="8">col-8</Col>
                    <Col
                        span="8"
                        offset="8"
                    >col-8 | offset-8</Col>
                </Row>
                <br>
                <Row>
                    <Col
                        span="6"
                        offset="8"
                    >col-6 | offset-8</Col>
                    <Col
                        span="6"
                        offset="4"
                    >col-6 | offset-4</Col>
                </Row>
                <br>
                <Row>
                    <Col
                        span="12"
                        offset="8"
                    >col-12 | offset-8</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> Flex布局 </h3>

            <template>
                <p>子元素向左排列</p>
                <Row
                    type="flex"
                    justify="start"
                    class="code-row-bg"
                >
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                </Row>
                <p>子元素向右排列</p>
                <Row
                    type="flex"
                    justify="end"
                    class="code-row-bg"
                >
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                </Row>
                <p>子元素居中排列</p>
                <Row
                    type="flex"
                    justify="center"
                    class="code-row-bg"
                >
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                </Row>
                <p>子元素等宽排列</p>
                <Row
                    type="flex"
                    justify="space-between"
                    class="code-row-bg"
                >
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                </Row>
                <p>子元素分散排列</p>
                <Row
                    type="flex"
                    justify="space-around"
                    class="code-row-bg"
                >
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                    <Col span="4">col-4</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> Flex对齐 </h3>

            <template>
                <p>顶部对齐</p>
                <Row
                    type="flex"
                    justify="center"
                    align="top"
                    class="code-row-bg"
                >
                    <Col span="4">
                    <p style="height: 80px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 30px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 100px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 60px">col-4</p>
                    </Col>
                </Row>
                <p>底部对齐</p>
                <Row
                    type="flex"
                    justify="center"
                    align="bottom"
                    class="code-row-bg"
                >
                    <Col span="4">
                    <p style="height: 80px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 30px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 100px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 60px">col-4</p>
                    </Col>
                </Row>
                <p>居中对齐</p>
                <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    class="code-row-bg"
                >
                    <Col span="4">
                    <p style="height: 80px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 30px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 100px">col-4</p>
                    </Col>
                    <Col span="4">
                    <p style="height: 60px">col-4</p>
                    </Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 响应式布局 </h3>

            <template>
                <Row>
                    <Col
                        :xs="2"
                        :sm="4"
                        :md="6"
                        :lg="8"
                    >Col</Col>
                    <Col
                        :xs="20"
                        :sm="16"
                        :md="12"
                        :lg="8"
                    >Col</Col>
                    <Col
                        :xs="2"
                        :sm="4"
                        :md="6"
                        :lg="8"
                    >Col</Col>
                </Row>
            </template>
        </div>

        <div class="view-list">
            <h3> 其它属性的响应式 </h3>

            <template>
                <Row>
                    <Col
                        :xs="{ span: 5, offset: 1 }"
                        :lg="{ span: 6, offset: 2 }"
                    >Col</Col>
                    <Col
                        :xs="{ span: 11, offset: 1 }"
                        :lg="{ span: 6, offset: 2 }"
                    >Col</Col>
                    <Col
                        :xs="{ span: 5, offset: 1 }"
                        :lg="{ span: 6, offset: 2 }"
                    >Col</Col>
                </Row>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.col {
    color: #fff;
    padding: 10px 0;
    text-align: center;
    background: rgba(0, 153, 229, 0.9);

    &:nth-child(odd) {
        background: rgba(0, 153, 229, 0.7);
    }
}
</style>