<style lang="scss" scoped>
.breadcrumb-list {
    margin-bottom: 10px;
    overflow: hidden;
}
</style>
<template>
    <div>
        <div class="breadcrumb-view">
            <h2>breadcrumb 面包屑</h2>

            <div class="view-list">

                <div class="breadcrumb-list">
                    <h3>简单样式</h3>
                    <Breadcrumb separator="/">
                        <Breadcrumb-item to="/Components">Components</Breadcrumb-item>
                        <Breadcrumb-item to="/Components/Button">Button</Breadcrumb-item>
                        <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
                    </Breadcrumb>
                </div>

                <div class="breadcrumb-list">
                    <h3>自定义分隔符</h3>
                    <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
                        <Breadcrumb-item to="/Components">Components</Breadcrumb-item>
                        <Breadcrumb-item to="/Components/Button">Button</Breadcrumb-item>
                        <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
                    </Breadcrumb>
                </div>

                <div class="breadcrumb-list">
                    <h3>带图标</h3>
                    <Breadcrumb>
                        <Breadcrumb-item to="/Components">
                            <icon id="#svg-type-web"></icon>
                            Components
                        </Breadcrumb-item>
                        <Breadcrumb-item to="/Components/Button">
                            <icon id="#svg-type-social"></icon>
                            Button
                        </Breadcrumb-item>
                        <Breadcrumb-item>
                            <icon id="#svg-type-web"></icon>
                            Breadcrumb
                        </Breadcrumb-item>
                    </Breadcrumb>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {};
</script>