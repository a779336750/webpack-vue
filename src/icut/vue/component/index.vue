<template>
    <div
        class="ktu f_DNSTraffic"
        id="ktu"
    >
        <SvgSprite></SvgSprite>
        <Layout class="page">
            <Header class="page-header">
                <TheHeader></TheHeader>
            </Header>
            <UploadPage v-if="isEmpty"></UploadPage>
            <Layout v-else>
                <transition name="sider-slide">
                    <Sider class="page-sider" width="320">
                        <TheSider></TheSider>
                    </Sider>
                </transition>
                <div class="edit-view" id="editView">
                    <TheEditCenter></TheEditCenter>
                </div>
            </Layout>
<!--            <div class="fixed-tips" v-if="isShowDownloadTips && styleObject" :style="styleObject">-->
<!--                    <span v-if="styleObject.transform" style="-->
<!--                                            transform: rotate(180deg);-->
<!--                                            opacity: 1;-->
<!--                                            display: block;">-->
<!--                        文件已下载，点击“-->
<!--                        <icon id="#svg-download-rotate-tips" style="width: 13px; height: 14px;"/>-->
<!--                        ”即可查看-->
<!--                    </span>-->
<!--                <span v-else>-->
<!--                        文件已下载，点击“-->
<!--                        <icon id="#svg-download-tips" style="width: 12px; height: 7px;"/>-->
<!--                        ”即可查看-->
<!--                    </span>-->
<!--            </div>-->
        </Layout>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch, Emit, Prop,} from 'vue-property-decorator';
import SvgSprite from './svg/sprite.vue';
import TheHeader from './TheHeader.vue'
import TheSider from './TheSider.vue'
import TheEditCenter from './edit/TheEditCenter.vue'
import UploadPage from './page/UploadPage.vue'
import Utils from '../base/global/utils'

@Component({
    name: 'Index',
    components: {
        SvgSprite,
        TheSider,
        UploadPage,
        TheEditCenter,
        TheHeader
    }
})
// 组件在此添加
export default class App extends Vue {
    private showLoading: boolean = false;

    get isShowDownloadTips(): boolean {
        return this.$store.state.data.isShowDownloadTips;
    }

    get isEmpty(): boolean {
        return Utils.isEmptyObject(this.ktuData);
    }

    get ktuData(): KtuData {
        return this.$store.state.data.ktuData;
    }

    get styleObject(): object {
        const browser = Utils.BrowserType();
        switch (browser) {
            case 'Chrome':
                return {
                    bottom: `40px`,
                    left: `169px`,
                    animation: `updownAnimation 4s forwards`,
                };
            case 'FF':
                return {
                    transform: `rotate(180deg)`,
                    top: `60px`,
                    right: `180px`,
                    animation: `downupAnimation 4s forwards`,
                };
            case 'Safari':
                return {
                    transform: `rotate(180deg)`,
                    top: `60px`,
                    right: `80px`,
                    animation: `downupAnimation 4s forwards`,
                };
            default:
                return {};
        }
    }
}
</script>