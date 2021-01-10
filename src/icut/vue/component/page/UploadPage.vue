<template>
    <div class="upload-page" @drop="dropFiles"  @dragenter="isDragOver = false">
        <div class="upload-box" :class="{dragover:isDragOver}" @mouseenter="isHover = true" @mouseleave="isHover = false" @drop="handleDrop" @dragenter.stop="handleDragEnter" >
            <label class="dashed-box" for="addPic" @click="upload"></label>
            <div class="svg-container" >
                <icon class="icon-big" id="#upload-big-hover" v-if="isHover || isDragOver"/>
                <icon class="icon-big" id="#upload-big"  v-else/>
            </div>
            <p class="upload-img-dec" v-if="!isDragOver">点击/拖动 上传图片</p>
            <p class="upload-img-dec" v-else>请松开鼠标</p>
            <p class="upload-img-tips">支持jpg/png图片，大小不超过20M</p>
            <input @change="fileChange($event)" id="addPic" type="file" accept="image/jpg,image/jpeg,image/png" style="display:none;">
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Mixins, Watch} from "vue-property-decorator";
    import UploadSetting from "../../mixins/uploadSetting";
    @Component({
      name: 'UploadPage',
      components: {  },
    })// 组件在此添加
    export default class TheHeader extends Mixins(UploadSetting)  {
        private isHover:boolean =  false;
        private isDragOver:boolean =  false;
        private uploadPosition:string ='上传页';
        private upload(e:any) {
        }
        private dropFiles(e:any) {
            this.files = e.dataTransfer.files;
            this.dealFile();
            e.target.value = null;// 重置value,避免选中同一文件时无法触发onchange事件
        }
        private handleDragEnter() {
            this.isDragOver = true;
        }
        private handleDrop() {
            this.isDragOver = false;
        }
        created() {
            document.body.addEventListener('dragover', (e:any) => {
                e.preventDefault();
            });
            document.body.addEventListener('drop', (e:any) => {
                e.preventDefault();
            });
        }
    }
</script>
