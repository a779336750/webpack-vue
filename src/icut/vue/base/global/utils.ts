export default {
    reg: {
        idNum: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        phone: /^1\d{10}$/,
        bankAcct: /^\d+$/,
    },
    /**
     * 节流函数,只允许最后一次执行
     * @param func
     * @param wait
     */
    // throttle(func: any, wait: number) {
    //     if (this.setTimeout) {
    //         clearTimeout(this.setTimeout);
    //     }
    //     this.setTimeout = setTimeout(() => {
    //         func();
    //     }, wait);
    // },
    /**
     * 是否为空对象{}
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject(obj:object):boolean {
        return JSON.stringify(obj) === '{}';
    },
    async imgToBase64(src:string) {
        const base64 = await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';// 解决跨域图片问题，就是上面提及的
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                if(!!ctx) {
                     ctx.drawImage(img, 0, 0, img.width, img.height);
                    resolve(canvas.toDataURL());
                }else {
                    reject('绘制失败');
                }
            };
            img.src = src;
        });
        return base64;
    },
    /**
     * svgDom节点转base64
     * @param svgDom
     * @returns {string}
     */
    svgDomToBase64(svgDom: string) {
        return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgDom)))}`;
    },
    /**
     * svgDomToImage，svg节点转blob对象或blob图片的url,jpg格式一定要转为jpeg格式，解决转换后图片太大的问题
     * @param config：
     * form 格式 png || jpg
     * width 图片宽度
     * height 图片高度
     * isBlob 是否返回blob对象
     * @returns {blob格式图片的url}
     */
    svgDomToImage: async function (svgDom: string, config: { form: string, width: number, height: number, isBlob: boolean }) {
        let {form, width, height, isBlob = false} = config;
        // 使用jpg格式时，图片会变得非常大,必须改为jpeg
        if (form === 'jpg') form = 'jpeg';
        const result = await new Promise((res, rej) => {
            const canvas = document.createElement('canvas');
            const base64 = this.svgDomToBase64(svgDom);
            const img = new Image();
            img.src = base64;
            img.onload = info => {
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                if (form === 'jpeg') {
                    // png转jpg时，避免透明背景变成黑色
                    if (ctx) ctx.fillStyle = '#fff';
                    ctx && ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx && ctx.drawImage(img, 0, 0, width, height);
                if (canvas.toBlob) {
                    canvas.toBlob(blob => {
                        if (isBlob) {
                            res(blob);
                        } else {
                            const url = URL.createObjectURL(blob);
                            res(url);
                        }
                    }, `image/${form}`, 1);
                }
            };
            img.onerror = info => {
                rej(info);
            };
        });
        return result;
    },

    /**
     * changeImgForm，jpg或png的图片src转blog对象的url
     * @param config：
     * form 原始格式 'png' || 'jpg' || 'jpeg'
     * width 图片宽度
     * height 图片高度
     * @returns {blob格式图片的url}
     */
    async changeImgForm(src: string, form:string, returnUrl = true): Promise<Blob | string> {
        // 使用jpg格式时，图片会变得非常大,必须改为jpeg
        if (form === 'jpg') form = 'jpeg';
        return new Promise((res, rej) => {
            const canvas = document.createElement('canvas');
            const img = new Image();
            img.onload = info => {
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                if(ctx) {
                    if (form === 'jpeg') {
                        ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    if (canvas.toBlob) {
                        canvas.toBlob(blob => {
                            if (returnUrl) {
                                const url = URL.createObjectURL(blob);
                                res(url);
                            } else {
                                if(!!blob) {
                                    res(blob);
                                }
                            }
                        }, `image/${form}`, 1);
                    }
                }

            };
            img.onerror = info => {
                rej(info);
            };
            img.src = src;
        });
    },

    /**
     * 图片压缩
     * @param src
     * @param width
     * @param height
     * @returns {Promise<unknown>}
     */
    async compressImg(src: string, width:number, height:number) {
        const base64 = await new Promise(res => {
            const image = new Image();
            image.src = src;
            image.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                context && context.drawImage(image, 0, 0, width, height);
                res(canvas.toDataURL());
            };
        });
        return base64;
    },

    /**
     * a标签实现下载
     * @param name
     * @param src
     */
    downloadHref(name: string, src: string): void {
        const $a = document.createElement('a');
        $a.setAttribute('href', src);
        // 重命名，去掉版本号，解决safari浏览器文件格式为dms的问题
        $a.setAttribute('download', name);
        document.documentElement.appendChild($a);
        $a.click();
        document.documentElement.removeChild($a);
    },
    /**
     * 进行url编码
     * @param url
     * @returns {string}
     */
    encodeUrl(url: string): string {
        return typeof url === 'undefined' ? '' : encodeURIComponent(url);
    },

    /**
     * 加入webp
     * @param src
     * @returns {string|*}
     */
    getWebpOrOtherImg(src:string) :string {
        if (!src) {
            return src;
        }

        const pathStr = src.split('?');

        if (pathStr.length > 1) {
            src = `${pathStr[0]}.webp?_tm=3` + `&${pathStr[1]}`;
        } else {
            src = `${pathStr[0]}.webp?_tm=3&v=201806191719`;
        }

        return src;
    },
    is360Brower():boolean {
        const { mimeTypes } = navigator;
        for (const mt in mimeTypes) {
            if (mimeTypes[mt].type == 'application/vnd.chromium.remoting-viewer') {
                return true;
            }
        }
        return false;
    },

    mimeType(e:string, t:string) {
        const r = navigator.mimeTypes;
        for (const s in r) { // @ts-ignore
            if (r[s][e] === t) return !0;
        }
        return !1;
    },

    is360():boolean {
        const e = navigator.userAgent;
        if (window.chrome) {
            const t = Number(e.replace(/^.*Chrome\/([\d]+).*$/, '$1'));
            // window.showModalDialog 是360特有的
            if (t > 36 && window.showModalDialog) return !0;
            if (t > 45) return this.mimeType('type', 'application/vnd.chromium.remoting-viewer');
        }
        return !1;
    },

    _360types() {
        return this.is360() ? (this.mimeType('type', 'application/gameplugin') || navigator.connection && 'undefined' === typeof navigator.connection.saveData ? '360se' : '360ee') : null;
    },

    BrowserType() {
        // 取得浏览器的userAgent字符串
        const { userAgent } = navigator;
        // 判断是否Opera浏览器
        const isOpera = userAgent.indexOf('Opera') > -1;
        // 判断是否Firefox浏览器
        const isFF = userAgent.indexOf('Firefox') > -1;
        // 判断是否Safari浏览器
        const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
        // 判断Chrome浏览器
        const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && navigator.mimeTypes.length < 40;
        // 判断QQ浏览器
        const isQQ = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('QQBrowser') > -1;
        // 判断搜狗浏览器
        const isSougou = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('MetaSr') > -1;
        const is360 = this._360types();

        if (is360) {
            return `${is360}`;
        }
        if (isQQ) {
            return `QQ`;
        }
        if (isSougou) {
            return `Sougou`;
        }
        if (isFF) {
            return 'FF';
        }
        if (isOpera) {
            return 'Opera';
        }
        if (isSafari) {
            return 'Safari';
        }
        if (isChrome) {
            return 'Chrome';
        }
    },

    /**
     * 将图片文件分拆成文件名和文件格式
     * @param fileName
     * @returns {{form: string, name: *}}
     */
    splitFileName(fileName: string): {name:string,form:string } {
        let imgType = 'png';
        if (fileName.indexOf('.png') >= 0) imgType = 'png';
        if (fileName.indexOf('.PNG') >= 0) imgType = 'PNG';
        if (fileName.indexOf('.jpg') >= 0) imgType = 'jpg';
        if (fileName.indexOf('.JPG') >= 0) imgType = 'JPG';
        if (fileName.indexOf('.jpeg') >= 0) imgType = 'jpeg';
        if (fileName.indexOf('.JPEG') >= 0) imgType = 'JPEG';
        return {
            name: fileName.split(`.${imgType}`)[0],
            form: imgType,
        };
    },

    getUrlQueryString() {
        const url = window.location.search;
        const qs = url.split('?')[1];
        if (qs) {
            interface queryString {
                [key: string]: string
            }
            const obj:queryString = {};
            const paramArr = qs.split('&');
            paramArr.forEach((item, index) => {
                const key = item.split('=')[0];
                const value = item.split('=')[1];
                obj[key] = value;
            });
            return obj;
        }
        return {};
    },

    /**
     * base64转formData
     * @param svgDom
     * @returns {string}
     */
    base64ToFormData(base64: string) : any {
        const bytes = window.atob(base64.split(',')[1]);
        const type = base64.split(';base64')[0].split('data:image/')[1];
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: `image/${type}` });
        const fd = new FormData();
        fd.append('filedata', blob);
        // @ts-ignore
        fd.append('totalSize', blob.size);
        return fd;
    },

    /**
     * blob转formData
     * @param svgDom
     * @returns {string}
     */
    async blobToFormData(url: string) {
        const fd = new FormData();
        await new Promise((res, rej) => {
            const http = new XMLHttpRequest();
            http.open('GET', url, true);
            http.responseType = 'blob';
            http.onload = function (e) {
                if (this.status == 200 || this.status === 0) {
                    const blob = this.response;
                    fd.append('filedata', blob);
                    fd.append('totalSize', blob.size);
                    res(fd);
                }
            };
            http.send();
        });
        return fd;
    },
};
