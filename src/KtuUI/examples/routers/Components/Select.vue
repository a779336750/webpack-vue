<style lang="scss" scoped>
.menu-list {
    margin-bottom: 10px;
    overflow: hidden;
}
</style>

<template>
    <div class="menu-view">
        <h2> Select 选择框 </h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <Select
                v-model="model1"
                style="width:200px"
            >
                <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>

        </div>

        <div class="view-list">
            <h3> 不同大小 </h3>

            <template>
                <Select
                    v-model="model2"
                    size="small"
                    style="width:100px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model3"
                    style="width:100px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model4"
                    size="large"
                    style="width:100px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 禁用 </h3>

            <template>
                <Select
                    v-model="model5"
                    disabled
                    style="width:200px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model6"
                    style="width:200px"
                >
                    <Option value="beijing">New York</Option>
                    <Option
                        value="shanghai"
                        disabled
                    >London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 可清空 </h3>

            <template>
                <Select
                    v-model="model8"
                    clearable
                    style="width:200px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 分组 </h3>

            <template>
                <Select
                    v-model="model7"
                    style="width:200px"
                >
                    <OptionGroup label="Hot Cities">
                        <Option
                            v-for="item in cityList1"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Other Cities">
                        <Option
                            v-for="item in cityList2"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </OptionGroup>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 自定义模板 </h3>

            <template>
                <Select
                    v-model="model9"
                    style="width:200px"
                >
                    <Option
                        value="New York"
                        label="New York"
                    >
                        <span>New York</span>
                        <span style="float:right;color:#ccc">America</span>
                    </Option>
                    <Option
                        value="London"
                        label="London"
                    >
                        <span>London</span>
                        <span style="float:right;color:#ccc">U.K.</span>
                    </Option>
                    <Option
                        value="Sydney"
                        label="Sydney"
                    >
                        <span>Sydney</span>
                        <span style="float:right;color:#ccc">Australian</span>
                    </Option>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 多选 </h3>

            <template>
                <Select
                    v-model="model10"
                    multiple
                    style="width:260px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>

        </div>

        <div class="view-list">
            <h3> 前缀图标 </h3>

            <template>
                <Select
                    v-model="model15"
                    prefix="ios-home"
                    style="width:200px"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model15"
                    style="width:200px"
                >
                    <Avatar
                        src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                        slot="prefix"
                        size="small"
                    />
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>
        </div>

        <div class="view-list">
            <h3> 标签集合 </h3>

            <template>
                <Select
                    v-model="model16"
                    multiple
                    :max-tag-count="2"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model16"
                    multiple
                    :max-tag-count="2"
                    :max-tag-placeholder="maxTagPlaceholder"
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>
        </div>

        <div class="view-list">
            <h3> 可搜索 </h3>

            <template>
                <Select
                    v-model="model11"
                    filterable
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    v-model="model12"
                    filterable
                    multiple
                >
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </template>
        </div>

        <div class="view-list">
            <h3> 可远程搜索 </h3>

            <template>

                <Select
                    v-model="model13"
                    filterable
                    remote
                    :remote-method="remoteMethod1"
                    :loading="loading1"
                >
                    <Option
                        v-for="(option, index) in options1"
                        :value="option.value"
                        :key="index"
                    >{{option.label}}</Option>
                </Select>

                <Select
                    v-model="model14"
                    multiple
                    filterable
                    remote
                    :remote-method="remoteMethod2"
                    :loading="loading2"
                >
                    <Option
                        v-for="(option, index) in options2"
                        :value="option.value"
                        :key="index"
                    >{{option.label}}</Option>
                </Select>

            </template>
        </div>

    </div>
</template>
<script>
export default {
    name: "SelectView",

    data() {
        return {
            cityList: [
                {
                    value: "New York",
                    label: "New York"
                },
                {
                    value: "London",
                    label: "London"
                },
                {
                    value: "Sydney",
                    label: "Sydney"
                },
                {
                    value: "Ottawa",
                    label: "Ottawa"
                },
                {
                    value: "Paris",
                    label: "Paris"
                },
                {
                    value: "Canberra",
                    label: "Canberra"
                }
            ],
            cityList1: [
                {
                    value: "New York",
                    label: "New York"
                },
                {
                    value: "London",
                    label: "London"
                },
                {
                    value: "Sydney",
                    label: "Sydney"
                }
            ],
            cityList2: [
                {
                    value: "Ottawa",
                    label: "Ottawa"
                },
                {
                    value: "Paris",
                    label: "Paris"
                },
                {
                    value: "Canberra",
                    label: "Canberra"
                }
            ],
            model1: "",
            model2: "",
            model3: "",
            model4: "",
            model5: "",
            model6: "",
            model7: "",
            model8: "",
            model9: "",
            model10: [],
            model11: "",
            model12: [],
            model15: "",
            model16: [],

            model13: "",
            loading1: false,
            options1: [],
            model14: [],
            loading2: false,
            options2: [],
            list: [
                "Alabama",
                "Alaska",
                "Arizona",
                "Arkansas",
                "California",
                "Colorado",
                "Connecticut",
                "Delaware",
                "Florida",
                "Georgia",
                "Hawaii",
                "Idaho",
                "Illinois",
                "Indiana",
                "Iowa",
                "Kansas",
                "Kentucky",
                "Louisiana",
                "Maine",
                "Maryland",
                "Massachusetts",
                "Michigan",
                "Minnesota",
                "Mississippi",
                "Missouri",
                "Montana",
                "Nebraska",
                "Nevada",
                "New hampshire",
                "New jersey",
                "New mexico",
                "New york",
                "North carolina",
                "North dakota",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Pennsylvania",
                "Rhode island",
                "South carolina",
                "South dakota",
                "Tennessee",
                "Texas",
                "Utah",
                "Vermont",
                "Virginia",
                "Washington",
                "West virginia",
                "Wisconsin",
                "Wyoming"
            ]
        };
    },

    methods: {
        changeUnit(val) {
            this.nowValue = val;
        },
        typeChange(value) {
            this.typeValue = value;
        },
        maxTagPlaceholder(num) {
            return "more " + num;
        },
        remoteMethod1(query) {
            if (query !== "") {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    const list = this.list.map(item => {
                        return {
                            value: item,
                            label: item
                        };
                    });
                    this.options1 = list.filter(
                        item =>
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                    );
                }, 200);
            } else {
                this.options1 = [];
            }
        },
        remoteMethod2(query) {
            if (query !== "") {
                this.loading2 = true;
                setTimeout(() => {
                    this.loading2 = false;
                    const list = this.list.map(item => {
                        return {
                            value: item,
                            label: item
                        };
                    });
                    this.options2 = list.filter(
                        item =>
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                    );
                }, 200);
            } else {
                this.options2 = [];
            }
        }
    }
};
</script>