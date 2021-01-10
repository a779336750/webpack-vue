import {Component, Vue} from "vue-property-decorator";

@Component
export default class UploadSetting extends Vue {
	public files: Array<File> | undefined;
	public loading() {
		// @ts-ignore
		this.$Spin.show();
	}
	public loaded() {
		// @ts-ignore
		this.$Spin.hide();
	}
	public fileChange(e:any) {
		this.files = e.target.files;
		this.dealFile();
		// 重置value,避免选中同一文件时无法触发onchange事件
		e.target.value = null;
	}
	public async dealFile() {
		if (!navigator.onLine) {
			// @ts-ignore
			this.$Message.error('网络中断，请稍后再试!');
			return;
		}
		if (this.files && this.files.length > 0) {
			const { length } = this.files;
			let isPassed = true;
			for (const file of this.files) {
				if (file) {
					if (file.size > 20 * 1000 * 1000) {
						isPassed = false;
						alert('只能上传小于20Mb的图片,请先压缩!');
						return;
					}
					const { type } = file;
					if (type.indexOf('png') < 0 && type.indexOf('jpeg') < 0 && type.indexOf('jpg') < 0) {
						isPassed = false;
						alert('只能上传png或者jpg类型的图片!');
						return;
					}
				}
			}
			if (length > 1) {
				isPassed = false;
				alert('只能上传一张png或者jpg类型的图片!');
				return;
			}
			if (isPassed) {
				interface newFile {
					width: number,
					height: number,
					name:string,
					imgType: string,
					src: string,
				}
				this.loading();
				const tempFileList: Array<File> = [];
				const filesList = Array.from(this.files);
				await new Promise(res => {
					let count = 0;
					filesList.map((file, index) => {
						const { type } = file;
						const newFile: any = {};
						const URL = window.URL || window.webkitURL;
						const url = URL.createObjectURL(file);
						const img = document.createElement('img');
						img.onload = async () => {
							const { width, height } = img;
							newFile.width = width;
							newFile.height = height;
							newFile.name = file.name;
							newFile.imgType = type;
							const canvas = document.createElement('canvas');
							canvas.width = width;
							canvas.height = height;
							const ctx = canvas.getContext('2d');
							// 用户更改图片名时误将png转jpg时，避免透明背景变成黑色
							if(ctx) {
								if (type === 'image/jpeg' || type === 'image/jpg') {
									ctx.fillStyle = '#fff';
									ctx.fillRect(0, 0, canvas.width, canvas.height);
								}
								ctx.drawImage(img, 0, 0, width, height);
								if (type === 'image/png') {
									canvas.toBlob(blob => {
										newFile.src = URL.createObjectURL(blob);
										tempFileList.push(newFile);
										count++;
										if (count === filesList.length) {
											setTimeout(() => {
												res();
											}, 1000);
										}
									}, 'image/png');
								}
								if (type === 'image/jpeg' || type === 'image/jpg') {
									canvas.toBlob(blob => {
										newFile.src = URL.createObjectURL(blob);
										tempFileList.push(newFile);
										count++;
										if (count === filesList.length) {
											setTimeout(() => {
												res();
											}, 1000);
										}
									}, 'image/jpeg', 1);
								}
								// 生成背景缩略图，优化性能
							}

						};
						img.onerror = err => {
							// @ts-ignore
							this.$Message.error('图片文件异常，请确认是否更改过后缀名');
							res();
						};
						img.src = url;
					});
				});
				this.loaded();
				if (tempFileList[0]) {
					window.Ktu.page.chooseImage(tempFileList[0]);
				}
			}
		}
	}
}