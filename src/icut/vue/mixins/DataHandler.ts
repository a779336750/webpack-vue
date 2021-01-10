import {Component, Vue} from "vue-property-decorator";

@Component
export default class DataHandler extends Vue {
	public changeCutBoxProp(prop:string, value:any) {
		this.$store.commit('data/changeCutBoxProp', {
			prop,
			value,
		});
	}
	public changeBackgroundProp(prop:string, value:any) {
		this.$store.commit('data/changeBackgroundProp', {
			prop,
			value,
		});
	}
	public changeKtuProp(prop:string, value:any) {
		this.$store.commit('data/changeKtuProp', {
			prop,
			value,
		});
	}
}