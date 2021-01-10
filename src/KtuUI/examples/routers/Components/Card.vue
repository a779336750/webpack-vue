<template>
    <div class="menu-view">
        <h2> card 卡片 </h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <div style="background:#eee;padding: 20px">
                    <Card :bordered="false">
                        <p slot="title">No border title</p>
                        <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                    </Card>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3> 禁用悬停阴影 </h3>

            <template>
                <Card>
                    <p slot="title">The standard card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>

                <Card dis-hover>
                    <p slot="title">Disable card with hover shadows</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>

            </template>
        </div>

        <div class="view-list">
            <h3> 卡片阴影 </h3>

            <template>
                <Card :bordered="false">
                    <p slot="title">Borderless card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>

                <Card shadow>
                    <p slot="title">Use a card with a shadow effect</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>

            </template>
        </div>

        <div class="view-list">
            <h3> 简洁卡片 </h3>

            <template>
                <Card style="width:320px">
                    <div style="text-align:center">
                        <img src="../../images/401.jpg">
                        <h3>A high quality UI Toolkit based on Vue.js</h3>
                    </div>
                </Card>
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
</style>