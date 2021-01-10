<template>
    <div class="Divider">
        <h2>Divider 分割线</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
                <Divider />
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
                <Divider>With Text</Divider>
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
                <Divider dashed />
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
            </template>

        </div>

        <div class="view-list">
            <h3> 垂直分割线 </h3>

            <template>
                Text
                <Divider type="vertical" />
                <a href="#">Link</a>
                <Divider type="vertical" />
                <a href="#">Link</a>
            </template>

        </div>

        <div class="view-list">
            <h3> 标题位置 </h3>

            <template>
                <Divider orientation="left">Left Text</Divider>
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
                <Divider orientation="right">Right Text</Divider>
                <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
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