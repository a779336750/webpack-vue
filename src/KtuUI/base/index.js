// main.js
import Affix from './vue/components/affix';
import Alert from './vue/components/alert';
import Anchor from './vue/components/anchor';
import AnchorLink from './vue/components/anchor-link';
import AutoComplete from './vue/components/auto-complete';
import Breadcrumb from './vue/components/breadcrumb';
import Badge from './vue/components/badge';
import BackTop from './vue/components/back-top';
import Button from './vue/components/button';
import Card from './vue/components/card';
import Carousel from './vue/components/carousel';
import Cell from './vue/components/cell';
import Checkbox from './vue/components/checkbox';
import Circle from './vue/components/circle';
import Collapse from './vue/components/collapse';
import ColorPicker from './vue/components/color-picker';
import Divider from './vue/components/divider';
import Drawer from './vue/components/drawer';
import Dropdown from './vue/components/dropdown';
import DatePicker from './vue/components/date-picker';
import Form from './vue/components/form';
import Icon from './vue/components/icon';
import Input from './vue/components/input';
import InputNumber from './vue/components/input-number';
import Layout from './vue/components/layout';
import Content from './vue/components/content';
import Header from './vue/components/header';
import Footer from './vue/components/footer';
import Sider from './vue/components/sider';
import Spin from './vue/components/spin';
import Menu from './vue/components/menu';
import Message from './vue/components/message';
import Modal from './vue/components/modal';
import Notice from './vue/components/notice';
import Page from './vue/components/page';
import Poptip from './vue/components/poptip';
import Progress from './vue/components/progress';
import Radio from './vue/components/radio';
import Rate from './vue/components/rate';
import Slider from './vue/components/slider';
import Switch from './vue/components/switch';
import Steps from './vue/components/steps';
import Tooltip from './vue/components/tooltip';
import Table from './vue/components/table';
import Tabs from './vue/components/tabs';
import Upload from './vue/components/upload';
import Undoredo from './vue/components/undoredo';
import TimePicker from './vue/components/time-picker';
import { Select, Option, OptionGroup } from './vue/components/select';

import { Row, Col } from './vue/components/gird';
import { Sprite, Gradient } from './vue/svg/index.js';

import locale from './vue/locale/index.js';

import './sass/index.scss';

const components = {
    Affix,
    Alert,
    Anchor,
    AnchorLink,
    AutoComplete,

    Badge,
    BackTop,
    Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item,
    Button,
    ButtonGroup: Button.Group,
    Card,
    Carousel,
    CarouselItem: Carousel.Item,
    Cell,
    CellGroup: Cell.Group,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    ColorPicker,
    Col,
    Collapse,
    Divider,
    Drawer,
    DatePicker,
    Dropdown,
    DropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    Form,
    FormItem: Form.Item,
    Icon,
    Input,
    InputNumber,
    Layout,
    Content,
    Header,
    Footer,
    Sider,
    Step: Steps.Step,
    Steps,
    Menu,
    MenuGroup: Menu.Group,
    MenuItem: Menu.Item,
    Message,
    Modal,
    Notice,
    Option,
    OptionGroup,
    Panel: Collapse.Panel,
    Page,
    Poptip,
    Progress,
    Radio,
    RadioGroup: Radio.Group,
    Rate,
    Row,
    iSwitch: Switch,
    Select,
    Slider,
    Sprite,
    Spin,
    Submenu: Menu.Sub,
    Gradient,
    Tabs,
    TabPane: Tabs.Pane,
    Table,
    Tooltip,
    TimePicker,
    Upload,
};

const kapi = {
    ...components,
    iButton: Button,
    iMenu: Menu,
    iCol: Col,
    iTable: Table,
    iCircle: Circle,
    iForm: Form,
    iProgress: Progress,
};

const install = function (Vue, opts = {}) {
    if (install.installed) return;

    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(kapi).forEach(key => {
        Vue.component(key, kapi[key]);
    });

    Vue.prototype.$IVIEW = {
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : '',
    };

    // Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
    Vue.prototype.$Undoredo = Undoredo;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    Circle,
    Switch,
    ...components,
};

API.lang = code => {
    const langObject = window['iview/locale'].default;
    if (code === langObject.i.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

export default API;
