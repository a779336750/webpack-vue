interface EditSize {
    width: number,
    height: number,
    left: number,
    top: number,
}

export default class Edit {
    public _editScale: number = 1;
    public _editSize: EditSize = {width: 0, height: 0, left: 0, top: 0};
    public editView: HTMLElement | null | undefined;

    get editScale(): number {
        return this._editScale;
    }

    set editScale(newScale: number) {
        this._editScale = newScale;
        window.Ktu.vm.$store.commit('setting/changeState', {
            prop: 'editScale',
            value: newScale,
        });
    }

    get editSize(): EditSize {
        return this._editSize;
    }

    set editSize(editSize: EditSize) {
        this._editSize = editSize;
        window.Ktu.vm.$store.commit('setting/changeState', {
            prop: 'editSize',
            value: editSize,
        });
    }

    constructor() {
        window.addEventListener('resize', () => {
            const tmpScale = this.editScale;
            this.resetScale();
            window.Ktu.ktuData.cutBox.updateOffset(tmpScale / this.editScale);
        });
    }

    resetEdit(): void {
        this.editView = document.getElementById('editView');
        this.resetScale();
    }

    resetScale() {
        let scaleX = 1;
        let scaleY = 1;
        let minScaleX;
        let minScaleY;
        const minWidth = 400;
        const minHeight = 400;
        const bgSize = {
            width: window.Ktu.ktuData.background.width,
            height: window.Ktu.ktuData.background.height,
        };
        if (!this.editView) return;
        const editCenterSize = {
            width: this.editView.offsetWidth,
            height: this.editView.offsetHeight,
        };
        const margin = 100;
        if (bgSize.width > (editCenterSize.width - 2 * margin)) {
            scaleX = (editCenterSize.width - 2 * margin) / bgSize.width;
        }
        if (bgSize.height > (editCenterSize.height - 2 * margin)) {
            scaleY = (editCenterSize.height - 2 * margin) / bgSize.height;
        }
        this.editScale = scaleX < scaleY ? scaleX : scaleY;
        // 当高度或宽度小于400时
        if (bgSize.width * this.editScale < 400 || bgSize.height * this.editScale < 400) {
            minScaleX = minWidth / window.Ktu.ktuData.background.width;
            minScaleY = minHeight / window.Ktu.ktuData.background.height;
            this.editScale = minScaleX < minScaleY ? minScaleY : minScaleX;
            // 限制其放大倍数，防止超出范围
            if (this.editScale * bgSize.width > (editCenterSize.width - 2 * margin)) {
                this.editScale = (editCenterSize.width - 2 * margin) / bgSize.width;
            } else if (this.editScale * bgSize.height > (editCenterSize.height - 2 * margin)) {
                this.editScale = (editCenterSize.height - 2 * margin) / bgSize.height;
            }
        }
        this.editSize = {
            width: bgSize.width,
            height: bgSize.height,
            left: (editCenterSize.width - bgSize.width * this.editScale) / 2,
            top: (editCenterSize.height - bgSize.height * this.editScale) / 2,
        };
    }


}