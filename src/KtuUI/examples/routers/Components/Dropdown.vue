<template>
    <div class="Dropdown">
        <h2>Dropdown 下拉菜单</h2>

        <div class="view-list">
            <h3> 简单样式 </h3>

            <template>
                <Dropdown>
                    <a href="javascript:void(0)">
                        下拉菜单
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem divided>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown style="margin-left: 20px">
                    <Button type="theme">
                        下拉菜单
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem divided>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </template>
        </div>

        <div class="view-list">
            <h3> 触发方式 </h3>

            <template>
                <Dropdown>
                    <a href="javascript:void(0)">
                        hover 触发
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown
                    trigger="click"
                    style="margin-left: 20px"
                >
                    <a href="javascript:void(0)">
                        click 触发
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown
                    trigger="contextMenu"
                    style="margin-left: 20px"
                >
                    <a href="javascript:void(0)">
                        right click
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>返回</DropdownItem>
                        <DropdownItem style="color: #ed4014">删除</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown
                    trigger="custom"
                    :visible="visible"
                    style="margin-left: 20px"
                >
                    <a
                        href="javascript:void(0)"
                        @click="handleOpen"
                    >
                        custom 触发
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <p>常用于各种自定义下拉内容的场景。</p>
                        <div style="text-align: right;margin:10px;">
                            <Button
                                type="theme"
                                @click="handleClose"
                            >关闭</Button>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </template>
        </div>

        <div class="view-list">
            <h3> 对齐方向 </h3>

            <template>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        菜单(左)
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown style="margin-left: 20px">
                    <a href="javascript:void(0)">
                        菜单(居中)
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown
                    style="margin-left: 20px"
                    placement="bottom-end"
                >
                    <a href="javascript:void(0)">
                        菜单(右)
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </template>
        </div>

        <div class="view-list">
            <h3> 嵌套用法 </h3>

            <template>
                <Dropdown>
                    <a href="javascript:void(0)">
                        北京小吃
                        <Icon id="#svg-arrow-bottom-1"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <Dropdown placement="right-start">
                            <DropdownItem>
                                北京烤鸭
                                <Icon id="#svg-arrow-bottom-1"></Icon>
                            </DropdownItem>
                            <DropdownMenu slot="list">
                                <DropdownItem>挂炉烤鸭</DropdownItem>
                                <DropdownItem>焖炉烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </template>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        };
    },
    methods: {
        handleOpen() {
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>