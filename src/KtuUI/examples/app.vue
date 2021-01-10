<style lang="scss">
@import "../base/sass/index.scss";

.wrapper {
    .item {
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
            margin-bottom: 10px;
        }
    }
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
}
::-webkit-scrollbar-track {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
}
</style>

<style lang="scss" scoped>
$header-height: 64px;

.container {
    height: 100vh;
    padding: 0;
    background-color: #f1f1f1;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    line-height: $header-height;
    background-color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.05);

    .left-nav {
        float: left;
        padding: 0 40px;
        font-size: 16px;
        font-weight: bold;

        ul {
            display: flex;
            flex-wrap: wrap;
            text-align: center;
        }

        li {
            float: left;
            width: 64px;
        }
        li + li {
            margin-left: 20px;
        }
    }

    .right-nav {
        float: right;
        padding: 0 40px;
        font-weight: bold;

        .nav-list {
            display: flex;
            flex-direction: row-reverse;
        }
    }
}

.content {
    height: 100vh;
    padding-top: $header-height + 10px;

    &-view {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>


<template>
    <div class="container">
        <svg-sprite></svg-sprite>

        <div class="header">
            <nav class="left-nav">
                <ul>
                    <li>
                        <router-link to="/Components">组件</router-link>
                    </li>
                    <li>
                        <router-link to="/Specification">规范</router-link>
                    </li>
                </ul>
            </nav>

            <nav class="right-nav">
                <ul class="nav-list">
                    <template v-if="!loginInfo">
                        <li>
                            <Button
                                type="text"
                                @click="showLoginModal = true"
                            >登陆</Button>
                        </li>

                        <li>
                            <Button
                                type="text"
                                @click="editDoc"
                            >{{!isEditDoc ? '预览文档' : '编辑文档'}}</Button>
                        </li>
                    </template>

                    <template v-else>
                        <li>
                            <Button
                                type="text"
                                @click="showLoginModal = true"
                            >{{loginInfo}}</Button>
                        </li>

                        <li>
                            <Button
                                type="text"
                                @click="editDoc"
                            >{{!isEditDoc ? '预览文档' : '编辑文档'}}</Button>
                        </li>
                    </template>
                </ul>
                <Modal
                    v-model="showLoginModal"
                    :styles="{top: '100px'}"
                >
                    <p
                        slot="header"
                        style="color:#f60;text-align:center"
                    >
                        <span>员工账号登陆</span>
                    </p>
                    <div class="wrapper">
                        <div class="item">
                            <span>账号：</span>
                            <Input
                                v-model="username"
                                placeholder="请输入账号"
                                style="width: 300px"
                            />
                        </div>
                        <div class="item">
                            <span>密码：</span>
                            <Input
                                v-model="password"
                                placeholder="请输入密码"
                                style="width: 300px"
                            />
                        </div>
                    </div>
                    <div slot="footer">
                        <Button
                            type="theme"
                            @click="login"
                        >登陆</Button>
                    </div>
                </Modal>
            </nav>
        </div>

        <div class="content">
            <div class="content-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import svgsprite from "./components/svgsprite.vue";

export default {
    components: {
        "svg-sprite": svgsprite
    },
    data: function() {
        return {
            showLoginModal: false,
            username: "",
            password: ""
        };
    },
    computed: {
        loginInfo: {
            get() {
                return this.$store.state.loginInfo;
            },
            set(name) {
                localStorage.setItem("loginInfo", name);
                this.$store.state.loginInfo = name;
            }
        },
        isEditDoc: {
            get() {
                return this.$store.state.isEditDoc;
            },
            set(name) {
                localStorage.setItem("isEditDoc", name);
                this.$store.state.isEditDoc = name;
            }
        }
    },
    mounted() {},
    methods: {
        login() {
            if (!this.username || !this.password) {
                this.$Message.error("请输入账号和密码");
            }

            let values = {
                username: this.username,
                password: this.password
            };
            fetch(`http://localhost:8088/login`, {
                method: "post",
                body: JSON.stringify(values),
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    console.log(res);
                    res.json().then(data => {
                        console.log(data);

                        if (data.success) {
                            this.$Message.success("登录成功");
                            this.loginInfo = values.username;
                            this.showLoginModal = false;
                        } else {
                            this.$Message.error("对不起,用户名或密码错误!");
                        }
                    });
                }
            });
        },

        editDoc() {
            this.isEditDoc = !this.isEditDoc;
        }
    }
};
</script>
