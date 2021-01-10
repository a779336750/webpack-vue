import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'

@Module({namespaced: true, name: 'data'})
class Data extends VuexModule {
    public needCheckStep: boolean = false
    public ktuData: any = {}
    public isOffLineClose: boolean = false
    public isShowDownloadTips: boolean = false
    @Mutation
    public changeState(obj: {prop:string,value:any }): void {
        this[obj.prop] = obj.value;
    }
    @Mutation
    public changeCutBoxProp(obj: {prop:string,value:any }): void {
        const data = this.ktuData.cutBox;
        data[obj.prop] = obj.value;
    }
    @Mutation
    public changeBackgroundProp(obj: {prop:string,value:any }): void {
        const data = this.ktuData.background;
        data[obj.prop] = obj.value;
    }
    @Mutation
    public changeKtuProp(obj: {prop:string,value:any }): void {
        const data = this.ktuData;
        data[obj.prop] = obj.value;
    }
}

export default Data