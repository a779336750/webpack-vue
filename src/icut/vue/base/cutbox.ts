export default class CutBox {
    public width: number = 400;
    public height: number = 400;
    // 离编辑器的左侧距离
    public left: number = 0;
    // 离编辑器的上侧距离
    public top: number = 0;
    // 编辑器离editView得左侧距离
    public offsetLeft: number = 0;
    // 编辑器离editView得上侧距离
    public offsetTop: number = 0;
    // 裁剪框的类型，0为自由裁剪，可参照左侧导航的比例顺序
    public proportion: number = 0;
    public isShow: boolean = true;

    constructor(data: { width?: number, height?: number, left?: number, top?: number }) {
        this.width = data.width || 400;
        this.height = data.height || 400;
        this.left = data.left || 0;
        this.top = data.top || 0;
    }

    /**
     * 初始化裁剪框大小，宽高为编辑器宽高
     */
    initSize() {
        this.width = window.Ktu.ktuData.background.width * window.Ktu.edit.editScale;
        this.height = window.Ktu.ktuData.background.height * window.Ktu.edit.editScale;
        this.offsetLeft = window.Ktu.edit.editSize.left;
        this.offsetTop = window.Ktu.edit.editSize.top;
    }

    /**
     * resize页面时，根据scale,更新裁剪框的位置
     * @param scale，resize页面前和resize页面后editScale的缩放比，如resize前为0.2，resize后为0.4，则scale为2
     */
    updateOffset(scale = 1) {
        this.offsetLeft = window.Ktu.edit.editSize.left;
        this.offsetTop = window.Ktu.edit.editSize.top;
        this.left = this.left / scale;
        this.top = this.top / scale;
        this.width = this.width / scale;
        this.height = this.height / scale;
    }

    /**
     * 更新尺寸
     * @param width
     * @param height
     * @param pos
     */
    updateSize(width: number, height: number, pos: { left: number, top: number }, offset?: { offsetLeft: number, offsetTop: number }) {
        this.left = pos.left;
        this.top = pos.top;
        this.width = width;
        this.height = height;
        if (offset) {
            this.offsetLeft = offset.offsetLeft;
            this.offsetTop = offset.offsetTop;
        }
    }


    /**
     * 切换裁剪类型
     * @param proportion
     */
    switchProportion(proportion: number) {
        this.proportion = proportion;
        this.updatePosition();
    }

    /**
     *
     * 根据size，重新设置裁剪框的尺寸
     * @param size
     */
    resize(size: { width: number, height: number, left: number, top: number }) {
        const eW = window.Ktu.ktuData.background.width;
        const eH = window.Ktu.ktuData.background.height;
        let nW = this.width + size.width;
        let nH = this.height + size.height;
        let nL = this.left + size.left;
        let nT = this.top + size.top;

        if (nT < 0) {
            nT = 0;
            nH = this.height;
        }
        if (nL < 0) {
            nL = 0;
            nW = this.width;
        }

        if (nW > eW * window.Ktu.edit.editScale - nL) {
            nW = eW * window.Ktu.edit.editScale - nL;
        }
        if (nH > eH * window.Ktu.edit.editScale - nT) {
            nH = eH * window.Ktu.edit.editScale - nT;
        }

        if (nW <= 1 * window.Ktu.edit.editScale) {
            nW = 1 * window.Ktu.edit.editScale;
            if (size.left <= 0) {
                nL = this.left;
            } else {
                nL = this.left + this.width - 1 * window.Ktu.edit.editScale;
            }
        }
        if (nH < 1 * window.Ktu.edit.editScale) {
            nH = 1 * window.Ktu.edit.editScale;
            if (size.top <= 0) {
                nT = this.top;
            } else {
                nT = this.top + this.height - 1 * window.Ktu.edit.editScale;
            }
        }
        this.width = nW;
        this.height = nH;
        this.left = nL ? nL : this.left;
        this.top = nT ? nT : this.top;
    }

    /**
     * 位移裁剪框
     * @param translate
     */
    translate(translate: { left: number, top: number, }) {
        this.left = translate.left;
        this.top = translate.top;
    }

    /**
     * 根据比例，重新计算宽高和位置
     */
    updatePosition(proportion?: number) {
        this.proportion = proportion ? proportion : this.proportion;
        let width = 0;
        let height = 0;
        const pos: any = {};
        const editSize = {
            width: window.Ktu.ktuData.background.width * window.Ktu.edit.editScale,
            height: window.Ktu.ktuData.background.height * window.Ktu.edit.editScale,
        };
        switch (this.proportion) {
            // 自由裁剪
            case 0:
                width = editSize.width;
                height = editSize.height;
                break;
            // 1:1
            case 1:
                width = editSize.width > editSize.height ? editSize.height : editSize.width;
                height = editSize.width > editSize.height ? editSize.height : editSize.width;
                break;
            // 2:3
            case 2:
                height = editSize.height;
                width = height * 2 / 3;
                break;
            // 4:3
            case 3:
                width = editSize.width;
                height = width * 3 / 4;
                break;
            // 7:5
            case 4:
                width = editSize.width;
                height = width * 5 / 7;
                break;
            // 16:9
            case 5:
                width = editSize.width;
                height = width * 9 / 16;
                break;
            // 9:19.5
            case 6:
                height = editSize.height;
                width = height * 9 / 19.5;

                break;
            // smallInch 1:1.2318
            case 7:
                height = editSize.height;
                width = editSize.height / 1.2318;
                break;
            // gloden
            case 8:
                width = editSize.width;
                height = width * 0.618;
                break;
        }
        let scale;
        if (width > height && height > editSize.height) {
            scale = editSize.height / height;
            width = scale * width;
            height = scale * height;
        }
        if (width < height && width > editSize.width) {
            scale = editSize.width / width;
            width = scale * width;
            height = scale * height;
        }
        pos.left = (editSize.width - width) / 2;
        pos.top = (editSize.height - height) / 2;
        this.updateSize(width, height, pos);
    }


    /**
     * 旋转图片后，获取撑满编辑器的图片
     * @param src
     * @param angle
     * @param scale
     * @param l
     * @param t
     * @param cw
     * @param ch
     * @param reverseX
     * @param reverseY
     * @returns {Promise<unknown>}
     */
    async getCutImg(angle: number, scale: number, l: number, t: number, cw: number, ch: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const backgroundCanvas = document.getElementById('backgroundCanvas');
            if (backgroundCanvas) {
                const canvas = document.createElement('canvas');
                const canvas2 = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const ctx2 = canvas2.getContext('2d');
                if (!ctx || !ctx2) return;
                const {width} = backgroundCanvas;
                const {height} = backgroundCanvas;

                canvas.width = width;
                canvas.height = height;

                canvas2.width = cw;
                canvas2.height = ch;
                // 旋转和缩放
                ctx.translate(width / 2, height / 2);
                ctx.rotate(angle * Math.PI / 180);
                ctx.scale(scale, scale);
                ctx.translate(-width / 2, -height / 2);
                // @ts-ignore
                ctx.drawImage(backgroundCanvas, 0, 0, width, height);

                // 根据裁剪框大小位置裁剪
                ctx2.drawImage(canvas, l, t, cw, ch, 0, 0, cw, ch);
                canvas2.toBlob(blob => {
                    resolve(URL.createObjectURL(blob));
                });
            }
        });
    }

    /**
     * 裁剪图片
     * @returns {Promise<void>}
     */
    async cutImg() {
        const width = Math.floor(this.width / window.Ktu.edit.editScale) <= 1 ? 1 : Math.floor(this.width / window.Ktu.edit.editScale);
        const height = Math.floor(this.height / window.Ktu.edit.editScale) <= 1 ? 1 : Math.floor(this.height / window.Ktu.edit.editScale);
        const left = this.left / window.Ktu.edit.editScale;
        const top = this.top / window.Ktu.edit.editScale;
        const {angle} = window.Ktu.ktuData.background;
        const {scale} = window.Ktu.ktuData.background;
        const {src} = window.Ktu.ktuData.background;
        const {reverseX} = window.Ktu.ktuData.background;
        const {reverseY} = window.Ktu.ktuData.background;
        const newImg = await this.getCutImg(angle, scale, left, top, width, height);
        window.Ktu.ktuData.background.useNewImg({
            width,
            height,
            src: newImg,
        });
        window.Ktu.ktuData.background.drawCanvas();
        this.resetCutBox();
    }

    /**
     * 重置裁剪框
     */
    resetCutBox() {
        this.left = 0;
        this.top = 0;
        this.offsetLeft = 0;
        this.offsetTop = 0;
        this.proportion = 0;
        this.initSize();
    }

    /**
     * 90度旋转裁剪框
     */
    rotate() {
        const editH = window.Ktu.ktuData.background.height * window.Ktu.edit.editScale;
        const editW = window.Ktu.ktuData.background.width * window.Ktu.edit.editScale;
        if (this.width > editH) {
            const oldW = this.width;
            const rate = this.width / this.height;
            this.height = editH;
            this.width = this.height / rate;
            this.left = this.left + (oldW - this.width) / 2;
            this.top = 0;
        } else if (this.height > editW) {
            const oldH = this.height;
            const rate = this.width / this.height;
            this.width = editW;
            this.height = this.width * rate;
            this.top = this.top + (oldH - this.height) / 2;
            this.left = 0;
        } else {
            this.left = this.left + (this.width - this.height) / 2;
            this.top = this.top - (this.width - this.height) / 2;
            const tmp = this.width;
            this.width = this.height;
            this.height = tmp;
            if (this.width > editH) {
                const rate = this.width / this.height;
                this.height = editH;
                this.width = this.height * rate;
                this.top = 0;
            }
            if (this.left + this.width > editW) this.left = editW - this.width;
            if (this.top + this.height > editH) this.top = editH - this.height;
            if (this.top < 0) this.top = 0;
            if (this.left < 0) this.left = 0;
        }
    }

    /**
     * 隐藏裁剪框
     */
    hide() {
        this.isShow = false;
        this.resetCutBox();
    }


    /**
     * 设置裁剪框宽高
     * @param config
     */
    setSize(config:{width?:number,height?:number,left?:number,top?:number}) {
        const {width = -1, height = -1, left = -1, top = -1} = config;
        this.width = width >= 0 ? width : this.width;
        this.height = height >= 0 ? height : this.height;
        this.top = top >= 0 ? top : this.top;
        this.left = left >= 0 ? left : this.left;
    }
}