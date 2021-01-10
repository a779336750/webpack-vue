<template>
    <div class="Notice">
        <h2> Notice 通知提醒 </h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Button type="theme" @click="open(false)">Open notice</Button>
                <Button @click="open(true)">Open notice(only title)</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 提醒类型 </h3>

            <template>
                <p>With desc</p>
                <Button @click="info(false)">Info</Button>
                <Button @click="success(false)">Success</Button>
                <Button @click="warning(false)">Warning</Button>
                <Button @click="error(false)">Error</Button>
                <p>Only title</p>
                <Button @click="info(true)">Info</Button>
                <Button @click="success(true)">Success</Button>
                <Button @click="warning(true)">Warning</Button>
                <Button @click="error(true)">Error</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> 自定义时长 </h3>

            <template>
                <Button type="theme" @click="time">Open notice</Button>
            </template>
        </div>

        <div class="view-list">
            <h3> Render 函数 </h3>  

            <template>
                <Button type="theme" @click="renderFunc">Open notice</Button>
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
            open (nodesc) {
                this.$Notice.open({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            info (nodesc) {
                this.$Notice.info({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            success (nodesc) {
                this.$Notice.success({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            warning (nodesc) {
                this.$Notice.warning({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            error (nodesc) {
                this.$Notice.error({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            time () {
                this.$Notice.open({
                    title: 'Notification title',
                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                    duration: 0
                });
            },
            renderFunc () {
                this.$Notice.success({
                    title: 'Notification title',
                    desc: 'The desc will hide when you set render.',
                    render: h => {
                        return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                        ])
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>