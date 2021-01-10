<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Steps 步骤条</h2>

        <div class="view-list">

            <h3>基本结构</h3>

            <template>
                <Steps :current="1">
                    <Step
                        title="已完成"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="进行中"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="待进行"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="待进行"
                        content="这里是该步骤的描述信息"
                    ></Step>
                </Steps>
            </template>
        </div>

        <div class="view-list">

            <h3>迷你版</h3>

            <template>
                <Steps
                    :current="2"
                    size="small"
                >
                    <Step title="已完成"></Step>
                    <Step title="进行中"></Step>
                    <Step title="待进行"></Step>
                    <Step title="待进行"></Step>
                </Steps>
            </template>
        </div>

        <div class="view-list">

            <h3>带图标的步骤条</h3>

            <template>
                <Steps :current="1">
                    <Step
                        title="注册"
                        icon="svg-user"
                    ></Step>
                    <Step
                        title="上传头像"
                        icon="svg-camera"
                    ></Step>
                    <Step
                        title="验证邮箱"
                        icon="svg-mail"
                    ></Step>
                </Steps>
            </template>
        </div>

        <div class="view-list">

            <h3>切换步骤</h3>

            <template>
                <p>当前正在进行第 {{ current + 1 }} 步</p>
                <Steps :current="current">
                    <Step title="步骤1"></Step>
                    <Step title="步骤2"></Step>
                    <Step title="步骤3"></Step>
                    <Step title="步骤4"></Step>
                </Steps>
                <Button
                    type="primary"
                    @click="next"
                >下一步</Button>
            </template>
        </div>

        <div class="view-list">

            <h3>垂直方向</h3>

            <template>
                <Steps
                    :current="2"
                    direction="vertical"
                >
                    <Step
                        title="已完成"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="已完成"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="进行中"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="待进行"
                        content="这里是该步骤的描述信息"
                    ></Step>
                </Steps>
            </template>
        </div>

        <div class="view-list">

            <h3>步骤运行错误</h3>

            <template>
                <Steps
                    :current="1"
                    status="error"
                >
                    <Step
                        title="已完成"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="进行中"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="待进行"
                        content="这里是该步骤的描述信息"
                    ></Step>
                    <Step
                        title="待进行"
                        content="这里是该步骤的描述信息"
                    ></Step>
                </Steps>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            current: 0
        };
    },
    methods: {
        next() {
            if (this.current == 3) {
                this.current = 0;
            } else {
                this.current += 1;
            }
        }
    }
};
</script>
