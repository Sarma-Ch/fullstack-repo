function identity<T>(arg: T) {
  return arg;
}
const num = identity(2);
const str = identity("Asus Tuf F17");
const obj = identity({ id: 1, name: "DevOps" });
console.log(num);

const typeInf = identity<string>("Scuderia Ferrari");

function identityAny<T>(arg: T): any {
  return arg;
}
const any = identityAny("Sarma");
console.log(any.length);
console.log(any.toFixed);

// 2

function first<T>(arr: T[]): T | undefined {
  return arr[1];
}
const numArr: number[] = [1, 2, 3];
const firstNum = first(numArr);
if (firstNum !== undefined) {
  console.log(firstNum.toFixed(2));
}
const strArr = first(["s", "a", "m", "m"]);
console.log(strArr?.toUpperCase());

const mixed = first([1, "two"]);
console.log(mixed);

function lengthOf<T extends { length: number }>(x: T): number {
  return x.length;
}
const lenOfStr = lengthOf("sarma");
console.log(lenOfStr);

const arrLen = lengthOf([1, 2, 3, 4, 5, 7]);
console.log(arrLen);

// const numLen = lengthOf(5)
// console.log(numLen)                   // Error as arg of  type num cant have len property

// interface HasId {
//   id: number;
// }

// interface HasName {
//   name: number;
// }

// function lengthIs<T extends HasId & HasName>(x: T): string {
//   return `i have my ${x.id} and my name is ${x.name}`;
// }
// const user = { id: 2, name: "Spill" };
// console.log(lengthIs(user));

type ApiResponse<T = string> = { status: number; data: T };

const Api: ApiResponse = {
  status: 1,
  data: "this is done",
};
console.log(Api.status);

type ApiResponse1 = { status: number; data: unknown };
const Api1: ApiResponse1 = {
  status: 2,
  data: "THis is not yet done",
};
console.log(Api1.status);
console.log(Api1.data.toUpperCase("sarma"));
