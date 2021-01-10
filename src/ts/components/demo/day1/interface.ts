/**
 * 简单的接口
 */
interface Label {
    label: string;
}

/**
 * 含有可选属性的接口
 */
interface choosableLabel {
    label?: string;
    name?: string;
}
/**
 * 含有字符串索引签名的接口
 */
interface choosableLabelString {
    label?: string;
    name?: string;
    [propName: string]:any;
}
/**
 * 含有只读属性的接口
 */
interface readonlyLabel {
    readonly label: string;
    readonly name: string;
}
function runLabel(obj:Label) {
    console.log(obj);
}
function runChoosableLabel(obj:choosableLabel) {
    console.log(obj);
}
function runReadonlyLabel() {
    const obj:readonlyLabel = {label:'哈哈哈',name:'嘻嘻嘻'}
    console.log(obj);
    // obj.label=1;//报错
}

function runCheckLabel(config: choosableLabel) {
    console.log(config);
}
function runCheckLabelString(config: choosableLabelString) {
    console.log(config);
}

export default function () {
    runLabel({label:'1111'})
    runChoosableLabel({label:'1111'})
    // 报错，不能含有额外属性
    // runChoosableLabel({label:'1111',aaa:'sdasdsa'})

    runReadonlyLabel();

    runCheckLabel({label:'1111',name:'嘻嘻嘻'});
    // 使用类型断言：
    runCheckLabel({label:'1111',name:'嘻嘻嘻', aa:111} as choosableLabel);
    runCheckLabelString({label:'1111',name:'嘻嘻嘻',aaa:1});
    // 是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查
    const props =  {label:'1111',aaa:'sdasdsa'};
    runCheckLabel(props)

}
