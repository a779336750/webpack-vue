export default class Background {
    public src: string = '';
    public width: number = 0;
    public height: number= 0;
    public imgType: string= '';
    public angle:number=0;
    public reverseX:boolean=false;
    public reverseY:boolean=false;
    public scale:number=1;
    public dirty: boolean= true;
    public rotateAngle:number=0;
    constructor(data: { src:string,width:number,height:number, imgType:string}) {
        this.src = data.src;
        this.width = data.width;
        this.height = data.height;
        this.imgType = data.imgType;
    }
    /**
     * 绘制页面中的canvas,backgroundCanvas和holderCanvas
     */
    drawCanvas() {
        const backgroundCanvas = document.getElementById('backgroundCanvas');
        const holderCanvas = document.getElementById('holderCanvas');

        if(!!backgroundCanvas && !!holderCanvas) {
            const bgCtx = backgroundCanvas.getContext('2d');
            const hdCtx = holderCanvas.getContext('2d');
            bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            hdCtx.clearRect(0, 0, holderCanvas.width, holderCanvas.height);

            const img = new Image();
            img.onload = () => {
                const { rotateAngle } = this;
                const { reverseX, reverseY } = this;
                const { width, height } = img;

                switch (rotateAngle) {
                    case 0:
                        backgroundCanvas.width = width;
                        backgroundCanvas.height = height;
                        break;
                    case 90:
                        backgroundCanvas.width = height;
                        backgroundCanvas.height = width;
                        bgCtx.translate(height, 0);
                        bgCtx.rotate(rotateAngle * Math.PI / 180);
                        break;
                    case 180:
                        backgroundCanvas.width = width;
                        backgroundCanvas.height = height;
                        bgCtx.translate(width, height);
                        bgCtx.rotate(rotateAngle * Math.PI / 180);
                        break;
                    case 270:
                        backgroundCanvas.width = height;
                        backgroundCanvas.height = width;
                        bgCtx.translate(0, width);
                        bgCtx.rotate(rotateAngle * Math.PI / 180);
                        break;
                }

                const scaleX = reverseX ? -1 : 1;
                const scaleY = reverseY ? -1 : 1;
                const translateX = (scaleX === -1) ? width : 0;
                const translateY = (scaleY === -1) ? height : 0;
                bgCtx.translate(translateX, translateY);
                bgCtx.scale(scaleX, scaleY);
                bgCtx.drawImage(img, 0, 0, width, height);

                holderCanvas.width = backgroundCanvas.width;
                holderCanvas.height = backgroundCanvas.height;
                hdCtx.drawImage(backgroundCanvas, 0, 0, backgroundCanvas.width, backgroundCanvas.height);

                bgCtx.setTransform(1, 0, 0, 1, 0, 0);
                hdCtx.setTransform(1, 0, 0, 1, 0, 0);
            };
            img.src = this.src;
        }
    }

    toSvg() {
        const svgHtml = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1" width="${this.width}" height="${this.height}"
                    style="position: absolute;left:0;top:0;overflow: visible;"
                    viewBox="0 0 ${this.width} ${this.height}" xml:space="preserve" >
                    <g >
                        <image  preserveAspectRatio="none" crossorigin="anonymous"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         xlink:href="${this.src}"
                         width="${this.width}"
                         height="${this.height}"
                         ></image>
                    </g>
                </svg>
            `;
        return svgHtml;
    }

    /**
     * 自由旋转时，为了填充空白区域，要进行放大图片，获取放大的比例
     * @returns {number}
     */
    getFullFillScale() {
        let w = this.width;
        let h = this.height;
        if (w < h) {
            const tmp = w;
            w = h;
            h = tmp;
        }
        let angle = Math.abs(this.angle);
        if (angle > 90 && angle <= 180) {
            angle = 180 - angle;
        } else if (angle > 180 && angle <= 270) {
            angle = angle - 180;
        } else if (angle > 270) {
            angle = 360 - angle;
        } else if (angle > 360) {
            angle = angle - 360;
        }
        this.scale = Math.cos((Math.atan(w / h) * 180 / Math.PI - angle) * Math.PI / 180) * Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / h;
        return this.scale;
    }

    /**
     * 更具congfig，重置背景配置
     * @param config
     */
    async resetBackground(config: {width: number, height:number, src?: string}) {
        this.width = config.width;
        this.height = config.height;
        this.src = config.src ? config.src : this.src;
        this.rotateAngle = 0;
        this.angle = 0;
        this.reverseX = false;
        this.reverseY = false;
        this.scale = 1;
        this.dirty = true;
    }

    resizeBackground(w:number, h:number) {
        this.width = w;
        this.height = h;
    }

    /**
     * 重新上传图片后，要使用新的图片
     * @param config
     */
    useNewImg(config:{width: number, height:number, src?: string}) {
        this.resetBackground(config);
        window.Ktu.edit.resetScale();
    }

    /**
     * 水平翻转或垂直翻转，翻转前必须先裁剪，然后将裁剪后的图片翻转
     * @returns {Promise<void>}
     */
    async switchReverse(direction: string) {
        let newCutBoxLeft:number;
        let newCutBoxTop:number;
        const { width, height } = window.Ktu.ktuData.background;
        const { cutBox, background } = window.Ktu.ktuData;
        let reverseX = false;
        let reverseY = false;
        if (direction == 'x') {
            newCutBoxLeft = window.Ktu.edit.editSize.width * window.Ktu.edit.editScale - cutBox.left - cutBox.width;
            newCutBoxTop = cutBox.top;
            reverseX = true;
        } else {
            reverseY = true;
            newCutBoxTop = window.Ktu.edit.editSize.height * window.Ktu.edit.editScale - cutBox.top - cutBox.height;
            newCutBoxLeft = cutBox.left;
        }
        return new Promise(async res => {
            const backgroundCanvas = document.getElementById('backgroundCanvas');
            const holderCanvas = document.getElementById('holderCanvas');
            if (backgroundCanvas && holderCanvas) {
                const ctx = backgroundCanvas.getContext('2d');
                const ctx1 = holderCanvas.getContext('2d');
                // 执行翻转
                const scaleX = reverseX ? -1 : 1;
                const scaleY = reverseY ? -1 : 1;
                const translateX = (scaleX === -1) ? width : 0;
                const translateY = (scaleY === -1) ? height : 0;
                ctx1.translate(translateX, translateY);
                ctx1.scale(scaleX, scaleY);
                // 清除画布，再进行重绘
                ctx1.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
                ctx1.drawImage(backgroundCanvas, 0, 0, width, height);
                // 清除画布，再进行重绘
                ctx.clearRect(0, 0, holderCanvas.width, holderCanvas.height);
                ctx.drawImage(holderCanvas, 0, 0, width, height);

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx1.setTransform(1, 0, 0, 1, 0, 0);
                window.Ktu.ktuData.background.resizeBackground(width, height);
                cutBox.updateSize(cutBox.width, cutBox.height, { left: newCutBoxLeft, top: newCutBoxTop });
                res();
            }
        });
    }

    /**
     * 旋转编辑器
     * @returns {Promise<void>}
     */
    async rotateEditor(isClockwise = true) {
        const { cutBox } = window.Ktu.ktuData;
        const tmpScale = window.Ktu.edit.editScale;
        const tmpSize = window.Ktu.edit.editSize;
        let newCutBoxLeft = 0;
        let newCutBoxTop = 0;

        return new Promise(async res => {
            const { src, rotateAngle } = this;

            const canvas = document.getElementById('backgroundCanvas');
            const canvas1 = document.getElementById('holderCanvas');
            if(canvas && canvas1) {
                const ctx = canvas.getContext('2d');
                const ctx1 = canvas1.getContext('2d');

                const img = new Image();
                img.onload = () => {
                    const { width } = img;
                    const { height } = img;
                    switch (rotateAngle) {
                        case 0:
                            canvas1.width = width;
                            canvas1.height = height;
                            ctx1.drawImage(img, 0, 0, width, height);
                            break;
                        case 90:
                            canvas1.width = height;
                            canvas1.height = width;
                            ctx1.translate(height, 0);
                            ctx1.rotate(rotateAngle * Math.PI / 180);
                            ctx1.drawImage(img, 0, 0, width, height);
                            break;
                        case 180:
                            canvas1.width = width;
                            canvas1.height = height;
                            ctx1.translate(width, height);
                            ctx1.rotate(rotateAngle * Math.PI / 180);
                            ctx1.drawImage(img, 0, 0, width, height);
                            break;
                        case 270:
                            canvas1.width = height;
                            canvas1.height = width;
                            ctx1.translate(0, width);
                            ctx1.rotate(rotateAngle * Math.PI / 180);
                            ctx1.drawImage(img, 0, 0, width, height);
                            break;
                    }

                    canvas.width = canvas1.width;
                    canvas.height = canvas1.height;
                    ctx.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height);

                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx1.setTransform(1, 0, 0, 1, 0, 0);

                    // 重置背景
                    this.resizeBackground(canvas1.width, canvas1.height);
                    this.useNewImg({
                        width: canvas1.width,
                        height: canvas1.height,
                    });
                    this.rotateAngle = rotateAngle;

                    let newCutBoxWidth = cutBox.height;
                    let newCutBoxHeight = cutBox.width;
                    const currentScale = window.Ktu.edit.editScale;

                    if (isClockwise) {
                        newCutBoxLeft = tmpSize.height * tmpScale - window.Ktu.ktuData.cutBox.top - window.Ktu.ktuData.cutBox.height;
                        newCutBoxTop = cutBox.left;
                    } else {
                        newCutBoxTop = tmpSize.width * tmpScale - window.Ktu.ktuData.cutBox.left - window.Ktu.ktuData.cutBox.width;
                        newCutBoxLeft = cutBox.top;
                    }

                    // 更新cutBox的位置和大小
                    newCutBoxWidth = newCutBoxWidth * currentScale / tmpScale;
                    newCutBoxHeight = newCutBoxHeight * currentScale / tmpScale;
                    newCutBoxLeft = newCutBoxLeft * currentScale / tmpScale;
                    newCutBoxTop = newCutBoxTop * currentScale / tmpScale;
                    cutBox.offsetLeft = window.Ktu.edit.editSize.left;
                    cutBox.offsetTop = window.Ktu.edit.editSize.top;
                    cutBox.updateSize(newCutBoxWidth, newCutBoxHeight, { left: newCutBoxLeft, top: newCutBoxTop });
                    res();
                };
                img.src = src;
            }
        });
    }
}