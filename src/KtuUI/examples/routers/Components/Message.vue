<template>
    <div class="Message">
        <h2>Message</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Button
                    type="theme"
                    @click="info"
                >Display info prompt</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 提示类型 </h3>

            <template>
                <Button @click="success">Display success prompt</Button>
                <Button @click="warning">Display warning prompt</Button>
                <Button @click="error">Display error prompt</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 加载中 </h3>

            <template>
                <Button @click="loading">Display loading...</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 自定义时长 </h3>

            <template>
                <Button @click="time">Displays a 10 second prompt</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 可关闭 </h3>

            <template>
                <Button @click="closable">Display a closable message</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 自定义 Render 函数 </h3>

            <template>
                <Button @click="renderFunc">show message</Button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        info() {
            this.$Message.info("This is a info tip");
        },
        success() {
            this.$Message.success("This is a success tip");
        },
        warning() {
            this.$Message.warning("This is a warning tip");
        },
        error() {
            this.$Message.error("This is an error tip");
        },
        loading() {
            const msg = this.$Message.loading({
                content: "Loading...",
                duration: 0
            });
            setTimeout(msg, 3000);
        },
        time() {
            this.$Message.info({
                content: "I'll be gone in 10 seconds",
                duration: 1000
            });
        },
        renderFunc() {
            this.$Message.info({
                render: h => {
                    return h("span", [
                        "This is created by ",
                        h("a", "render"),
                        " function"
                    ]);
                }
            });
        },
        closable() {
            this.$Message.info({
                content: "Tips for manual closing",
                duration: 10,
                closable: true
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>