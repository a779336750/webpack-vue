<template>
    <div class="turntable" :style="turntableStyle" @mousedown="dragmousedownHanddler" @wheel="wheelHanddler"
         @mouseleave="mouseleaveHanddler">
        <div class="turntable-table" :style="tableStyle">
            <svg>
                <use xlink:href="#svg-cut-turntable"></use>
            </svg>
        </div>
        <icon id="#svg-turntable-arrow" class="svg-turntable-arrow"/>
        <div class="angle-tips" v-show="isShowAngle">{{ -angle }}°</div>
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
    private isShowAngle: boolean = false;

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData;
    }

    get angle(): number {
        return this.background.angle;
    }

    get background(): Background {
        return this.ktuData.background;
    }

    get cutBox(): CutBox {
        return this.ktuData.cutBox;
    }

    get editScale(): number {
        return this.$store.state.setting.editScale;
    }

    get editSize(): any {
        return this.$store.state.setting.editSize;
    }

    get turntableStyle(): object {
        return {
            left: `${this.background.width * this.editScale + this.editSize.left}px`,
        };
    }

    get tableStyle(): object {
        return {
            transform: `rotate(${this.angle / 2}deg)`,
        };
    }
    wheelHanddler(e:any) {}
    mouseleaveHanddler() {
        this.isShowAngle = false;
    }
    dragmousedownHanddler(e:any) {
        window.Ktu.page.saveState();
        this.tmpPageY = e.pageY;
        document.body.addEventListener('mousemove', this.dragMousemoveHanddler);
        document.body.addEventListener('mouseup', this.dragMouseupHanddler);
    }
    dragMousemoveHanddler(e:any) {
        this.isShowAngle = true;
        let offseteY = e.pageY - this.tmpPageY;
        this.tmpPageY = e.pageY;
        if (this.angle + offseteY > 180) offseteY = 180 - this.angle;
        if (this.angle + offseteY < -180) offseteY = -180 - this.angle;
        if (offseteY > 0) {
            this.changeBackgroundProp('angle', this.angle + offseteY);
        } else {
            this.changeBackgroundProp('angle', this.angle + offseteY);
        }
        window.Ktu.ktuData.background.getFullFillScale();
    }
    dragMouseupHanddler(e:any) {
        window.Ktu.page.modifiedState();
        document.body.removeEventListener('mousemove', this.dragMousemoveHanddler);
        document.body.removeEventListener('mouseup', this.dragMouseupHanddler);
    }

}
</script>
