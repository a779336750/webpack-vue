import Page from '../base/page';
import Edit from '../base/edit';
// @ts-ignore
import keyEvent from '../base/keyevent';
import { KtuHistory } from '../base/undoredu';
import Utils from '../base/global/utils';

function initData():void {
    // 当前编辑图片的所有数据
    let ktuData = {};
    Object.defineProperty(window.Ktu, 'ktuData', {
        get() {
            return ktuData;
        },
        set(value) {
            if (!Utils.isEmptyObject(value)) {
                const isFisrtMounted = Utils.isEmptyObject(ktuData);
                ktuData = value;
                window.Ktu.vm.$store.commit('data/changeState', {
                    prop: 'ktuData',
                    value,
                });
                if (isFisrtMounted) {
                    initEditor();
                }
            }
        },
    });
    const { imgsUploadedFromSeo } = Utils.getUrlQueryString();
    window.Ktu.imgsUploadedFromSeo = imgsUploadedFromSeo ? JSON.parse(window.decodeURIComponent(imgsUploadedFromSeo)) : {};
}
function initEditor(): void {
    window.Ktu.edit = new Edit();
    keyEvent();
    window.Ktu.historyManager = new KtuHistory();
}

const main = function (): void {
    initData();
    window.Ktu.page = new Page();
    window.Ktu.page.uploadFromSeo();
}
export default main