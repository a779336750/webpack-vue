<style lang="scss">
$navWidth: 208px;

.comp-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;

    .comp-nav {
        width: $navWidth;
        height: 100%;
        overflow: auto;
        border-right: 4px solid #f1f1f1;
        padding: 20px 0;

        .nav-item-group-title {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            padding-left: 10px;
        }
        .nav-list {
            padding: 10px 0;

            .nav-item {
                display: block;
                height: 36px;
                line-height: 36px;
                padding-left: 20px;
                cursor: pointer;

                &:hover {
                    color: #ff7700;
                }
                &.active {
                    border-right: 2px solid #ff7700;
                    background-color: #ffe8df;
                    color: #ff7700;
                }
            }
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .comp-content {
        position: relative;
        height: 100%;
        overflow: auto;
        padding: 10px 24px 10px;
        flex: 1;
        border-right: 4px solid #f1f1f1;

        h2 {
            font-size: 18px;
            padding: 8px 0;
            font-weight: 600;
        }

        h3 {
            font-size: 16px;
            padding: 8px 0 12px;
            font-weight: 600;
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .comp-markdown {
        width: 45%;
        height: 100%;
        padding-left: 10px;
        overflow: auto;
    }
}
</style>

<template>
    <div class="comp-wrapper">
        <nav class="comp-nav">
            <div
                class="nav-group"
                v-for="(group,i) in navObject"
                :key="i"
            >
                <div class="nav-item-group-title">{{group.title}}</div>
                <ul class="nav-list">
                    <li
                        class="nav-item"
                        :class="{'active' : item.name === active }"
                        v-for="(item,key) in group.child"
                        :key="key"
                        @click="change( item.name )"
                    >
                        <span v-text="item.title"></span>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="comp-content">
            <router-view></router-view>
            <template>
                <BackTop></BackTop>
            </template>
        </div>

        <div class="comp-markdown">
            <mark-down
                @on-paste-image="handlePasteImage"
                @on-save="save"
                :initialValue="initialValue"
                :markedOptions="{baseUrl:'http://smalleyes.oss-cn-shanghai.aliyuncs.com/'}"
                :preview="justShowPreview"
            ></mark-down>
        </div>

    </div>
</template>

<script>
import ComponentsRouter from "./routerConf.js";
import MarkDown from "../markdown/index.vue";

export default {
    name: "Home",

    components: {
        MarkDown
    },
    data() {
        return {
            parentPath: "/Components/",
            navObject: [
                {
                    title: "基础",
                    name: "base",
                    child: [
                        {
                            name: "Icon",
                            title: "Icon 图标"
                        },
                        {
                            name: "Button",
                            title: "Button 按钮"
                        }
                    ]
                },
                {
                    title: "功能",
                    name: "feature",
                    child: [
                        {
                            name: "Undoredo",
                            title: "Undoredo 前进撤销"
                        }
                    ]
                },
                {
                    title: "布局",
                    name: "layout",
                    child: [
                        {
                            name: "Grid",
                            title: "Grid 栅格"
                        },
                        {
                            name: "Layout",
                            title: "Layout 布局"
                        },
                        {
                            name: "Card",
                            title: "Card 卡片集"
                        },
                        {
                            name: "Collapse",
                            title: "Collapse 折叠版"
                        },
                        {
                            name: "Divider",
                            title: "Divider 分割线"
                        },
                        {
                            name: "Cell",
                            title: "Cell 单元格"
                        }
                    ]
                },
                {
                    title: "导航",
                    name: "nav",
                    child: [
                        {
                            name: "Menu",
                            title: "Menu 菜单"
                        },
                        {
                            name: "Tabs",
                            title: "Tabs 标签页"
                        },
                        {
                            name: "Page",
                            title: "Page 分页"
                        },
                        {
                            name: "Dropdown",
                            title: "Dropdown 下拉菜单"
                        },
                        {
                            name: "Breadcrumb",
                            title: "Breadcrumb 面包屑"
                        },
                        {
                            name: "Badge",
                            title: "Badge 微标数"
                        },
                        {
                            name: "Anchor",
                            title: "Anchor 锚点"
                        },
                        {
                            name: "Steps",
                            title: "Steps 步骤条"
                        }
                    ]
                },
                {
                    title: "视图",
                    name: "view",
                    child: [
                        {
                            name: "Alert",
                            title: "Alert 警告提示"
                        },
                        {
                            name: "Carousel",
                            title: "Carousel 轮播"
                        },
                        {
                            name: "Message",
                            title: "Message 全局提示"
                        },
                        {
                            name: "Modal",
                            title: "Modal 弹出框"
                        },
                        {
                            name: "Notice",
                            title: "Notice 通知提示"
                        },

                        {
                            name: "Drawer",
                            title: "Drawer 抽屉"
                        },
                        {
                            name: "Tree",
                            title: "Tree 树形控件"
                        },
                        {
                            name: "Tooltip",
                            title: "Tooltip 文字提示"
                        },
                        {
                            name: "Poptip",
                            title: "Poptip 气泡提示"
                        },
                        {
                            name: "Avatar",
                            title: "Avatar 头像"
                        },
                        {
                            name: "Tag",
                            title: "Tag 标签"
                        },
                        {
                            name: "Progress",
                            title: "Progress 进度条"
                        }
                    ]
                },
                {
                    title: "表单",
                    name: "form",
                    child: [
                        {
                            name: "Checkbox",
                            title: "Checkbox 多选框"
                        },
                        {
                            name: "Input",
                            title: "Input 输入框"
                        },
                        {
                            name: "InputNumber",
                            title: "InputNumber 数字输入框"
                        },
                        {
                            name: "Radio",
                            title: "Radio 单选"
                        },
                        {
                            name: "Select",
                            title: "Select 选择框"
                        },
                        {
                            name: "Slider",
                            title: "Slider 滑动条"
                        },
                        {
                            name: "Switch",
                            title: "Switch 开关"
                        },
                        {
                            name: "Table",
                            title: "Table 表格"
                        },
                        {
                            name: "AutoComplete",
                            title: "AutoComplete 自动完成"
                        },
                        {
                            name: "DatePicker",
                            title: "DatePicker 日期选择器"
                        },
                        {
                            name: "TimePicker",
                            title: "TimePicker 时间选择器"
                        },
                        {
                            name: "Cascader",
                            title: "Cascader 级联选择"
                        },
                        {
                            name: "Rate",
                            title: "Rate 评分"
                        },
                        {
                            name: "Upload",
                            title: "Upload 上传"
                        },
                        {
                            name: "ColorPicker",
                            title: "ColorPicker 颜色选择器"
                        },
                        {
                            name: "Form",
                            title: "Form 表单"
                        }
                    ]
                },
                {
                    title: "其他",
                    name: "other",
                    child: [
                        {
                            name: "Circle",
                            title: "Circle 进度环"
                        },
                        {
                            name: "BackTop",
                            title: "BackTop 返回顶部"
                        },
                        {
                            name: "Spin",
                            title: "Spin 加载中"
                        }
                    ]
                }
            ],
            active: null,
            initialValue: "",
            theme: "light"
        };
    },
    computed: {
        justShowPreview: {
            get() {
                return this.$store.state.isEditDoc ? 2 : 1;
            }
        }
    },
    methods: {
        change(name) {
            if (name != this.active) {
                let path = this.parentPath + name;

                this.$router.push({
                    path: path
                });

                this.active = name;

                this.getDoc();
            }
        },
        getDoc() {
            let values = {
                name: this.active
            };

            fetch(`http://172.17.0.139:8081/getDoc`, {
                method: "post",
                body: JSON.stringify(values),
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data);

                        if (data.success) {
                            this.initialValue = data.files;
                        } else {
                            this.$Message.error("对不起,用户名或密码错误!");
                        }
                    });
                }
            });
        },
        saveDoc(doc) {
            let values = {
                name: this.active,
                doc: doc
            };

            fetch(`http://172.17.0.139:8081/setDoc`, {
                method: "post",
                body: JSON.stringify(values),
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data);

                        if (data.success) {
                            this.$Message.success("保存成功！");
                        } else {
                            this.$Message.error("保存失败!");
                        }
                    });
                }
            });
        },
        save(res) {
            console.log(res);

            this.saveDoc(res.value);
        },
        handlePasteImage(res) {
            console.log(res);
        }
    },
    mounted() {
        this.active = this.$route.path.replace("/Components/", "");
        this.getDoc();
    }
};
</script>
