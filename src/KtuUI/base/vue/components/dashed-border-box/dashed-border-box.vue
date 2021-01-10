<template>
    <div :class="wrapClasses" :style="wrapStyle">
        <svg :class="svgClasses" xmlns="http://www.w3.org/2000/svg"
             version="1.1" width="100%"
             height="100%" style="overflow: visible;"
             @mouseenter="isHover = true"
             @mouseleave="isHover = false"
        >
            <g>
                <g :transform="`translate(${strokeWidth/2} ${strokeWidth/2})`">
                    <path :d="blackPath" :style="blackPathStyle" class="border-line"></path>
                    <path :d="whitePath" :style="whitePathStyle" class="border-line"></path>
                </g>
                <path :style="cornerStyle" :transform="cornerLt" class="corner" d="M5,1H6V0H4A4,4,0,0,0,0,4V6H1V4A3,3,0,0,1,4,1H5M5,1"></path>
                <path :style="cornerStyle" :transform="cornerRt" class="corner" d="M1,1H0V0H2A4,4,0,0,1,6,4V6H5V4A3,3,0,0,0,2,1H1M1,1"></path>
                <path :style="cornerStyle" :transform="cornerLb" class="corner" d="M5,5H6V6H4A4,4,0,0,1,0,2V0H1V2A3,3,0,0,0,4,5H5M5,5" ></path>
                <path :style="cornerStyle" :transform="cornerRb" class="corner" d="M1,5H0V6H2A4,4,0,0,0,6,2V0H5V2A3,3,0,0,1,2,5H1M1,5" ></path>
            </g>
        </svg>
        <slot></slot>
    </div>
</template>
<script>
    import {oneOf} from "../../utils/assist";

    const prefixCls = "dashed-border-box";

    export default {
        name: "DashedBorderBox",
        components: {},
        props: {
            width: {
                type: Number,
                default: 250
            },
            height: {
                type: Number,
                default: 100
            },
            strokeWidth: {
                validator(value) {
                    return oneOf(value, [1, 2]);
                },
                default: 2
            },
            stroke: {
                type: String,
                default: '#E0E0E0'
            },
            hoverStroke: {
                type: String,
                default: '#FF7733'
            },
        },
        data() {
            return {
                isHover: false,
            };
        },
        computed: {
            wrapClasses() {
                return [
                    `${prefixCls}`,
                ];
            },
            svgClasses() {
                return [
                    `${prefixCls}-svg`,
                ];
            },
            blackPath() {
                return `M 0 0 h ${this.width - this.strokeWidth} v ${this.height - this.strokeWidth} h -${this.width - this.strokeWidth} v -${this.height - this.strokeWidth}`;
            },
            whitePath() {
                return `M 0 0 h ${this.width - this.strokeWidth} v ${this.height - this.strokeWidth} h -${this.width - this.strokeWidth} v -${this.height - this.strokeWidth}`;
            },
            blackPathStyle() {
                return {
                    strokeWidth: this.strokeWidth,
                    stroke: this.isHover?this.hoverStroke: this.stroke,
                };
            },
            whitePathStyle() {
                return {
                    strokeWidth: this.strokeWidth,
                    stroke: '#fff',
                    strokeDashoffset: 6,
                }
            },
            cornerStyle() {
                return {
                    strokeWidth: this.strokeWidth,
                    stroke: this.isHover?this.hoverStroke: this.stroke,
                }
            },
            wrapStyle() {
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    borderRadius: this.strokeWidth === 2?'4px':'3px',
                }
            },
            cornerLt() {
                return this.strokeWidth === 2?"translate(0 0)":`translate(-0.5 -0.5)`
            },
            cornerRt() {
                return this.strokeWidth === 2?`translate(${this.width - 6} 0)`:`translate(${this.width - 5.5} -0.5)`
            },
            cornerLb() {
                return this.strokeWidth === 2?`translate(0 ${this.height - 6})`:`translate(-0.5 ${this.height - 5.5})`
            },
            cornerRb() {
                return this.strokeWidth === 2?`translate(${this.width - 6} ${this.height - 6})`:`translate(${this.width - 5.5} ${this.height - 5.5})`
            },
        },
        created() {},
        methods: {},
        watch: {}
    };
</script>
