<style lang="scss" scoped>
.menu-list {
    margin-bottom: 10px;
    overflow: hidden;
}

.item {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="menu-view">
        <h2>Menu 导航栏</h2>

        <div class="view-list">

            <h3>顶部导航</h3>
            <template>
                <Menu
                    mode="horizontal"
                    :theme="theme1"
                    active-name="1"
                >
                    <MenuItem name="1">
                    <Icon id="#svg-type-web" />
                    内容管理
                    </MenuItem>

                    <MenuItem name="2">
                    <Icon id="#svg-type-web" />
                    用户管理
                    </MenuItem>

                    <Submenu name="3">
                        <template slot="title">
                            <Icon id="#svg-type-web" />
                            统计分析
                        </template>
                        <MenuGroup title="使用">
                            <MenuItem name="3-1">新增和启动</MenuItem>
                            <MenuItem name="3-2">活跃分析</MenuItem>
                            <MenuItem name="3-3">时段分析</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="留存">
                            <MenuItem name="3-4">用户留存</MenuItem>
                            <MenuItem name="3-5">流失用户</MenuItem>
                        </MenuGroup>
                    </Submenu>

                    <MenuItem name="4">
                    <Icon id="#svg-type-web" />
                    综合设置
                    </MenuItem>
                </Menu>
                <br>
                <p>Change theme</p>
                <RadioGroup v-model="theme1">
                    <Radio label="light"></Radio>
                    <Radio label="dark"></Radio>
                    <Radio label="primary"></Radio>
                </RadioGroup>
            </template>

        </div>

        <div class="view-list">

            <h3>侧栏导航</h3>

            <template>
                <div class="item">
                    <Menu :theme="theme2">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                内容管理
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                </div>
                <div class="item">
                    <Menu
                        :theme="theme2"
                        active-name="1-2"
                        :open-names="['1']"
                    >
                        <Submenu name="1">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                内容管理
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                </div>
                <div class="item">
                    <Menu
                        :theme="theme2"
                        :open-names="['1']"
                        accordion
                    >
                        <Submenu name="1">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                内容管理
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon id="#svg-type-web" />
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                </div>
                <br>
                <p>Change theme</p>
                <RadioGroup v-model="theme2">
                    <Radio label="light"></Radio>
                    <Radio label="dark"></Radio>
                </RadioGroup>
            </template>

        </div>

        <div class="view-list">

            <h3>内嵌菜单</h3>

            <template>
                <Menu
                    active-name="1-2"
                    :open-names="['1']"
                >
                    <Submenu name="1">
                        <template slot="title">
                            <Icon id="#svg-type-web" />
                            Navigation One
                        </template>
                        <MenuGroup title="Item 1">
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="Item 2">
                            <MenuItem name="1-3">Option 3</MenuItem>
                            <MenuItem name="1-4">Option 4</MenuItem>
                        </MenuGroup>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon id="#svg-type-web" />
                            Navigation Two
                        </template>
                        <MenuItem name="2-1">Option 5</MenuItem>
                        <MenuItem name="2-2">Option 6</MenuItem>
                        <Submenu name="3">
                            <template slot="title">Submenu</template>
                            <MenuItem name="3-1">Option 7</MenuItem>
                            <MenuItem name="3-2">Option 8</MenuItem>
                        </Submenu>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon id="#svg-type-web" />
                            Navigation Three
                        </template>
                        <MenuItem name="4-1">Option 9</MenuItem>
                        <MenuItem name="4-2">Option 10</MenuItem>
                        <MenuItem name="4-3">Option 11</MenuItem>
                        <MenuItem name="4-4">Option 12</MenuItem>
                    </Submenu>
                </Menu>
            </template>

        </div>

        <div class="view-list">

            <h3>分组</h3>

            <template>
                <Menu
                    :theme="theme3"
                    active-name="1"
                >
                    <MenuGroup title="内容管理">
                        <MenuItem name="1">
                        <Icon id="#svg-type-web" />
                        文章管理
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon id="#svg-type-web" />
                        评论管理
                        </MenuItem>
                    </MenuGroup>
                    <MenuGroup title="统计分析">
                        <MenuItem name="3">
                        <Icon id="#svg-type-web" />
                        用户留存
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon id="#svg-type-web" />
                        流失用户
                        </MenuItem>
                    </MenuGroup>
                </Menu>
                <br>
                <p>Change theme</p>
                <RadioGroup v-model="theme3">
                    <Radio label="light"></Radio>
                    <Radio label="dark"></Radio>
                </RadioGroup>
            </template>

        </div>

    </div>
</template>
<script>
export default {
    name: "MenuView",

    data() {
        return {
            theme1: "light",
            theme2: "light",
            theme3: "light"
        };
    }
};
</script>
