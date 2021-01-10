import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'

@Module({namespaced: true, name: 'setting'})
class Setting extends VuexModule {
	public editScale: number = 1;
	public editSize: object = {};
	// 0:'自由裁切' | 1:'1:1' | 2:'2:3' | 3: '4:3' | 4:'7:5' | 5: '16:9' | 6:'9:19.5' | 7:'小1寸' | 8:'黄金比例']
	public currentProportion: number = 0;

	@Mutation
	public changeState(obj: { prop: string, value: any }): void {
		this[obj.prop] = obj.value
	}

	@Action
	public updateName(newName: string): void {
		this.context.commit('setName', newName)
	}
}

export default Setting