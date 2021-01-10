import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'

@Module({namespaced: true, name: 'base'})
class Base extends VuexModule {
}

export default Base