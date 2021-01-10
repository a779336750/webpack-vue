<style lang="scss" scoped>
    .top,.bottom {
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
    .tooltip {
        margin: 0 5px;
    }
</style>

<template>
    <div class="tooltip-view">
        <h2>Tooltip 文字提示</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Tooltip content="Here is the prompt text">
                    A balloon appears when the mouse passes over this text
                </Tooltip>
            </template>
        </div>

        <div class="view-list">
            <h3> 位置 </h3>
            <template>
                <div class="top">
                    <Tooltip :always="true" content="左上" placement="top-start">
                        <Button>左上</Button>
                    </Tooltip>
                    <Tooltip content="Top Center text" placement="top">
                        <Button>中上</Button>
                    </Tooltip>
                    <Tooltip content="Top Right text" placement="top-end">
                        <Button>右上</Button>
                    </Tooltip>
                </div>
                <div class="center">
                    <div class="center-left">
                        <Tooltip content="Left Top text" placement="left-start">
                            <Button>左上</Button>
                        </Tooltip><br><br>
                        <Tooltip content="Left Center text" placement="left">
                            <Button>左中</Button>
                        </Tooltip><br><br>
                        <Tooltip content="Left Bottom text" placement="left-end">
                            <Button>左下</Button>
                        </Tooltip>
                    </div>
                    <div class="center-right">
                        <Tooltip content="Right Top text" placement="right-start">
                            <Button>右上</Button>
                        </Tooltip><br><br>
                        <Tooltip content="Right Center text" placement="right">
                            <Button>右中</Button>
                        </Tooltip><br><br>
                        <Tooltip content="Right Bottom text" placement="right-end">
                            <Button>右下</Button>
                        </Tooltip>
                    </div>
                </div>
                <div class="bottom">
                    <Tooltip content="Bottom Left text" placement="bottom-start">
                        <Button>左下</Button>
                    </Tooltip>
                    <Tooltip content="Bottom Center text" placement="bottom">
                        <Button>中下</Button>
                    </Tooltip>
                    <Tooltip content="Bottom Right text" placement="bottom-end">
                        <Button>右下</Button>
                    </Tooltip>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3> 自定义内容 </h3>

            <template>
                <Tooltip placement="top">
                    <Button>多行显示</Button>
                    <div slot="content">
                        <p>Display multiple lines of information</p>
                        <p><i>Can customize the style</i></p>
                    </div>
                </Tooltip>
            </template>

        </div>

        <div class="view-list">
            <h3> 禁用 </h3>

            <template>
                <Tooltip placement="top" content="Can disable text prompts" :disabled="disabled">
                    <Button @click="disabled = true">点击关闭</Button>
                </Tooltip>
            </template>

        </div>

        <div class="view-list">
            <h3> 延时 </h3>

            <template>
                <Tooltip placement="top" content="Tooltip text" :delay="1000">
                    <Button @click="disabled = true">延迟1s显示</Button>
                </Tooltip>
            </template>
            
        </div>

        <div class="view-list">
            <h3> 自动换行 </h3>

            <template>
                <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                    <Button>长文本</Button>
                </Tooltip>
            </template>
            
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                text: 'Tooltip 文字提示',
                disabled: false
            };
        },
        methods: {
            handleChange () {
                this.text = '提示'
            }
        }
    }
</script>

