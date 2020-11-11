<template>
  <div class="app">
    <p>11111</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop, } from 'vue-property-decorator';
@Component({})// 组件在此添加
export default class App extends Vue{
  private str:string = 'success'; // data 定义
  private mounted(){ // mounted
    console.log(this.change); // 输入 success
  }
  get change():string{ // computed
    return this.str;
  }
}
</script>

