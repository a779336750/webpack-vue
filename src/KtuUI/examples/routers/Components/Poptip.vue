<style lang="scss" >
.top,
.bottom {
    text-align: center;
}
.center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
}
.center-left {
    float: left;
}
.center-right {
    float: right;
}
</style>

<template>
    <div class="menu-view">
        <h2>Poptip 气泡提示</h2>

        <div class="view-list">

            <h3>基本结构</h3>
            <template>
                <Poptip
                    trigger="hover"
                    title="Title"
                    content="content"
                >
                    <Button>Hover</Button>
                </Poptip>
                <Poptip
                    title="Title"
                    content="content"
                >
                    <Button>Click</Button>
                </Poptip>
                <Poptip
                    trigger="focus"
                    title="Title"
                    content="content"
                >
                    <Button>Focus</Button>
                </Poptip>
                <Poptip
                    trigger="focus"
                    title="Title"
                    content="content"
                >
                    <Input placeholder="Input focus" />
                </Poptip>
            </template>
        </div>

        <div class="view-list">

            <h3>位置</h3>
            <template>
                <div class="top">
                    <Poptip
                        title="Title"
                        content="content"
                        placement="top-start"
                    >
                        <Button>Top Left</Button>
                    </Poptip>
                    <Poptip
                        title="Title"
                        content="content"
                        placement="top"
                    >
                        <Button>Top Center</Button>
                    </Poptip>
                    <Poptip
                        title="Title"
                        content="content"
                        placement="top-end"
                    >
                        <Button>Top Right</Button>
                    </Poptip>
                </div>
                <div class="center">
                    <div class="center-left">
                        <Poptip
                            title="Title"
                            content="content"
                            placement="left-start"
                        >
                            <Button>Left Top</Button>
                        </Poptip><br><br>
                        <Poptip
                            title="Title"
                            content="content"
                            placement="left"
                        >
                            <Button>Left Center</Button>
                        </Poptip><br><br>
                        <Poptip
                            title="Title"
                            content="content"
                            placement="left-end"
                        >
                            <Button>Left Bottom</Button>
                        </Poptip>
                    </div>
                    <div class="center-right">
                        <Poptip
                            title="Title"
                            content="content"
                            placement="right-start"
                        >
                            <Button>Right Top</Button>
                        </Poptip><br><br>
                        <Poptip
                            title="Title"
                            content="content"
                            placement="right"
                        >
                            <Button>Right Center</Button>
                        </Poptip><br><br>
                        <Poptip
                            title="Title"
                            content="content"
                            placement="right-end"
                        >
                            <Button>Right Bottom</Button>
                        </Poptip>
                    </div>
                </div>
                <div class="bottom">
                    <Poptip
                        title="Title"
                        content="content"
                        placement="bottom-start"
                    >
                        <Button>Bottom Left</Button>
                    </Poptip>
                    <Poptip
                        title="Title"
                        content="content"
                        placement="bottom"
                    >
                        <Button>Bottom Center</Button>
                    </Poptip>
                    <Poptip
                        title="Title"
                        content="content"
                        placement="bottom-end"
                    >
                        <Button>Bottom Right</Button>
                    </Poptip>
                </div>
            </template>
        </div>

        <div class="view-list">

            <h3>从浮层内关闭</h3>
            <template>
                <Poptip v-model="visible">
                    <a>Click</a>
                    <div slot="title"><i>Custom title</i></div>
                    <div slot="content">
                        <a @click="close">close</a>
                    </div>
                </Poptip>
            </template>
        </div>

        <div class="view-list">

            <h3>自动换行</h3>
            <template>
                <Poptip
                    word-wrap
                    width="200"
                    content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                >
                    <Button>Long Content</Button>
                </Poptip>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false
        };
    },
    computed: {},
    methods: {
        close() {
            this.visible = false;
        }
    }
};
</script>
