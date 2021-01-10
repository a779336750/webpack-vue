<template>
    <div class="edit-center">
        <div class="editor" id="editor" :style="editorStyle">
            <div class="img-holder">
                <canvas id="holderCanvas" :style="holderStyle"></canvas>
            </div>
            <component is="background" :background="background"></component>
        </div>
        <TheCutBox v-show="isShowBox"></TheCutBox>
        <TheCutTips v-show="isShowBox"></TheCutTips>
        <TheTurntable></TheTurntable>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import _ from "lodash";
import {Vue, Component, Watch, Emit, Prop,} from 'vue-property-decorator';
import TheCutBox from "./TheCutBox.vue";
import TheCutTips from "./TheCutTips.vue";
import TheTurntable from "./TheTurntable.vue";
import background from "../elements/Background.vue";
import Background from "../../base/background";
import CutBox from "../../base/cutbox";

@Component({
    name: 'TheEditCenter',
    components: {
        TheCutBox,
        TheCutTips,
        TheTurntable,
        background,
    }
})
// 组件在此添加
export default class App extends Vue {
    get isShowBox(): boolean {
        return this.cutBox.isShow;
    }

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData as KtuData;
    }

    get src(): string {
        return this.background.src;
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

    get fillScale(): number {
        return this.background.scale;
    }

    get holderStyle(): object {
        return {
            transform: `rotate(${this.background.angle}deg)  scale(${this.fillScale})  translateZ(0)`,
        }
    }
    get imgHolderStyle(): object {
        const rotateY = this.background.reverseX ? 180 : 0;
        const rotateX = this.background.reverseY ? 180 : 0;
        return {
            width: `${this.background.width}px`,
            height: `${this.background.height}px`,
            // background: `url(${this.src})`,
        };
    }
    get editorStyle(): object {
        const rect = {
            top: this.cutBox.top / this.editScale,
            right: (this.cutBox.left + this.cutBox.width) / this.editScale,
            bottom: (this.cutBox.top + this.cutBox.height) / this.editScale,
            left: this.cutBox.left / this.editScale,
        };
        return {
            position: 'absolute',
            width: `${this.background.width}px`,
            height: `${this.background.height}px`,
            transform: `translate(-50%, -50%) scale(${this.editScale})`,
        };
    }

    mounted() {
        this.$nextTick(() => {
            window.Ktu.edit.resetEdit();
            window.Ktu.ktuData.cutBox.initSize();
            this.$nextTick(() => {
                window.Ktu.originalData = _.cloneDeep(window.Ktu.ktuData);
                window.Ktu.ktuData.background.drawCanvas();
            });
        });
    }
}
</script>