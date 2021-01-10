
<style lang="scss" scoped>
.btn {
    margin-right: 10px;
}
</style>

<template>
    <div class="button-view">
        <h2>按钮 Button</h2>

        <div class="view-list">
            <h3>按钮类型</h3>
            <template>
                <Button>Default</Button>
                <Button type="primary">Primary</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <br><br>
                <Button type="info">Info</Button>
                <Button type="success">Success</Button>
                <Button type="warning">Warning</Button>
                <Button type="error">Error</Button>
            </template>
        </div>

        <div class="view-list">
            <h3>幽灵按钮</h3>
            <div
                class=""
                style="background-color : #ccc;padding:20px;"
            >
                <template>
                    <Button
                        type="default"
                        ghost
                    >Default</Button>
                    <Button
                        type="primary"
                        ghost
                    >Primary</Button>
                    <Button
                        type="dashed"
                        ghost
                    >Dashed</Button>
                    <Button
                        type="text"
                        ghost
                    >Text</Button>
                    <Button
                        type="info"
                        ghost
                    >Info</Button>
                    <Button
                        type="success"
                        ghost
                    >Success</Button>
                    <Button
                        type="warning"
                        ghost
                    >Warning</Button>
                    <Button
                        type="error"
                        ghost
                    >Error</Button>
                </template>
            </div>

        </div>

        <div class="view-list">
            <h3>图标按钮及按钮形状</h3>
            <template>
                <Button
                    type="primary"
                    shape="circle"
                    icon="#svg-type-web"
                ></Button>
                <Button
                    type="primary"
                    icon="#svg-type-web"
                >Search</Button>
                <Button
                    type="primary"
                    shape="circle"
                    icon="#svg-type-web"
                >Search</Button>
                <Button
                    type="primary"
                    shape="circle"
                >Circle</Button>
                <br><br>
                <Button
                    shape="circle"
                    icon="#svg-type-web"
                ></Button>
                <Button icon="#svg-type-web">Search</Button>
                <Button
                    shape="circle"
                    icon="#svg-type-web"
                >Search</Button>
                <Button shape="circle">Circle</Button>
            </template>
        </div>

        <div class="view-list">
            <h3>按钮尺寸</h3>
            <template>
                <div>
                    <RadioGroup
                        v-model="buttonSize"
                        type="button"
                    >
                        <Radio label="large">Large</Radio>
                        <Radio label="default">Default</Radio>
                        <Radio label="small">small</Radio>
                    </RadioGroup>
                    <br><br>
                    <Button
                        :size="buttonSize"
                        type="primary"
                    >Primary</Button>
                    <Button
                        :size="buttonSize"
                        type="default"
                    >Default</Button>
                    <Button
                        :size="buttonSize"
                        type="dashed"
                    >Dashed</Button>
                    <Button
                        :size="buttonSize"
                        type="text"
                    >Text</Button>
                    <br><br>
                    <Button
                        :size="buttonSize"
                        icon="#svg-type-web"
                        type="primary"
                        shape="circle"
                    ></Button>
                    <Button
                        :size="buttonSize"
                        icon="#svg-type-web"
                        type="primary"
                    >Download</Button>
                    <br><br>
                    <ButtonGroup :size="buttonSize">
                        <Button
                            :size="buttonSize"
                            type="primary"
                        >
                            <Icon id="#svg-type-web" />
                            Backward
                        </Button>
                        <Button
                            :size="buttonSize"
                            type="primary"
                        >
                            Forward
                            <Icon id="#svg-type-web" />
                        </Button>
                    </ButtonGroup>
                </div>
            </template>
        </div>

        <div class="view-list">
            <h3>长按钮</h3>
            <template>
                <Button
                    type="success"
                    long
                >SUBMIT</Button>
                <br><br>
                <Button
                    type="error"
                    long
                >DELETE</Button>
            </template>
        </div>

        <div class="view-list">
            <h3>不可用状态</h3>
            <template>
                <Button>Default</Button>
                <Button disabled>Default(Disabled)</Button>
                <br>
                <Button type="primary">Primary</Button>
                <Button
                    type="primary"
                    disabled
                >Primary(Disabled)</Button>
                <br>
                <Button type="dashed">Dashed</Button>
                <Button
                    type="dashed"
                    disabled
                >Dashed(Disabled)</Button>
                <br>
                <Button type="text">Text</Button>
                <Button
                    type="text"
                    disabled
                >Text(Disabled)</Button>
            </template>
        </div>

        <div class="view-list">
            <h3>加载中状态</h3>
            <template>
                <Button
                    type="primary"
                    loading
                >Loading...</Button>
                <Button
                    type="primary"
                    :loading="loading"
                    @click="toLoading"
                >
                    <span v-if="!loading">Click me!</span>
                    <span v-else>Loading...</span>
                </Button>
                <Button
                    type="primary"
                    :loading="loading2"
                    icon="#svg-type-web"
                    @click="toLoading2"
                >
                    <span v-if="!loading2">Click me!</span>
                    <span v-else>Loading...</span>
                </Button>
                <Button
                    loading
                    shape="circle"
                ></Button>
                <Button
                    loading
                    shape="circle"
                    type="primary"
                ></Button>
            </template>
        </div>

        <div class="view-list">
            <h3>按钮组合</h3>
            <template>
                <h4>Basic</h4>
                <br><br>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button type="primary">Confirm</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button disabled>Yesterday</Button>
                    <Button disabled>Today</Button>
                    <Button disabled>Tomorrow</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button type="primary">L</Button>
                    <Button>M</Button>
                    <Button>M</Button>
                    <Button type="dashed">R</Button>
                </ButtonGroup>
                <br><br>
                <h4>Icons</h4>
                <br><br>
                <ButtonGroup>
                    <Button type="primary">
                        <icon id="#svg-type-web"></icon>
                        Backward
                    </Button>
                    <Button type="primary">
                        Forward
                        <icon id="#svg-type-web"></icon>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button
                        type="primary"
                        icon="#svg-type-web"
                    ></Button>
                    <Button
                        type="primary"
                        icon="#svg-type-web"
                    ></Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                </ButtonGroup>
                <br><br>
                <h4>Circle</h4>
                <br><br>
                <ButtonGroup shape="circle">
                    <Button type="primary">
                        <icon id="#svg-type-web"></icon>
                        Backward
                    </Button>
                    <Button type="primary">
                        Forward
                        <icon id="#svg-type-web"></icon>
                    </Button>
                </ButtonGroup>
                <ButtonGroup shape="circle">
                    <Button
                        type="primary"
                        icon="#svg-type-web"
                    ></Button>
                    <Button
                        type="primary"
                        icon="#svg-type-web"
                    ></Button>
                </ButtonGroup>
                <ButtonGroup shape="circle">
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                </ButtonGroup>
                <br><br>
                <h4>Size</h4>
                <br><br>
                <ButtonGroup size="large">
                    <Button>Large</Button>
                    <Button>Large</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button>Default</Button>
                    <Button>Default</Button>
                </ButtonGroup>
                <ButtonGroup size="small">
                    <Button>Small</Button>
                    <Button>Small</Button>
                </ButtonGroup>
                <br><br>
                <ButtonGroup
                    size="large"
                    shape="circle"
                >
                    <Button>Large</Button>
                    <Button>Large</Button>
                </ButtonGroup>
                <ButtonGroup shape="circle">
                    <Button>Default</Button>
                    <Button>Default</Button>
                </ButtonGroup>
                <ButtonGroup
                    size="small"
                    shape="circle"
                >
                    <Button>Small</Button>
                    <Button>Small</Button>
                </ButtonGroup>
            </template>
        </div>

        <div class="view-list">
            <h3>按钮组纵向排列</h3>
            <template>
                <ButtonGroup vertical>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                    <Button icon="#svg-type-web"></Button>
                </ButtonGroup>
            </template>
        </div>

        <div class="view-list">
            <h3>跳转</h3>
            <template>
                <Button to="/components/icon-en">Normal</Button>
                <Button
                    to="/components/icon-en"
                    replace
                >No history</Button>
                <Button
                    to="//iviewui.com"
                    target="_blank"
                >New window</Button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ButtonView",

    data() {
        return {
            buttonSize: "large",
            loading: false,
            loading2: false
        };
    },
    methods: {
        toLoading() {
            this.loading = true;
        },
        toLoading2() {
            this.loading2 = true;
        }
    }
};
</script>
