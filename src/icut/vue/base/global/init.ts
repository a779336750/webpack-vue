import CutBox from "../cutbox";
// @ts-ignore
import Background from '../background';
// @ts-ignore
import Page from '../page';
import Edit from '../edit';
import {KtuHistory} from '../undoredu';
import {Vue} from "vue-property-decorator";

declare global {
    interface Ktu {
        [key:string]: any
    }
    interface KtuData {
        name: string,
        cutBox: CutBox,
        background: Background,
    }
    interface Window {
        chrome: any;
        showModalDialog: boolean;
        Ktu: Ktu;
    }

    interface Navigator {
        connection: any;
    }
    interface File {
        [key:string]: any
    }

    interface HTMLElement {
        [key:string]: any
    }
}
