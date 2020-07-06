<template>
    <div class="wraper">

    </div>

</template>
<script>
export default {
    data () {

        return {
            list: [
                {
                    name: 'jason',
                    id: 1
                },
                {
                    name: 'jason',
                    id: 2
                },
                {
                    name: 'jason',
                    id: 3
                },
                {
                    name: 'jason',
                    id: 4
                },
            ]
        }

    }
}
</script>

<style scoped>
    .wraper {
        width: 100px;
        height: 200px;
        overflow-y: scroll;
        background: url("../../image/aaaa.png");
    }
    .scroller {
        height: 100%;
    }

    .user {
        height: 32%;
        padding: 0 12px;
        display: flex;
        align-items: center;
    }
</style>
