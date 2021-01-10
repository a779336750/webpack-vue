/**
 * 简单的函数接口
 */
interface SearchFunc {
    (a: string, b: string): boolean
}

/**
 * 可索引类型接口
 */
interface stringArr {
    [index:number]: string;
    length: number,
}


let searchFun: SearchFunc;
searchFun = function (s:string,b:string) {
    return s > b
}

function testStringArr(arr: stringArr) {
    console.log(arr[1]);
}

/**
 * 简单的类型接口
 */
interface ageInterface {
    age: number
}

/**
 * 接口继承 
 */
interface classInterface extends ageInterface{
    name: string
}
class myClass implements classInterface {
    name: string;
    age: number;
    constructor(name:string, age:number) {
        this.name = name
        this.age = age
    }

}
export default function () {
    console.log(searchFun('aaa','bb'))
    testStringArr(['1','2'])
    const p = new myClass('dick', 11)
    console.log(p);
}
