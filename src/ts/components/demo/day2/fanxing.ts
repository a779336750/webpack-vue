/**
 * 简单的泛型
 * @param arg
 */
function identity<T>(arg: T): T {
    return arg;
}
/**
 * 它是个元素类型是T的数组，并返回元素类型是T的数组。
 * @param arg
 */
function identity2<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

/**
 * 使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
 * @param arg
 */
function identity3<T>(arg: T): T {
    return arg;
}

/**
 * 带有类型参数的泛型接口
 */
interface GenericIdentityFn<U> {
    (arg: U): U
}

/**
 * 定义泛型约束接口
 */
interface Lengthwise {
    length: number;
}

/**
 * 带有泛型约束
 * @param arg
 */
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}


export default function () {
    const getValue = identity<string>('aaaaa');
    const getValue2 = identity('aaaaa');
    const getValue3 = identity2([1,2,3]);
    console.log(getValue);
    console.log(getValue2);
    //用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
    const  identity3AA: <U>(arg: U) => U = identity3;
    const getValue4 = identity3AA('bbbbb')
    console.log(getValue4);

    //带有调用签名的对象字面量来定义泛型函数：
    const  identityccc: {<U>(arg: U):U}  = identity3;
    const getValue5 = identity3AA('dddd')
    console.log(getValue5);

    //使用范型接口：
    const  identityEEE:GenericIdentityFn<number>  = identity3;
    const getValue6 = identityEEE(123)
    console.log(getValue6);

    //使用范型约束：
    const getValue7 = loggingIdentity('sdasadas')
    console.log(getValue7);

}
