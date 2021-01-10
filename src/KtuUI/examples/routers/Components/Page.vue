<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Page 分页</h2>

        <div class="view-list">

            <h3>基本用法</h3>

            <template>
                <Page :total="100" />
            </template>
        </div>

        <div class="view-list">

            <h3>每页数量</h3>

            <template>
                <Page
                    :total="100"
                    show-sizer
                />
            </template>
        </div>

        <div class="view-list">

            <h3>电梯</h3>

            <template>
                <Page
                    :total="100"
                    show-elevator
                />
            </template>
        </div>

        <div class="view-list">

            <h3>总数</h3>

            <template>
                <Page
                    :total="100"
                    show-total
                />
            </template>
        </div>

        <div class="view-list">

            <h3>迷你型</h3>

            <template>
                <Page
                    :total="40"
                    size="small"
                />
                <Page
                    :total="40"
                    size="small"
                    show-elevator
                    show-sizer
                />
                <Page
                    :total="40"
                    size="small"
                    show-total
                />
            </template>
        </div>

        <div class="view-list">

            <h3>简洁</h3>

            <template>
                <Page
                    :current="2"
                    :total="50"
                    simple
                />
            </template>
        </div>

        <div class="view-list">

            <h3>上一页和下一页</h3>

            <template>
                <Page
                    :total="100"
                    prev-text="Previous"
                    next-text="Next"
                />
            </template>
        </div>
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
