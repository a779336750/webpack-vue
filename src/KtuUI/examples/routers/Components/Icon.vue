<style lang="scss" scoped>
.icon {
    &:nth-child(2n) {
        width: 32px;
        height: 32px;
    }
}
</style>

<style lang="scss">
.icon-view {
    .icon {
        width: 24px;
        height: 24px;
        margin: 5px;
        .svg-icon {
            &:hover {
                fill: #ff7700;
            }
        }
    }
}
</style>

<template>
    <div class="icon-view">
        <h2>SVG 图标</h2>

        <div class="view-list">
            <h3>简单样式</h3>
            <icon id="svg-type-web"></icon>
            <icon
                id="#svg-type-web"
                color="red"
            ></icon>
            <icon id="svg-type-social"></icon>
            <icon
                id="#svg-type-social"
                color="red"
            ></icon>

            <icon id="svg-check-circle"></icon>
            <icon
                id="#svg-check-circle"
                color="red"
            ></icon>

            <icon id="svg-compass"></icon>
            <icon
                id="#svg-compass"
                color="red"
            ></icon>
        </div>

        <div class="view-list">
            <h3>所有图标</h3>
            <all-icon></all-icon>
        </div>

    </div>
</template>

<script>
import allIcon from "../../components/icon.vue";

export default {
    name: "IconView",
    components: { allIcon },
    data() {
        return {};
    }
};
</script>