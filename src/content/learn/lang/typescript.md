https://github.com/type-challenges/type-challenges
https://github.com/microsoft/TypeScript/wiki/Performance
https://effectivetypescript.com/
https://www.typescriptlang.org/docs/handbook/intro.html

# K in keyof T

là lặp từng phần tử key của object T trả về K

# K extends keyof T

là union các keys của object T

# general knowledge

to check type with typescript 

## generic to remove undefined key

```typescript
// 1. List all undefined field names
// 2. Omit those fields

type ValuesOf<T> = T[keyof T];

type ListUndefines<T> = ValuesOf<{
    [k in keyof T]: T[k] extends undefined ? k : never;
}>

type ResultFinal<T> = Omit<T, ListUndefines<T>>;

function removeUndefined<T>(objectA: T): ResultFinal<T> {
  return Object.entries(objectA).reduce(
    (acc, [key, val]) => ({
      ...acc,
      ...(val !== undefined && val !== null ? { [key]: val } : null),
    }),
    {} as ResultFinal<T>
  );
}

const justin = {
  name: 'Justin',
  id: 12,
  money: undefined,
  sixPack: undefined,
  abc: undefined,
};

type Test = ListUndefines<typeof justin>;

const parsedJustin = removeUndefined(justin);
```

## declare

thường được dùng để khai báo kiểu trong file .d.ts, hoặc khi compiler ts bị lỗi không compiler được vì thiếu kiểu trong một thư viện js nào đó. Kinh nghiệm bản thân là khai báo kiểu dùng `type` sẽ tốt hơn là dùng declare.

## union type vs enum type

type UnionFoo = -1 | 0 | 1

type union thường được dùng để check kiểu cho key, enum dành cho type

enum EnumBar = {
  Error: -1,
  Pending: 0,
  Success: 1
}

thường được dùng chọn kiểu cho value, nếu không cần dùng value thì chỉ cần để Error Pending hoặc Success là được.

## merge 2 objects

```typescript
function mergeObject<A, B>(a: A, b: B) {
  return {
    ...a,
    ...b,
  }
}
```

## never vs unknown

khuyến khích dùng __unknown__ để có giá trị khi ép kiểu trong tương lai

never là không có kiểu

## utils types

`ReturnType` : get type of return of the function

## union types

let a = 'string' | 'number'

## this is simple ts

- learn how to write ts file
- inspect code 
- enhance
- typescript tạo kiểu thì nên dùng type (đơn giản dễ kết hợp), còn interface dùng cho các trường hợp mà có kiểu thiết kế OOP dùng để implement sau này cho đúng cấu trúc

## notes

- compile to javascript code
- abstract class can't be instanced, abstract methods no need to have body
- interface can be a variable or method 😥
- when implement that interface, we must orveride all that methods
- use typescript to check permission [link](https://spin.atomicobject.com/2021/04/26/modeling-permissions-types-typescript/)

## type

all example goes here: [link](../ref/type.ts)


## intersect hai kiểu lại với nhau

```typescript
type A = {
  color: string;
};

type B = A & {
  canCode: boolean;
};

let merge: B = {
  color: "red",
  canCode: true,
};
```

## tạo kiểu từ các kiểu khác và bỏ vào key của object

```typescript
type D = [string, boolean];

type E = {
  one: A;
  two: D;
};

let composition: E = {
  one: { color: "red" },
  two: ["ok", false],
};
```

1. note one

  - list 1
  - list 2
  - list 3

2. note two

- list 4
- list 5

