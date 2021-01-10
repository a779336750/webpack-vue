// src/views/Home.vue
<style lang="scss" scoped>
</style>

<template>
     <component :is="tagName" :class="classes" :disabled="disabled" @click="handleClickLink" v-bind="tagProps">
        <icon :id="icon" v-if="icon && icontype === 0"></icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
        <icon :id="icon" v-if="icon && icontype === 1"></icon>
    </component>
</template>

<script>
    let Icon = resolve => {
        require(['../icon/icon.js'], resolve)
    }
    import { oneOf } from '../../utils/assist';
    import mixinsLink from '../../mixins/link';

    const prefixCls = 'btn';

    export default {
        name: 'Button',
        mixins: [ mixinsLink ],
        components: { Icon },

        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel']);
                },
                default: 'text'
            },
            value: {
                type: [String, Number],
                default: ''
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxlength: {
                type: Number
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            readonly: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            number: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            spellcheck: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                validator (value) {
                    return oneOf(value, ['on', 'off']);
                },
                default: 'off'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            elementId: {
                type: String
            },
            wrap: {
                validator (value) {
                    return oneOf(value, ['hard', 'soft']);
                },
                default: 'soft'
            },
            prefix: {
                type: String,
                default: ''
            },
            suffix: {
                type: String,
                default: ''
            },
            search: {
                type: Boolean,
                default: false
            },
            enterButton: {
                type: [Boolean, String],
                default: false
            }
        },

        data(){
            return {
                prefixCls : prefixCls,
                showSlot: true
            }
        },
        props: {
            //按钮类型
            type: {
                validator (value) {
                    return oneOf(value, ['default', 'theme', 'theme-ghost', 'text']);
                },
                default: 'default'
            },

            //按钮形状
            shape: {
                validator (value) {
                    return oneOf(value, ['circle','circle-left','circle-right']);
                },
            },

            //是否可用
            disabled: Boolean,

            //图标
            icon: {
                type: String,
            },

            //图标显示在按钮的前面还是后面
            icontype : {
                type: Number,
                default: 0
            }
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}`,
                    `${this.prefixCls}-${this.type}`,
                    {
                        [`${this.prefixCls}-${this.shape}`]: !!this.shape,
                        [`${this.prefixCls}-icon-only`]: !this.showSlot && !!this.icon,
                    }
                ];
            },

            // 是否有设置跳转链接，对应to属性
            isHrefPattern() {
                const {to} = this;
                return !!to;
            },

            // 根据是否有跳转链接设置标签
            tagName() {
                const {isHrefPattern} = this;
                return isHrefPattern ? 'a' : 'button';
            },

            // 根据是否有跳转链接设置标签属性
            tagProps() {
                const {isHrefPattern} = this;
                if(isHrefPattern) {
                    const {linkUrl,target}=this;
                    return {href: linkUrl, target};
                }
            }
        },
        methods: {
            // Ctrl or CMD and click, open in new window when use `to`
            handleClickLink (event) {
                this.$emit('click', event);
                const openInNewWindow = event.ctrlKey || event.metaKey;

                this.handleCheckClick(event, openInNewWindow);
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        }
    };
</script>