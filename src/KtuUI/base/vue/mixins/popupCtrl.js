export default {
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        show($event) {
            if (!this.isShow) {
                this.isShow = true;
                window.setTimeout(() => {
                    document.addEventListener('click', this.closePopup);
                    document.addEventListener('drag', this.closePopup);
                });
            }
        },
        closePopup() {
            const popupContainer = this.$refs.popup;
            if (popupContainer) {
                const { target } = event;
                if (popupContainer !== target && !$.contains(popupContainer, target)) {
                    this.isShow = false;
                    document.removeEventListener('click', this.closePopup);
                    document.removeEventListener('drag', this.closePopup);
                }
            } else {
                this.isShow = false;
                document.removeEventListener('click', this.closePopup);
                document.removeEventListener('drag', this.closePopup);
            }
        },
    },
};
