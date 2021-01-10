<template>
    <div class="sider-content">
        <div class="items gird-items">
            <div class="gird-item" v-for="item in tpyeInfo" :key="item.type" @click="changeType(item)"
                 :class="{selected:currentType === item.type && isShowBox} ">
                <icon :id="item.icon"></icon>
                <p>{{ item.name }}</p>
            </div>
        </div>
        <div class="items rotate-items">
            <div class="item-col">
                <Tooltip content="逆时针90°" placement="bottom">
                    <Button type="text" icon="#svg-counterclockwise" @click="rotateBg(false)"></Button>
                </Tooltip>
                <div class="devider"></div>
                <Tooltip content="顺时针90°" placement="bottom">
                    <Button type="text" icon="#svg-clockwise" @click="rotateBg(true)"></Button>
                </Tooltip>
            </div>
            <div class="item-col">
                <Tooltip content="水平翻转" placement="bottom">
                    <Button type="text" icon="#svg-horizontal" @click="switchReverseX"></Button>
                </Tooltip>
                <div class="devider"></div>
                <Tooltip content="垂直翻转" placement="bottom">
                    <Button type="text" icon="#svg-vertical" @click="switchReverseY"></Button>
                </Tooltip>
            </div>
        </div>

        <Button icon="svn-cut-restore" class="btn-reset" @click="restore">恢复原图</Button>
    </div>
</template>

<script lang="ts">
import DataHandler from '../mixins/DataHandler';
import CutBox from "../base/cutbox";
import Background from "../base/background";
import {Component, Mixins} from "vue-property-decorator";

@Component({
    name: 'TheHeader',
})// 组件在此添加
export default class TheHeader extends Mixins(DataHandler) {
    private tpyeInfo: Array<object> = [{
        type: 0,
        icon: 'svg-free-cut',
        name: '自由裁剪',
        log: 'free',
    }, {
        type: 1,
        icon: 'svg-cut-1-1',
        name: '1:1',
        log: '11',
    }, {
        type: 2,
        icon: 'svg-cut-2-3',
        name: '2:3',
        log: '23',
    }, {
        type: 3,
        icon: 'svg-cut-4-3',
        name: '4:3',
        log: '43',
    }, {
        type: 4,
        icon: 'svg-cut-7-5',
        name: '7:5',
        log: '75',
    }, {
        type: 5,
        icon: 'svg-cut-16-9',
        name: '16:9',
        log: '169',
    }, {
        type: 6,
        icon: 'svg-cut-9-19.5',
        name: '9:19.5',
        log: '9195',
    }, {
        type: 7,
        icon: 'svg-cut-small-inch',
        name: '小1寸',
        log: 'smallInch',
    }, {
        type: 8,
        icon: 'svg-cut-golden',
        name: '黄金比例',
        log: 'golden',
    }];


    get currentType(): number {
        return this.cutBox.proportion;
    }

    get isShowBox(): boolean {
        return this.cutBox.isShow;
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

    private restore() {
        window.Ktu.page.restore();
    }

    private saveState() {
        window.Ktu.page.saveState();
    }

    private modifiedState() {
        setTimeout(() => {
            window.Ktu.page.modifiedState();
        }, 500);
    }

    private async rotateBg(isClockwise:boolean) {
        let rotateAngle = window.Ktu.ktuData.background.rotateAngle + (isClockwise ? 90 : -90);
        if (rotateAngle >= 360) {
            rotateAngle = 0;
        }
        if (rotateAngle < 0) {
            rotateAngle = 360 + rotateAngle;
        }
        window.Ktu.page.saveState();
        window.Ktu.ktuData.background.rotateAngle = rotateAngle;
        await window.Ktu.ktuData.background.rotateEditor(isClockwise);
        window.Ktu.ktuData.background.getFullFillScale();
        window.Ktu.page.modifiedState();
    }

    private async switchReverseX() {
        const tmpBgAngle = window.Ktu.ktuData.background.angle;
        window.Ktu.page.saveState();
        await window.Ktu.ktuData.background.switchReverse('x');
        window.Ktu.ktuData.background.angle = -tmpBgAngle;
        window.Ktu.ktuData.background.reverseX = !window.Ktu.ktuData.background.reverseX;
        this.changeBackgroundProp('angle', -tmpBgAngle);
        window.Ktu.ktuData.background.getFullFillScale();
        window.Ktu.page.modifiedState();
    }

    private async switchReverseY() {
        const tmpBgAngle = window.Ktu.ktuData.background.angle;
        window.Ktu.page.saveState();
        await window.Ktu.ktuData.background.switchReverse('y');
        window.Ktu.ktuData.background.angle = -tmpBgAngle;
        window.Ktu.ktuData.background.reverseY = !window.Ktu.ktuData.background.reverseY;
        window.Ktu.ktuData.background.getFullFillScale();
        window.Ktu.page.modifiedState();
    }

    private changeType(item:any) {
        window.Ktu.page.saveState();
        window.Ktu.ktuData.cutBox.isShow = true;
        window.Ktu.ktuData.cutBox.switchProportion(item.type);
        window.Ktu.page.modifiedState();
    }

}
</script>
