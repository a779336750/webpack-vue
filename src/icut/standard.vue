<template>
  <div>
    {{ text }}
    {{ name }}
    <p>are you {{job}}</p>
    <p>your age is {{age}}</p>
    <p>your dog name is {{dogName}}</p>
    {{personInfo}}
    <button @click="personInfo = 'sadsa'">change my name</button>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch, Emit, Prop, Mixins,} from 'vue-property-decorator';
import mixin from '../mixins/index'

@Component({
  name: 'HelloWorld',
})// 组件在此添加
export default class HelloWorld extends Mixins(mixin) {
  private text: string = 'hello'
  private myName: string = 'Jason'
  private list: Array<string> = [
      'hahahah',
  ]
  @Prop() readonly name!: string
  @Prop({default: 'Doctor'}) readonly job!: string
  @Prop({required: true}) readonly age!: string
  @Prop(String) readonly dogName!: string

  get personInfo():string {
    return `myName is ${this.myName}`
  }
  set personInfo(name ) {
    this.myName = name
  }

  @Watch('myName',{
    immediate: false,
    deep: false,
  })
  onMyNameChanged(val:string, oldVal:string) {
    this.onChangeName(val)
  }
  public changeName():void {
    console.log('nameChanged')
  }

  @Emit()
  onChangeName(val: string): string {
    return val;
  }

  get nameUpperCase():string {
    return this.$store.state.user.nameUpperCase
  }
  set nameUpperCase(val:string) {
    this.$store.commit('user/setName', val)
  }
  mounted() {
    console.log(this.interest);
    this.nameUpperCase = 'dick'
    console.log(this.nameUpperCase);
  }

}
</script>

