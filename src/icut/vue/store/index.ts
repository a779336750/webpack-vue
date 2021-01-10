import Vue from 'vue';
import Vuex from 'vuex';
// @ts-ignore
import index from './module/index';
// @ts-ignore
import data from './module/data';
// @ts-ignore
import setting from './module/setting';
// @ts-ignore
import base from './module/base';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		index,
		data,
		setting,
		base,
	},
});
