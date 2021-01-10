<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Anchor 锚点</h2>

        <div class="view-list">

            <h3 id="basic_usage">基本结构<a href="#basic_usage"></a></h3>

            <template>
                <Anchor show-ink>
                    <AnchorLink
                        href="#basic_usage"
                        title="Basic Usage"
                    />
                    <AnchorLink
                        href="#static_position"
                        title="Static Position"
                    />
                    <AnchorLink
                        href="#API"
                        title="API"
                    >
                        <AnchorLink
                            href="#Anchor_props"
                            title="Anchor props"
                        />
                        <AnchorLink
                            href="#Anchor_events"
                            title="Anchor events"
                        />
                        <AnchorLink
                            href="#AnchorLink_props"
                            title="AnchorLink props"
                        />
                    </AnchorLink>
                </Anchor>
            </template>
        </div>

        <div class="view-list">

            <h3 id="static_position">静态位置<a href="#static_position"></a></h3>

            <template>
                <Anchor
                    :affix="false"
                    show-ink
                >
                    <AnchorLink
                        href="#basic_usage"
                        title="Basic Usage"
                    />
                    <AnchorLink
                        href="#static_position"
                        title="Static Position"
                    />
                    <AnchorLink
                        href="#API"
                        title="API"
                    >
                        <AnchorLink
                            href="#Anchor_props"
                            title="Anchor props"
                        />
                        <AnchorLink
                            href="#Anchor_events"
                            title="Anchor events"
                        />
                        <AnchorLink
                            href="#AnchorLink_props"
                            title="AnchorLink props"
                        />
                    </AnchorLink>
                </Anchor>
            </template>
        </div>

        <h2 id="API">API<a href="#API"></a></h2>
        <h2 id="Anchor_props">Anchor_props<a href="#Anchor_props"></a></h2>
        <h2 id="Anchor_events">Anchor_events<a href="#Anchor_events"></a></h2>
        <h2 id="AnchorLink_props">AnchorLink_props<a href="#AnchorLink_props"></a></h2>
    </div>

</template>
<script>
export default {
    data() {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
