<style lang="scss" scoped>
.alert-list {
    margin-bottom: 10px;
    overflow: hidden;
}
.progress {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="Alert">
        <h2>Progress 进度条</h2>

        <div class="view-list">
            <h3>基本用法</h3>
            <Progress :percent="25" />
            <Progress
                :percent="45"
                status="active"
            />
            <Progress
                :percent="65"
                status="wrong"
            />
            <Progress :percent="100" />
            <Progress
                :percent="25"
                hide-info
            />
        </div>

        <div class="view-list">
            <h3>百分比内显</h3>
            <template>
                <Progress
                    :percent="25"
                    :stroke-width="20"
                    text-inside
                />
                <Progress
                    :percent="45"
                    :stroke-width="20"
                    status="active"
                    text-inside
                />
                <Progress
                    :percent="65"
                    :stroke-width="20"
                    status="wrong"
                    text-inside
                />
                <Progress
                    :percent="100"
                    :stroke-width="20"
                    text-inside
                />
            </template>
        </div>

        <div class="view-list">
            <h3>垂直方向</h3>
            <template>
                <div style="height: 100px;">
                    <Progress
                        vertical
                        :percent="25"
                    />
                    <Progress
                        vertical
                        :percent="45"
                        status="active"
                    />
                    <Progress
                        vertical
                        :percent="65"
                        status="wrong"
                    />
                    <Progress
                        vertical
                        :percent="100"
                    />
                    <Progress
                        vertical
                        :percent="25"
                        hide-info
                    />
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3>配合外部组件使用</h3>
            <template>
                <Progress :percent="percent" />
                <ButtonGroup size="large">
                    <Button
                        icon="ios-add"
                        @click="add"
                    ></Button>
                    <Button
                        icon="ios-remove"
                        @click="minus"
                    ></Button>
                </ButtonGroup>
            </template>
        </div>

        <div class="view-list">
            <h3>自定义更多样式</h3>
            <template>
                <Progress
                    :percent="25"
                    :stroke-width="16"
                />
                <Progress
                    :percent="60"
                    :stroke-width="22"
                    status="wrong"
                >
                    <span>网络异常压缩失败</span>
                </Progress>

                <Progress
                    :percent="100"
                    :stroke-width="22"
                >
                    <span>压缩完成</span>
                </Progress>
            </template>
        </div>

        <div class="view-list">
            <h3>渐变色</h3>
            <template>
                <Progress
                    :percent="90"
                    :stroke-color="['#108ee9', '#87d068']"
                />
            </template>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            percent: 0
        };
    },
    methods: {
        add() {
            if (this.percent >= 100) {
                return false;
            }
            this.percent += 10;
        },
        minus() {
            if (this.percent <= 0) {
                return false;
            }
            this.percent -= 10;
        }
    }
};
</script>
