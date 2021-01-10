<style lang="scss" >
.layout-single {
    .layout {
        border: 1px solid #d7dde4;
        background: #fff;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 324px;
        margin-bottom: 34px;
        text-align: center;

        &-header {
            color: #fff;
        }

        &-sider {
            color: #fff;
        }
    }
}

.layout-con {
    height: 100%;
    width: 100%;

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width 0.2s ease 0.2s;
    }
    .menu-item i {
        transform: translateX(0px);
        transition: font-size 0.2s ease, transform 0.2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span {
        width: 0px;
        transition: width 0.2s ease;
    }
    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
        vertical-align: middle;
        font-size: 22px;
    }
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center {
    text-align: center;
}
</style>

<template>
    <div class="menu-view">
        <h2>Layout 布局</h2>

        <div class="view-list">

            <h3>基本结构</h3>

            <template>
                <div class="layout-single">
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Header>Header</Header>
                        <Layout>
                            <Sider hide-trigger>Sider</Sider>
                            <Content>Content</Content>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Header>Header</Header>
                        <Layout>
                            <Content>Content</Content>
                            <Sider hide-trigger>Sider</Sider>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Sider hide-trigger>Sider</Sider>
                        <Layout>
                            <Header>Header</Header>
                            <Content>Content</Content>
                            <Footer>Footer</Footer>
                        </Layout>
                    </Layout>
                </div>
            </template>

        </div>

        <div class="view-list">

            <h3>上中下布局</h3>

            <template>
                <div class="layout-con">
                    <Layout>
                        <Header>
                            <Menu
                                mode="horizontal"
                                theme="dark"
                                active-name="1"
                            >
                                <div class="layout-logo"></div>
                                <div class="layout-nav">
                                    <MenuItem name="1">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                    </MenuItem>
                                    <MenuItem name="2">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                    </MenuItem>
                                    <MenuItem name="3">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                    </MenuItem>
                                    <MenuItem name="4">
                                    <Icon type="ios-paper"></Icon>
                                    Item 4
                                    </MenuItem>
                                </div>
                            </Menu>
                        </Header>
                        <Content :style="{padding: '0 50px'}">
                            <Breadcrumb :style="{margin: '20px 0'}">
                                <BreadcrumbItem>Home</BreadcrumbItem>
                                <BreadcrumbItem>Components</BreadcrumbItem>
                                <BreadcrumbItem>Layout</BreadcrumbItem>
                            </Breadcrumb>
                            <Card>
                                <div style="min-height: 200px;">
                                    Content
                                </div>
                            </Card>
                        </Content>
                        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
                    </Layout>
                </div>
            </template>

        </div>

        <div class="view-list">

            <h3>顶部-侧边布局-通栏</h3>

            <template>
                <div class="layout-con">
                    <Layout>
                        <Header>
                            <Menu
                                mode="horizontal"
                                theme="dark"
                                active-name="1"
                            >
                                <div class="layout-logo"></div>
                                <div class="layout-nav">
                                    <MenuItem name="1">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                    </MenuItem>
                                    <MenuItem name="2">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                    </MenuItem>
                                    <MenuItem name="3">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                    </MenuItem>
                                    <MenuItem name="4">
                                    <Icon type="ios-paper"></Icon>
                                    Item 4
                                    </MenuItem>
                                </div>
                            </Menu>
                        </Header>
                        <Layout>
                            <Sider
                                hide-trigger
                                :style="{background: '#fff'}"
                            >
                                <Menu
                                    active-name="1-2"
                                    theme="light"
                                    width="auto"
                                    :open-names="['1']"
                                >
                                    <Submenu name="1">
                                        <template slot="title">
                                            <Icon type="ios-navigate"></Icon>
                                            Item 1
                                        </template>
                                        <MenuItem name="1-1">Option 1</MenuItem>
                                        <MenuItem name="1-2">Option 2</MenuItem>
                                        <MenuItem name="1-3">Option 3</MenuItem>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-keypad"></Icon>
                                            Item 2
                                        </template>
                                        <MenuItem name="2-1">Option 1</MenuItem>
                                        <MenuItem name="2-2">Option 2</MenuItem>
                                    </Submenu>
                                    <Submenu name="3">
                                        <template slot="title">
                                            <Icon type="ios-analytics"></Icon>
                                            Item 3
                                        </template>
                                        <MenuItem name="3-1">Option 1</MenuItem>
                                        <MenuItem name="3-2">Option 2</MenuItem>
                                    </Submenu>
                                </Menu>
                            </Sider>
                            <Layout :style="{padding: '0 24px 24px'}">
                                <Breadcrumb :style="{margin: '24px 0'}">
                                    <BreadcrumbItem>Home</BreadcrumbItem>
                                    <BreadcrumbItem>Components</BreadcrumbItem>
                                    <BreadcrumbItem>Layout</BreadcrumbItem>
                                </Breadcrumb>
                                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                                    Content
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
            </template>

        </div>

        <div class="view-list">

            <h3>顶部-侧边布局</h3>

            <template>
                <div class="layout-con">
                    <Layout>
                        <Header>
                            <Menu
                                mode="horizontal"
                                theme="dark"
                                active-name="1"
                            >
                                <div class="layout-logo"></div>
                                <div class="layout-nav">
                                    <MenuItem name="1">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                    </MenuItem>
                                    <MenuItem name="2">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                    </MenuItem>
                                    <MenuItem name="3">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                    </MenuItem>
                                    <MenuItem name="4">
                                    <Icon type="ios-paper"></Icon>
                                    Item 4
                                    </MenuItem>
                                </div>
                            </Menu>
                        </Header>
                        <Layout :style="{padding: '0 50px'}">
                            <Breadcrumb :style="{margin: '16px 0'}">
                                <BreadcrumbItem>Home</BreadcrumbItem>
                                <BreadcrumbItem>Components</BreadcrumbItem>
                                <BreadcrumbItem>Layout</BreadcrumbItem>
                            </Breadcrumb>
                            <Content :style="{padding: '24px 0', minHeight: '180px', background: '#fff'}">
                                <Layout>
                                    <Sider
                                        hide-trigger
                                        :style="{background: '#fff'}"
                                    >
                                        <Menu
                                            active-name="1-2"
                                            theme="light"
                                            width="auto"
                                            :open-names="['1']"
                                        >
                                            <Submenu name="1">
                                                <template slot="title">
                                                    <Icon type="ios-navigate"></Icon>
                                                    Item 1
                                                </template>
                                                <MenuItem name="1-1">Option 1</MenuItem>
                                                <MenuItem name="1-2">Option 2</MenuItem>
                                                <MenuItem name="1-3">Option 3</MenuItem>
                                            </Submenu>
                                            <Submenu name="2">
                                                <template slot="title">
                                                    <Icon type="ios-keypad"></Icon>
                                                    Item 2
                                                </template>
                                                <MenuItem name="2-1">Option 1</MenuItem>
                                                <MenuItem name="2-2">Option 2</MenuItem>
                                            </Submenu>
                                            <Submenu name="3">
                                                <template slot="title">
                                                    <Icon type="ios-analytics"></Icon>
                                                    Item 3
                                                </template>
                                                <MenuItem name="3-1">Option 1</MenuItem>
                                                <MenuItem name="3-2">Option 2</MenuItem>
                                            </Submenu>
                                        </Menu>
                                    </Sider>
                                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                                        Content
                                    </Content>
                                </Layout>
                            </Content>
                        </Layout>
                        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
                    </Layout>
                </div>

            </template>

        </div>

        <div class="view-list">

            <h3>自定义触发器</h3>

            <template>
                <div class="layout-con">
                    <Layout>
                        <Sider
                            ref="side1"
                            hide-trigger
                            collapsible
                            :collapsed-width="78"
                            v-model="isCollapsed"
                        >
                            <Menu
                                active-name="1-2"
                                theme="dark"
                                width="auto"
                                :class="menuitemClasses"
                            >
                                <MenuItem name="1-1">
                                <Icon type="ios-navigate"></Icon>
                                <span>Option 1</span>
                                </MenuItem>
                                <MenuItem name="1-2">
                                <Icon type="ios-search"></Icon>
                                <span>Option 2</span>
                                </MenuItem>
                                <MenuItem name="1-3">
                                <Icon type="ios-settings"></Icon>
                                <span>Option 3</span>
                                </MenuItem>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header
                                :style="{padding: 0}"
                                class="layout-header-bar"
                            >
                                <Icon
                                    @click.native="collapsedSider"
                                    :class="rotateIcon"
                                    :style="{margin: '0 20px'}"
                                    type="md-menu"
                                    size="24"
                                ></Icon>
                            </Header>
                            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </template>

        </div>

        <div class="view-list">

            <h3>响应式布局</h3>

            <template>
                <div class="layout-con">
                    <Layout>
                        <Sider
                            breakpoint="md"
                            collapsible
                            :collapsed-width="78"
                            v-model="isCollapsed"
                        >
                            <Menu
                                active-name="1-2"
                                theme="dark"
                                width="auto"
                                :class="menuitemClasses"
                            >
                                <MenuItem name="1-1">
                                <Icon type="ios-navigate"></Icon>
                                <span>Option 1</span>
                                </MenuItem>
                                <MenuItem name="1-2">
                                <Icon type="ios-search"></Icon>
                                <span>Option 2</span>
                                </MenuItem>
                                <MenuItem name="1-3">
                                <Icon type="ios-settings"></Icon>
                                <span>Option 3</span>
                                </MenuItem>
                            </Menu>
                            <div slot="trigger"></div>
                        </Sider>
                        <Layout>
                            <Header class="layout-header-bar"></Header>
                            <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </template>

        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        menuitemClasses: function() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        },
        rotateIcon() {
            return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
        }
    },
    methods: {
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        }
    }
};
</script>
