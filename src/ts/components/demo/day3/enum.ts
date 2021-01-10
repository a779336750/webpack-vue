/**
 * 数字枚举
 */
enum Dir {
    down,
    up,
}
/**
 * 数字枚举
 */
enum Person {
    leftHand= 'left',
    rightHand= 'right',
}

function testEnum(arg: Person): string {
    return arg
}
export default function () {
    console.log(Dir.down);
    console.log(Person.leftHand);
    console.log(testEnum(Person.leftHand));
}
