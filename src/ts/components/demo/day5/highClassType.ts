function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        // if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        // }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
       console.log('sssss');
    }
}

/**
 * 简单的联合类型
 * @param value
 * @param padding
 */
function padLeft(value: string, padding: number | string) {
    // if (typeof padding === "number") {
    //     return Array(padding + 1).join(" ") + value;
    // }
    // if (typeof padding === "string") {
    //     return padding + value;
    // }
    // throw new Error(`Expected string or number, got '${padding}'.`);

    // 原始类型的typeOf类型保护
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}


class Bird {
    fly() {

    }
    layEggs() {

    }
}
class Fish {
    swim() {

    }
    layEggs() {

    }
}
function getSmallPet(type: string): Fish | Bird {
   if (type === 'bird') {
       return new Bird()
   }else {
       return new Fish()
   }
}

/**
 * 自定义类型保护
 * @param pet
 */
function isFish(pet: Fish | Bird):pet is Fish {
    return (<Fish>pet).swim !== undefined
}

function f(x:number, y?:number) {
    return x+(y||0)
}
export default function () {
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    var n = jim.name;
    console.log(n);
    jim.log();
    console.log(padLeft("Hello world", 'sadsada'));

    // 只能访问此联合类型的所有类型里共有的成员。
    const pet = getSmallPet('bird');
    pet.layEggs()

    if(isFish(pet)) {
        pet.swim()
    }
    f(1)

}
