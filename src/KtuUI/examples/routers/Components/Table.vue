<style lang="scss" >
</style>

<template>
    <div class="menu-view">
        <h2>Table 表格</h2>

        <div class="view-list">

            <h3>简洁结构</h3>
            <template>
                <Table
                    :columns="columns1"
                    type="simple"
                    :data="data1"
                ></Table>
            </template>
        </div>

        <div class="view-list">

            <h3>基本结构</h3>
            <template>
                <Table
                    :columns="columns1"
                    :data="data1"
                ></Table>
            </template>
        </div>

        <div class="view-list">

            <h3>斑马纹</h3>
            <template>
                <Table
                    stripe
                    :columns="columns1"
                    :data="data1"
                ></Table>
            </template>
        </div>

        <div class="view-list">

            <h3>带边框 </h3>
            <template>
                <Table
                    border
                    :columns="columns1"
                    :data="data1"
                ></Table>
            </template>
        </div>

        <div class="view-list">

            <h3>固定表头</h3>
            <template>
                <Table
                    height="200"
                    :columns="columns1"
                    :data="data2"
                ></Table>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns1: [
                {
                    title: "Name",
                    key: "name"
                },
                {
                    title: "Age",
                    key: "age"
                },
                {
                    title: "Address",
                    key: "address"
                }
            ],
            data1: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ],
            data2: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ]
        };
    },
    computed: {},
    methods: {}
};
</script>
