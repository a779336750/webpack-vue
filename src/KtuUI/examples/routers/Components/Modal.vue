<style lang="scss">
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .modal {
        top: 0;
    }
}
</style>

<template>
    <div class="Modal">
        <h2>Modal 对话框</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Button
                    type="theme"
                    @click="modal1 = true"
                >弹出对话框</Button>
                <Modal
                    v-model="modal1"
                    title="这是自定义对话框的标题"
                    @on-ok="ok"
                    @on-cancel="cancel"
                >
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                    <p>Content of dialog</p>
                </Modal>
            </template>
        </div>

        <div class="view-list">
            <h3> 自定义样式 </h3>

            <template>
                <Button @click="modal2 = true">自定义头部和尾部</Button>
                <Modal
                    v-model="modal2"
                    width="360"
                    :footerHide="false"
                >
                    <p
                        slot="header"
                        style="color:#f60;text-align:center"
                    >
                        <icon id="#svg-type-web"></icon>
                        <span>标题标题</span>
                    </p>
                    <div style="text-align:center">
                        <p>文本文本文本文本文本文本文本文本文本文本文本文本</p>
                        <p>文本文本文本文本文本文本文本</p>
                    </div>
                    <div slot="footer">
                        <Button
                            type="theme"
                            size="large"
                            long
                            :loading="modal_loading"
                            @click="del"
                        >删除</Button>
                    </div>
                </Modal>

                <Button @click="modal3 = true">没有头部栏</Button>
                <Modal v-model="modal3">
                    <p>文本文本文本文本文本文本文本</p>
                    <p>文本文本文本文本文本文本文本</p>
                    <p>文本文本文本文本文本文本文本</p>
                </Modal>

            </template>
        </div>

        <div class="view-list">
            <h3> 异步关闭 </h3>

            <template>
                <Button
                    type="theme"
                    @click="modal6 = true"
                >弹出对话框</Button>
                <Modal
                    v-model="modal6"
                    title="Title"
                    :loading="loading"
                    @on-ok="asyncOK"
                    :footerHide="false"
                >
                    <p>点击确定之后对话框不会立即关闭，而是会出现一个loading状态，两秒后才消失</p>
                </Modal>
            </template>
        </div>

        <div class="view-list">
            <h3> 禁用关闭 </h3>

            <template>
                <Button @click="modal7 = true">隐藏关闭按钮</Button>
                <Modal
                    title="Title"
                    v-model="modal7"
                    :closable="false"
                >
                    <p>没有关闭按钮</p>
                    <p>按esc键也会关闭</p>
                </Modal>

                <Button @click="modal8 = true">点击遮罩</Button>
                <Modal
                    title="Title"
                    v-model="modal8"
                    :mask-closable="false"
                >
                    <p>点击遮罩层时不会关闭对话框</p>
                </Modal>
            </template>

        </div>

        <div class="view-list">
            <h3> 自定义位置 </h3>

            <template>
                <Button @click="modal9 = true">距离顶部20px</Button>
                <Modal
                    title="Title"
                    v-model="modal9"
                    :styles="{top: '20px'}"
                >
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </Modal>
                <Button @click="modal10 = true">垂直居中</Button>
                <Modal
                    title="Title"
                    v-model="modal10"
                    class-name="vertical-center-modal"
                >
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </Modal>
            </template>

        </div>

        <div class="view-list">
            <h3> 全屏 </h3>

            <template>
                <Button @click="modal11 = true">全屏</Button>
                <Modal
                    v-model="modal11"
                    fullscreen
                    title="全屏对话框"
                >
                    <div>This is a fullscreen modal</div>
                </Modal>
            </template>

        </div>

        <div class="view-list">
            <h3> 拖拽移动 </h3>

            <template>
                <Button @click="modal12 = true">第一个弹窗</Button>
                <Button @click="modal13 = true">第二个弹窗</Button>
                <Modal
                    v-model="modal12"
                    draggable
                    scrollable
                    title="Modal 1"
                >
                    <div>这是第一个弹窗</div>
                    <div>这是第一个弹窗</div>
                </Modal>
                <Modal
                    v-model="modal13"
                    draggable
                    scrollable
                    title="Modal 2"
                >
                    <div>这是第二个弹窗</div>
                    <div>这是第二个弹窗</div>
                    <div>这是第二个弹窗</div>
                </Modal>
            </template>

        </div>

        <h2>Modal 对话框 -- 实例化使用方法</h2>

        <div class="view-list">
            <h3> 基本用法 </h3>

            <template>
                <Button @click="instance('info')">消息</Button>
                <Button @click="instance('success')">成功</Button>
                <Button @click="instance('warning')">警告</Button>
                <Button @click="instance('error')">错误</Button>
            </template>

        </div>

        <div class="view-list">
            <h3> 确认对话框 </h3>

            <template>
                <Button @click="confirm">标准</Button>
                <Button @click="custom">自定义按钮文字</Button>
                <Button @click="async">异步关闭</Button>
            </template>

        </div>

        <div class="view-list">
            <h3> 自定义内容 </h3>

            <template>
                <p>
                    Name: {{ value }}
                </p>
                <p>
                    <Button @click="handleRender">自定义内容</Button>
                </p>
            </template>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            modal1: false,
            modal2: false,
            modal_loading: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6: false,
            loading: true,
            modal7: false,
            modal8: false,
            modal9: false,
            modal10: false,
            modal11: false,
            modal12: false,
            modal13: false,
            value: ""
        };
    },
    methods: {
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        },
        del() {
            this.modal_loading = true;
            setTimeout(() => {
                this.modal_loading = false;
                this.modal2 = false;
                this.$Message.success("Successfully delete");
            }, 2000);
        },
        asyncOK() {
            setTimeout(() => {
                this.modal6 = false;
            }, 2000);
        },
        instance(type) {
            const title = "Title";
            const content = "<p>Content of dialog</p><p>Content of dialog</p>";
            switch (type) {
                case "info":
                    this.$Modal.info({
                        title: title,
                        content: content
                    });
                    break;
                case "success":
                    this.$Modal.success({
                        title: title,
                        content: content
                    });
                    break;
                case "warning":
                    this.$Modal.warning({
                        title: title,
                        content: content
                    });
                    break;
                case "error":
                    this.$Modal.error({
                        title: title,
                        content: content
                    });
                    break;
            }
        },
        confirm() {
            this.$Modal.confirm({
                title: "Title",
                content: "<p>Content of dialog</p><p>Content of dialog</p>",
                onOk: () => {
                    this.$Message.info("Clicked ok");
                },
                onCancel: () => {
                    this.$Message.info("Clicked cancel");
                }
            });
        },
        custom() {
            this.$Modal.confirm({
                title: "Title",
                content: "<p>Content of dialog</p><p>Content of dialog</p>",
                okText: "OK",
                cancelText: "Cancel"
            });
        },
        async() {
            this.$Modal.confirm({
                title: "Title",
                content: "<p>The dialog box will be closed after 2 seconds</p>",
                loading: true,
                onOk: () => {
                    setTimeout(() => {
                        this.$Modal.remove();
                        this.$Message.info(
                            "Asynchronously close the dialog box"
                        );
                    }, 2000);
                }
            });
        },
        handleRender() {
            this.$Modal.confirm({
                render: h => {
                    return h("Input", {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: "Please enter your name..."
                        },
                        on: {
                            input: val => {
                                this.value = val;
                            }
                        }
                    });
                }
            });
        }
    }
};
</script>

