<template>
    <transition name="fade">
        <div
            :class="classes"
            v-if="fullscreenVisible"
        >
            <div :class="mainClasses">
                <template v-if="type==='imgload'">
                    <div class="loader">
                        <svg
                            class="circular"
                            viewBox="25 25 50 50"
                        >
                            <circle
                                class="path-thumb"
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                            ></circle>
                            <circle
                                class="path-bar"
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                            ></circle>

                        </svg>
                    </div>
                    <div class="load-text">
                        <slot>加载中...</slot>
                    </div>
                </template>

                <template v-else>
                    <span :class="dotClasses"></span>

                    <div :class="textClasses">
                        <slot></slot>
                    </div>
                </template>

            </div>
        </div>
    </transition>
</template>
<script>
import { oneOf } from "../../utils/assist";
import ScrollbarMixins from "../modal/mixins-scrollbar";

const prefixCls = "spin";

export default {
    name: "Spin",
    mixins: [ScrollbarMixins],
    props: {
        size: {
            validator(value) {
                return oneOf(value, ["small", "large", "default"]);
            },
            default() {
                return "default";
            }
        },
        fix: {
            type: Boolean,
            default: false
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        type: {
            validator(value) {
                return oneOf(value, ["imgload"]);
            }
        }
    },
    data() {
        return {
            showText: false,
            // used for $Spin
            visible: false
        };
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-fix`]: this.fix,
                    [`${prefixCls}-show-text`]: this.showText,
                    [`${prefixCls}-fullscreen`]: this.fullscreen
                },
                `${prefixCls}-${this.type}`
            ];
        },
        mainClasses() {
            return `${prefixCls}-main`;
        },
        dotClasses() {
            return `${prefixCls}-dot`;
        },
        textClasses() {
            return `${prefixCls}-text`;
        },
        fullscreenVisible() {
            if (this.fullscreen) {
                return this.visible;
            } else {
                return true;
            }
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.addScrollEffect();
            } else {
                this.removeScrollEffect();
            }
        }
    },
    mounted() {
        this.showText = this.$slots.default !== undefined;
    }
};
</script>
