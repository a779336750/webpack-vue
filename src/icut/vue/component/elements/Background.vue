<template>
    <div class="background" :style="clipStyle">
        <canvas id="backgroundCanvas" :style="divStyle"></canvas>
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
    @Prop({type: Object}) readonly background!: Background;

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData;
    }

    get cutBox(): CutBox {
        return this.ktuData.cutBox;
    }

    get editScale(): number {
        return this.$store.state.setting.editScale;
    }

    get angle(): number {
        return this.background.angle;
    }

    get fillScale(): number {
        return this.background.scale;
    }

    get divStyle(): object {
        return {
            transform: `rotate(${this.background.angle}deg)  scale(${this.fillScale})`,
        }
    }

    get clipStyle() :object {
        const rect = {
            top: this.cutBox.top / this.editScale,
            right: (this.cutBox.left + this.cutBox.width) / this.editScale,
            bottom: (this.cutBox.top + this.cutBox.height) / this.editScale,
            left: this.cutBox.left / this.editScale,
        };
        return {
            position: 'absolute',
            left: `0px`,
            top: `0px`,
            height: `${this.background.height}px`,
            width: `${this.background.width}px`,
            clip: `rect(${rect.top}px, ${rect.right}px, ${rect.bottom}px, ${rect.left}px)`,
        };
    }

}
</script>
