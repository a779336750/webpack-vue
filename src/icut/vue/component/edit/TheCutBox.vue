<template>
    <div @mousedown="dragMousedownHanddler" class="cut-box" id="cut-box" :style="boxStyle" style="overflow: visible;"
         :class="{move: false,locked: false,isOpacity:false}">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%"
             height="100%" class="cut-box-controls" :style="offsetStyle">
            <g v-for="(control, index) in controls" :data-control="control" class="cut-box-control-line"
               :class="[{hidden: false}, 'cut-box-control-line-' + control]" :style="{cursor: getCursor(control)}">
                <line v-if="hasControlLine.includes(control)" :x1="getControlLine(control).x1"
                      :y1="getControlLine(control).y1" :x2="getControlLine(control).x2" :y2="getControlLine(control).y2"
                      style="stroke: transparent" :stroke-width="controlSize/2"/>
            </g>
            <g @mousedown.stop="resizeMousedownHanddler($event,control, true)" v-for="(control, index) in controls"
               :data-control="control" class="edit-box-control-line"
               :class="[{hidden: false}, 'edit-box-control-line-' + control]"
               :style="{cursor: getCursor(control,true)}">
                <line v-if="hasControlLine.includes(control)" :x1="getControlLine(control).x1"
                      :y1="getControlLine(control).y1" :x2="getControlLine(control).x2" :y2="getControlLine(control).y2"
                      style="stroke: transparent" :stroke-width="controlSize/2"/>
            </g>
            <path @mousedown.stop="resizeMousedownHanddler($event,control, false)"
                  v-for="(control, index) in scaleControls" :data-control="control" class="cut-box-control"
                  :class="[{hidden: false}, 'cut-box-control-' + control]" :style="{cursor: getCursor(control)}"
                  :transform="controlStyle" :d="getControlPath(control)"/>
        </svg>

        <svg class="dashed-line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             version="1.1" width="100%" height="100%" fill="none" style="min-width: 1px;min-height: 1px;">
            <g class="parentPath" transform="translate(0.5 0.5)" :class="{isOpacity:1} ">
                <path class="border-line black" :d="linePath"/>
                <path class="border-line white" :d="linePath"/>
            </g>
            <g>
                <g class="childPath" :class="{isHover:true}" transform="translate(0.5 0.5)">
                    <path class="border-line black" :d="childLinePath"/>
                    <path class="border-line white" :d="childLinePath"/>
                </g>
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Mixins, Watch, Prop} from "vue-property-decorator";
import DataHandler from '../../mixins/DataHandler'
import Background from "../../base/background";
import CutBox from "../../base/cutbox";

@Component({
    name: 'Background',
    components: {},
})// 组件在此添加
export default class TheHeader extends Mixins(DataHandler) {
    private controls: Array<string> = ['tl', 'tr', 'br', 'bl', 'mt', 'mb', 'mr', 'ml'];
    private controlSize: number = 14;
    private hasControlLine: Array<string> = ['mt', 'mr', 'mb', 'ml'];
    private currentControl: string = '';


    get controlStyle(): string {
        return `translate(-${this.width < 10 ? (10 - this.width) / 2 : 0},-${this.height < 10 ? (10 - this.height) / 2 : 0})`;
    }

    get childLinePath(): string {
        return `M ${0} ${0} h ${this.width} v ${this.height} h ${-this.width} v ${-this.height}`;
    }

    get linePath(): string {
        return `M 0 0 h ${this.width} v ${this.height} h ${-this.width} v ${-this.height}`;
    }

    get scaleControls(): Array<string> {
        if (this.proportion === 0) {
            return ['tl', 'tr', 'br', 'bl', 'mt', 'mb', 'mr', 'ml'];
        }
        return ['tl', 'tr', 'br', 'bl'];
    }

    get isOpacity(): boolean {
        return false;
    }

    get scale(): number {
        return this.$store.state.data.scale;
    }

    get proportion(): number {
        return this.cutBox.proportion;
    }

    get cutBox(): CutBox {
        return this.ktuData.cutBox;
    }

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData;
    }

    get background(): Background {
        return this.ktuData.background;
    }

    get width(): number {
        return this.cutBox.width;
    }

    get height(): number {
        return this.cutBox.height;
    }

    get left(): number {
        return this.cutBox.left + this.cutBox.offsetLeft;
    }

    get top(): number {
        return this.cutBox.top + this.cutBox.offsetTop;
    }
    get offsetStyle(): object {
        return {
            minHeight: '12px',
            minWidth: '12px',
        };
    }
    get boxStyle(): object {
        return {
            left: `${this.left}px`,
            top: `${this.top}px`,
            width: `${this.width}px`,
            height: `${this.height}px`,
            transform: `rotate(${0}deg)`,
            pointerEvents: 'auto',
        };
    }

    dragMousedownHanddler(e:any) {
        window.Ktu.page.saveState();
        this.tmpPage = {
            x: e.pageX,
            y: e.pageY,
        };
        this.tmpPos = {
            left: this.cutBox.left,
            top: this.cutBox.top,
        };
        document.body.addEventListener('mousemove', this.dragMousemoveHanddler);
        document.body.addEventListener('mouseup', this.dragMouseupHanddler);
    }
    public dragMousemoveHanddler(e:any) {
        const eW = this.background.width * window.Ktu.edit.editScale;
        const eH = this.background.height * window.Ktu.edit.editScale;
        let nL = this.tmpPos.left + e.pageX - this.tmpPage.x;
        let nT = this.tmpPos.top + e.pageY - this.tmpPage.y;
        if (nL < 0) nL = 0;
        if (nT < 0) nT = 0;
        if (nL + this.cutBox.width > eW) {
            nL = eW - this.cutBox.width;
        }
        if (nT + this.cutBox.height > eH) {
            nT = eH - this.cutBox.height;
        }

        window.Ktu.ktuData.cutBox.translate({ left: nL, top: nT });
    }
    public dragMouseupHanddler(e:any) {
        const eW = this.background.width * window.Ktu.edit.editScale;
        const eH = this.background.height * window.Ktu.edit.editScale;
        let nL = this.tmpPos.left + e.pageX - this.tmpPage.x;
        let nT = this.tmpPos.top + e.pageY - this.tmpPage.y;
        if (nL < 0) nL = 0;
        if (nT < 0) nT = 0;
        if (nL + this.cutBox.width > eW) {
            nL = eW - this.cutBox.width;
        }
        if (nT + this.cutBox.height > eH) {
            nT = eH - this.cutBox.height;
        }
        if (nL != this.tmpPos.left || nT != this.tmpPos.top) {
            window.Ktu.page.modifiedState();
        }
        document.body.removeEventListener('mousemove', this.dragMousemoveHanddler);
        document.body.removeEventListener('mouseup', this.dragMouseupHanddler);
    }
    public resizeMouseupHanddler() {
        // 宽高和位置有变化时,保存前进后退记录
        if (this.width != this.tmpSize.w || this.height != this.tmpSize.h || this.left != this.tmpSize.l || this.top != this.tmpSize.t) {
            window.Ktu.page.modifiedState();
        }
        document.body.removeEventListener('mousemove', this.resizeMousemoveHanddler);
        document.body.removeEventListener('mouseup', this.resizeMouseupHanddler);
    }
    public resizeMousemoveHanddler(e:any) {
        const originWHRatio = this.width / this.height;
        this.currentPos = {
            x: e.pageX,
            y: e.pageY,
        };
        const { currentControl } = this;
        const isEqualRatio = currentControl == 'tl' || currentControl == 'tr' || currentControl == 'bl' || currentControl == 'br';
        let width:number = 0;
        let height:number = 0;
        let left:number = 0;
        let top:number = 0;

        // 根据控制点，重新获取裁剪框的宽高
        switch (currentControl) {
            case 'tl':
                width = this.tmpSize.w - this.currentPos.x + this.tmpPos.x;
                height = this.tmpSize.h - this.currentPos.y + this.tmpPos.y;
                left = this.tmpSize.l + this.currentPos.x - this.tmpPos.x;
                top = this.tmpSize.t + this.currentPos.y - this.tmpPos.y;
                break;
            case 'tr':
                width = this.tmpSize.w + this.currentPos.x - this.tmpPos.x;
                height = this.tmpSize.h - this.currentPos.y + this.tmpPos.y;
                left = this.tmpSize.l;
                top = this.tmpSize.t + this.currentPos.y - this.tmpPos.y;
                break;
            case 'mt':
                width = this.tmpSize.w;
                height = this.tmpSize.h - this.currentPos.y + this.tmpPos.y;
                left = this.tmpSize.l;
                top = this.tmpSize.t + this.currentPos.y - this.tmpPos.y;
                break;
            case 'ml':
                width = this.tmpSize.w - this.currentPos.x + this.tmpPos.x;
                height = this.tmpSize.h;
                left = this.tmpSize.l + this.currentPos.x - this.tmpPos.x;
                top = this.tmpSize.t;
                break;
            case 'mr':
                width = this.tmpSize.w + this.currentPos.x - this.tmpPos.x;
                height = this.tmpSize.h;
                left = this.tmpSize.l;
                top = this.tmpSize.t;
                break;
            case 'bl':
                width = this.tmpSize.w - this.currentPos.x + this.tmpPos.x;
                height = this.tmpSize.h + this.currentPos.y - this.tmpPos.y;
                left = this.tmpSize.l + this.currentPos.x - this.tmpPos.x;
                top = this.tmpSize.t;
                break;
            case 'mb':
                width = this.tmpSize.w;
                height = this.tmpSize.h + this.currentPos.y - this.tmpPos.y;
                left = this.tmpSize.l;
                top = this.tmpSize.t;
                break;
            case 'br':
                width = this.tmpSize.w + this.currentPos.x - this.tmpPos.x;
                height = this.tmpSize.h + this.currentPos.y - this.tmpPos.y;
                left = this.tmpSize.l;
                top = this.tmpSize.t;
                break;
        }

        // 等比缩放时，获取裁剪框的位置
        const getEqualRatioPos = () => {
            if (this.currentControl == 'tr') {
                top = this.tmpSize.t + this.tmpSize.h - height;
                left = this.tmpSize.l;
            } else if (currentControl == 'bl') {
                top = this.tmpSize.t;
                left = this.tmpSize.l + this.tmpSize.w - width;
            } else if (currentControl == 'br') {
                top = this.tmpSize.t;
                left = this.tmpSize.l;
            } else {
                top = this.tmpSize.t + this.tmpSize.h - height;
                left = this.tmpSize.l + this.tmpSize.w - width;
            }
        };
        if (isEqualRatio) {
            height = (width + height) / (1 + originWHRatio);
            width = height * originWHRatio;
            // 取偏移总和按比例均分
            getEqualRatioPos();
        }

        if (top < 0) {
            if (isEqualRatio) {
                height += top;
                width = height * originWHRatio;
                getEqualRatioPos();
            } else {
                height += top;
                top = 0;
            }
        }
        if (left < 0) {
            if (isEqualRatio) {
                width += left;
                height = width / originWHRatio;
                getEqualRatioPos();
            } else {
                width += left;
                left = 0;
            }
        }

        if (width + left > this.background.width * window.Ktu.edit.editScale) {
            width = this.background.width * window.Ktu.edit.editScale - left;
            if (isEqualRatio) {
                height = width / originWHRatio;
                getEqualRatioPos();
            }
        }

        if (height + top > this.background.height * window.Ktu.edit.editScale) {
            height = this.background.height * window.Ktu.edit.editScale - top;
            if (isEqualRatio) {
                width = height * originWHRatio;
                getEqualRatioPos();
            }
        }

        if (width < 1 * window.Ktu.edit.editScale) {
            if (left > this.tmpSize.l) left = this.tmpSize.l + this.tmpSize.w - 1 * window.Ktu.edit.editScale;
            width = 1 * window.Ktu.edit.editScale;

            if (isEqualRatio) {
                height = width / originWHRatio;
                getEqualRatioPos();
            }
        }
        if (height < 1 * window.Ktu.edit.editScale) {
            if (top > this.tmpSize.t) top = this.tmpSize.t + this.tmpSize.h - 1 * window.Ktu.edit.editScale;
            height = 1 * window.Ktu.edit.editScale;
            if (isEqualRatio) {
                width = height * originWHRatio;
                getEqualRatioPos();
            }
        }

        this.cutBox.setSize({ width, height, left, top });
    }
    public resizeMousedownHanddler(e:any, control:string, isLine:boolean) {
        if (this.proportion != 0 && isLine) return;
        window.Ktu.page.saveState();
        this.currentControl = control;
        this.tmpPos = {
            x: e.pageX,
            y: e.pageY,
        };
        this.tmpSize = {
            l: this.cutBox.left,
            t: this.cutBox.top,
            w: this.cutBox.width,
            h: this.cutBox.height,
        };
        document.body.addEventListener('mousemove', this.resizeMousemoveHanddler);
        document.body.addEventListener('mouseup', this.resizeMouseupHanddler);
    }
    public getCursor(control:string, isLine:boolean) {
        if (this.proportion != 0 && isLine) return 'default';
        const controlAngleMap = {
            mr: 0,
            radius: 0,
            br: 45,
            mb: 90,
            bl: 135,
            ml: 180,
            tl: 225,
            mt: 270,
            tr: 315,
        };
        const cursorMap = ['e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize', 'nw-resize', 'n-resize', 'ne-resize'];
        const totalAngle = 0 + controlAngleMap[control] + 22.5;
        return cursorMap[Math.floor(totalAngle / 45)];
    }
    public getControlPath(control:string) {
        const size = this.controlSize;
        const w = this.width < 10 ? 10 : this.width;
        const h = this.height < 10 ? 10 : this.height;
        switch (control) {
            case 'tl':
                return `M0 ${size / 2} v${-size / 2} h${size / 2} a${size / 2} ${size / 2} 0 1 0 ${-size / 2} ${size / 2}z`;
            case 'tr':
                return `M${w - size / 2} 0 h${size / 2} v${size / 2} a${size / 2} ${size / 2} 0 1 0 ${-size / 2} ${-size / 2}z`;
            case 'br':
                return `M${w} ${h - size / 2} v${size / 2} h${-size / 2} a${size / 2} ${size / 2} 0 1 0 ${size / 2} ${-size / 2}z`;
            case 'bl':
                return `M${size / 2} ${h} h${-size / 2} v${-size / 2} a${size / 2} ${size / 2} 0 1 0 ${size / 2} ${size / 2}z`;
            case 'mt':
                return `M${w / 2 - size / 2} 0 h${size} a${size / 2} ${size / 2} 0 0 0 ${-size} 0z`;
            case 'mr':
                return `M${w} ${h / 2 - size / 2} v${size} a${size / 2} ${size / 2} 0 0 0 0 ${-size}z`;
            case 'mb':
                return `M${w / 2 + size / 2} ${h} h${-size} a${size / 2} ${size / 2} 0 0 0 ${size} 0z`;
            case 'ml':
                return `M0 ${h / 2 + size / 2} v${-size} a${size / 2} ${size / 2} 0 0 0 0 ${size}z`;
        }
    }
    public getControlLine(control:string) {
        const size = this.controlSize;
        const w = this.width;
        const h = this.height;
        switch (control) {
            case 'tl':
                return {};
            case 'tr':
                return {};
            case 'br':
                return {};
            case 'bl':
                return {};
            case 'mt':
                return {
                    x1: 8,
                    y1: -size / 4,
                    x2: w - 8,
                    y2: -size / 4,
                };
            case 'mr':
                return {
                    x1: w + size / 4,
                    y1: 8,
                    x2: w + size / 4,
                    y2: h - 8,
                };
            case 'mb':
                return {
                    x1: 8,
                    y1: h + size / 4,
                    x2: w - 8,
                    y2: h + size / 4,
                };
            case 'ml':
                return {
                    x1: -size / 4,
                    y1: 8,
                    x2: -size / 4,
                    y2: h - 8,
                };
        }
    }
}
</script>
