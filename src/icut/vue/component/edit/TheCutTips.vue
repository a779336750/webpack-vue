<template>
    <div class="cut-tips" :style="cutTipsStyle">
        <Tooltip content="完成" placement="top">
            <Button class="cut-btn ok" icon="#svg-cut-done" @click="cutImg"></Button>
        </Tooltip>
        <Tooltip content="取消" placement="top">
            <Button class="cut-btn cancel" icon="#svg-cut-cancel" @click="hideCutBox"></Button>
        </Tooltip>
        <div class="devider"></div>
        <Tooltip content="旋转裁剪框" placement="top">
            <Button class="cut-btn rotate" icon="#svg-cut-rotate" @click="rotateCutBox"></Button>
        </Tooltip>
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

    get left(): number {
        return this.cutBox.offsetLeft;
    }

    get top(): number {
        return this.cutBox.offsetTop;
    }

    get cutBox(): CutBox {
        return this.ktuData.cutBox;
    }

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData;
    }

    get cutTipsStyle(): Object {
        return {
            left: `${this.left}px`,
            top: `${this.top - 48}px`,
        };
    }

    private async cutImg() {
        this.$store.state.setting.currentProportion = window.Ktu.ktuData.cutBox.proportion;
        window.Ktu.page.saveState();
        await window.Ktu.ktuData.cutBox.cutImg();
        window.Ktu.ktuData.cutBox.hide();
        window.Ktu.page.modifiedState();
    }
    private rotateCutBox() {
        window.Ktu.page.saveState();
        window.Ktu.ktuData.cutBox.rotate();
        window.Ktu.page.modifiedState();
    }
    private hideCutBox() {
        window.Ktu.page.saveState();
        window.Ktu.ktuData.cutBox.hide();
        window.Ktu.page.modifiedState();
    }

}
</script>
