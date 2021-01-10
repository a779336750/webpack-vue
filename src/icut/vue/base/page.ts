import Background from '../base/background';
import CutBox from '../base/cutBox';
import Utils from './global/utils';
import axios from 'axios';
// @ts-ignore
import _ from 'lodash';
import {ModifyHistoryStep} from './undoredu';

/**
 * Page 对象用于处理页面级别的操作。包含新增，删除，下载等
 * -变量 currentpageId 页面id
 */
export default class Page {

	public originalState: object = {}

	/**
	 * 选择上传的图片
	 * @param file
	 */
	chooseImage(file: any) {
		const isReUpload = !Utils.isEmptyObject(window.Ktu.ktuData);
		this.resetPage();
		let data: KtuData = {
			name: file.name,
			background: new Background(file),
			cutBox: new CutBox({}),
		};

		window.Ktu.ktuData = data;
		if (isReUpload) {
			window.Ktu.vm.$nextTick(() => {
				window.Ktu.edit.resetEdit();
				window.Ktu.ktuData.cutBox.initSize();
				window.Ktu.ktuData.background.drawCanvas();
				window.Ktu.vm.$nextTick(() => {
					window.Ktu.originalData = _.cloneDeep(window.Ktu.ktuData);
				});
			});
		}
	}

	resetPage() {
		if (window.Ktu.historyManager) window.Ktu.historyManager.clearAll();
	}

	/**
	 * 执行一次操作后，保存上一次的数据
	 */
	saveState() {
		this.originalState = this.toObject();
	}

	/**
	 * 清除前进后退记录
	 */
	clearAllHistory() {
		window.Ktu.historyManager.clearAll();
	}

	/**
	 * 执行一次操作后，修改当前数据
	 */
	modifiedState() {
		const newHistoryStep = window.Ktu.historyManager.addStep(new ModifyHistoryStep());
		newHistoryStep.beforeChange(this.originalState);
		newHistoryStep.afterChange(this.toObject());
	}

	/**
	 *  获取上一次需要保存的数据
	 * @returns {*}
	 */
	toObject() {
		return _.cloneDeep({
			ktuData: window.Ktu.ktuData,
			editScale: window.Ktu.edit.editScale,
		});
	}

	/**
	 * 执行一次操作后，保存上一次的数据
	 * @param historyData
	 */
	modifyHistory(historyData: any) {
		const rotateAngleChanged = historyData.ktuData.background.rotateAngle != window.Ktu.ktuData.background.rotateAngle;
		const reverseChanged = (historyData.ktuData.background.reverseX != window.Ktu.ktuData.background.reverseX || historyData.ktuData.background.reverseY != window.Ktu.ktuData.background.reverseY);
		const bgSrcChanged = historyData.ktuData.background.src != window.Ktu.ktuData.background.src;
		const tmpScale = historyData.editScale;
		window.Ktu.vm.$store.commit('data/changeKtuProp', {
			prop: 'background',
			value: historyData.ktuData.background,
		});
		window.Ktu.ktuData.background.dirty = true;
		window.Ktu.vm.$store.commit('data/changeKtuProp', {
			prop: 'cutBox',
			value: historyData.ktuData.cutBox,
		});
		window.Ktu.edit.resetScale();
		const scale = tmpScale / window.Ktu.edit.editScale;

		// 恢复cutBox的位置
		const {cutBox} = historyData.ktuData;
		const width = cutBox.width / scale;
		const height = cutBox.height / scale;
		const left = cutBox.left / scale;
		const top = cutBox.top / scale;
		const offsetLeft = window.Ktu.edit.editSize.left;
		const offsetTop = window.Ktu.edit.editSize.top;
		window.Ktu.ktuData.cutBox.updateSize(width, height, {left, top}, {offsetLeft, offsetTop});
		if (rotateAngleChanged || reverseChanged || bgSrcChanged) {
			window.Ktu.ktuData.background.drawCanvas();
		}
	}

	/**
	 * 恢复到页面初始状态
	 * @returns {Promise<void>}
	 */
	async restore() {
		if (JSON.stringify(window.Ktu.originalData) === JSON.stringify(window.Ktu.ktuData)) return;
		this.saveState();
		const {width, height, src} = window.Ktu.originalData.background;
		window.Ktu.ktuData.background.resetBackground({width, height, src});
		window.Ktu.ktuData.background.drawCanvas();
		window.Ktu.edit.resetScale();
		window.Ktu.ktuData.cutBox.hide();
		this.modifiedState();
	}

	/**
	 * 下载所有页面
	 * @param imgForm
	 * @returns {Promise<void>}
	 */
	async download(imgForm: string): Promise<{ name: string, src: string}> {
		const pageName = `${Utils.splitFileName(window.Ktu.ktuData.name).name}.${imgForm}`;
		const url = await Utils.changeImgForm(window.Ktu.ktuData.background.src, imgForm, true);
		return {
			name: pageName,
			src: url as string,
		};
	}

	async uploadImg(blob: Blob, name: string): Promise<string> {
		if (!navigator.onLine) {
			window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
			window.Ktu.store.state.data.isOffLineClose = true;
			return '';
		}
		const fd = new FormData();
		fd.append('filedata', blob);
		fd.append('name', encodeURI(name));
		const url = `/ajax/advanceUpload_h.jsp?cmd=downloadTmp`;
		const imgUrl: string = await new Promise((resolve, reject) => {
			axios.post(url, fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then(res => {
				if (res) {
					const result = res.data;
					if (result.success) {
						resolve(result.imgPath);
					}
				} else {
					if (!navigator.onLine) {
						window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
						window.Ktu.store.state.data.isOffLineClose = true;
					}
				}
			})
				.catch(err => {
					reject(err);
				});
		});
		return imgUrl;
	}

	/**
	 * 保存到我的素材
	 * @returns {Promise<void>}
	 */
	async saveToMyImgs() {
		return new Promise(async (res, rej) => {
			const {width} = window.Ktu.ktuData.background;
			const {height} = window.Ktu.ktuData.background;
			const {name} = window.Ktu.ktuData;
			const fd = await Utils.blobToFormData(window.Ktu.ktuData.background.src);
			if (!navigator.onLine) {
				window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
				window.Ktu.store.state.data.isOffLineClose = true;
				return;
			}
			const url = `/ajax/advanceUpload_h.jsp?cmd=uploadByCorp&width=${width}&height=${height}&name=${name}`;
			axios.post(url, fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then(response => {
				if (response) {
					const result = response.data;
					if (result.success) {
						res();
					} else {
						if (!navigator.onLine) {
							window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
							window.Ktu.store.state.data.isOffLineClose = true;
							return;
						}
						rej(result.msg);
					}
				} else {
					if (!navigator.onLine) {
						window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
						window.Ktu.store.state.data.isOffLineClose = true;
					}
				}
			})
				.catch(() => {
					rej('登录失效，请重新登录');
				});
			if (!navigator.onLine) {
				window.Ktu.vm.$Message.error('网络中断，请稍后再试!');
				window.Ktu.store.state.data.isOffLineClose = true;
			}
		});
	}

	/**
	 * 从seo页面上传图片，要从重新从后台获取图片
	 */
	uploadFromSeo() {
		if (!window.Ktu.imgsUploadedFromSeo[0]) return;
		const {imgId, name, imgType} = window.Ktu.imgsUploadedFromSeo[0];
		if (!!imgId) {
			window.Ktu.imgId = imgId;
			window.Ktu.imgType = imgType;
			setTimeout(() => {
				window.Ktu.vm.$Spin.show();
			}, 0);
			const url = `/ajax/webImgTool_h.jsp?cmd=getImg&id=${imgId}`;
			const responseType = 'arraybuffer';
			axios.post(url, {}, {
				responseType,
			}).then(result => {
				const bytes = new Uint8Array(result.data);
				let data = '';
				const len = bytes.byteLength;
				for (let i = 0; i < len; i++) {
					data += String.fromCharCode(bytes[i]);
				}
				const image = new Image();
				image.onload = () => {
					const tempImgData = {
						height: image.height,
						imgType: 'image/png',
						name,
						src: image.src,
						width: image.width,
					};
					window.Ktu.page.chooseImage(tempImgData);
					window.Ktu.vm.$Spin.hide();
				};
				image.src = `data:image/png;base64,${window.btoa(data)}`;
			});
			history.replaceState({}, '', '/caijian.html?isEditor=true#');
		}
	}
}