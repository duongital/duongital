---
layout: '../../layouts/BlogPost.astro'
title: 'Javascript Snippets'
description: 'Some thoughts about JS code'
pubDate: 'Jan 24 2024'
---

<!-- ![javascript meme](attachments/test.png) -->
![javascript meme](attachments/demo.png)

# general knowledge

- all javascript based on objects, everything is object
- should use typescript to check type
- monkey patching: the way to override a function and revert it back to normal
- add astro google analytics: https://www.kevinzunigacuellar.com/blog/google-analytics-in-astro/

## name export vs default export

- name export: all functions or objects exported in that module will be import under `{}` to deconstruct those functions or objects and then use them.
- default export: one function only, shouldn't have a name >> to be imported with any name in other files, for example: `import anyname from './export.js'` and then `anyname()`
-

## prototype vs **proto**

prototype nằm trong class, còn **proto** nằm trong instance

## class là sugar syntax cho việc viết prototype object oriented

```javascript
function Student(name) {
  this.name = name;
}

Student.prototype.hello = () => console.log(`hello ${this.name}`);

// we can re-write like this:
class Student {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`hello ${this.name}`);
  }
}
```

về cơ bản mọi thứ trong js có thể hiểu là object và cách thiết kế code hướng hàm như Lua

## block scope và function scope

### sample code

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

khi khai báo _vòng lặp_ thì lưu ý trong _mở ngoặc đóng ngoặc_ thì biến i:

- `var` thì sống ra ngoài for scope {} => sử dụng i như access var out of scope (closure), nhưng ko ngoài **parent scope**
- `let` thì sống trong scope {} => sử dụng i như local block scope

đối với function scope thì mọi biến đều sống trong function scope, nếu khai bằng var thì cũng không chạy ra ngoài được, khi debug we will see that there's scope name of function, out side of function scope that function to become variable of outer scope

## tại sao khai báo biến bằng `var` log biến trước được, còn `let` với `const` thì không?

`let` và `const` không có hoisting vậy nên lúc log ra trước sẽ bị lỗi undefined

## tại sao người ta hay khai báo hàm bằng const và arrow function?

vì hàm không có hoisting, không bị trùng lặp do khai báo lại và bind được this vô trong hàm

## phân biệt require và import?

nodejs không hỗ trợ `import` `export` của ES module, vì vậy khi dùng nodejs lưu ý load thư viện bằng `require`, sắp tới nodejs sẽ support ES module và hiện tại đang cho thử nghiệm bằng cờ gì đó

tuy nhiên khi dùng webpack thì webpack đã hỗ trợ toàn bộ ES6 syntax by default, để hỗ trợ phiên bản gần nhất thì vẫn nên dùng babel-loader ⇒ vậy khi lập trình front-end nếu có bundle bằng webpack thì ta có thể thoải mái dùng `import` vì webpack đã lo rồi.

khi `require` một module nào đó thì đó là singleton chứ không phải là instance, nếu gán a và b là 2 biến giữ module thì xem như a b đang trỏ tới module đó mà thôi.

## hidden class và inline caching là gì?

`hidden class` trong js các object được sinh ra mô phỏng theo json nên có props và methods có thể được thay đổi dynamic. chính vì điều đó quá trình sinh ra object sẽ tốn kém tài nguyên hơn java hay c# vậy nên core v8 thực hiện một `hidden class` để mô phỏng quá trình sinh ra object từ hidden class này để code chạy được nhanh hơn.

lưu ý thứ tự các props và methods nếu khác nhau thì cũng có hidden class khác nhau, vì vậy để tối ưu việc sử dụng lại code thì cần có thứ tự giống nhau

### sample code

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
var p1 = new Point(1, 2);
p1.a = 5;
p1.b = 6;
var p2 = new Point(3, 4);
p2.b = 7;
p2.a = 8;
```

`inline caching`: khi 2 hoặc nhiều class cùng share một `hiden class` thì để tối ưu cho methods được gọi lặp đi lặp lại, thay vì đi vào hidden class để tìm kiếm thì cơ chế `inline caching` sẽ giúp việc này thực thi được nhanh hơn bằng cách cache hàm đó tạm ở đâu đó.

## để gọi nhiều hàm liên tục sau khi gọi một lần rồi thì cứ return về `this` trong mỗi hàm đó là được.

### sample code

```javascript
class Animal {
  constructor(legs) {
    this.legs = legs;
  }

  go() {
    console.log("go go");
    return this;
  }

  eat() {
    console.log("eat eat");
    return this;
  }

  add(value) {
    this.legs += value;
    return this;
  }

  subtract(value) {
    this.legs -= value;
    return this;
  }

  showLegs() {
    console.log(this.legs);
  }
}

let a = new Animal(4);
a.go().eat();
a.eat().go();
a.add(3).subtract(1);

a.showLegs();
```

cách sau được viết bằng `function` và dùng `prototype`

```javascript
function Animal(legs) {
  this.legs = legs;
}

Animal.prototype.go = function () {
  console.log("go go");
  return this;
};

Animal.prototype.eat = function () {
  console.log("eat eat");
  return this;
};

Animal.prototype.add = function (value) {
  this.legs += value;
  return this;
};

Animal.prototype.log = function () {
  console.log(this.legs);
};

const a = new Animal(2);
a.log();

a.add(2).eat().go();
a.log();
```

## snowpack vs. webpack

- snowpack cố gắng convert npm package thành ESM và lấy những file liên quan của package đó nằm trong folder pkg phần build (unbundled deployment) ⇒ việc làm như vậy giúp tối ưu performance của HMR. Về hình ảnh mình có thể trỏ đến dùng src như dev web thông thường, k giống như webpack là phải import hình vào rồi kiếm loader cho file name đó.

## what is currying in JS (has inner code sample)

- currying: sử dụng HOC (đã return nhiều lần, chỉ còn execute một lần cuối) làm param cho một function. Tại sao phải làm như vậy? ⇒ vì mình muốn code đẹp và dễ nhìn hơn, mình muốn getName, getId một lần rồi và sau đó dùng hàm này làm callback lần cuối.

### sample code

- code:

  ```javascript
  const get = (key) => (object) => object[key];
  const getName = get("name");
  const getId = get("id");
  nameList.map(getName); // or: otherNameList.map(getName)
  nameList.map(getId); // or: anotherNameList.map(getId)
  ```

## formik không expose hàm handleChange ra cho mình dùng

formik không expose hàm handleChange ra cho mình dùng, mà nó tự định nghĩa trong thư viện và đồng thời handleChange để đổi các input value. Tạm thời có thể thấy dùng được object `initialValues` với các keys binding trong các element của form với 2 interfaces là `onSubmit` và `validate`. `errors` `touched` và `values` là 3 objects đặc biệt:

- errors: Boolean ⇒ giữ flag đúng hoặc sai của lỗi
- touched: Boolean ⇒ check xem người dùng đã từng điền hay chưa
- values: String ⇒ giữ giá trị của input đó

## thunk withExtraArgument

thunk withExtraArgument: bình thường add thunk middleware vào redux thì chỉ có 2 argument là dispatch và getState, để add thêm argument thứ 3 thì phải dùng thunk.withExtraArgument (thường là api) để khi dispatch action thì mình có thể truyền được 3 params dùng. Lúc này việc call api trong các files action sẽ gọn hơn một chút.

sau này thunk được dùng trong redux toolkit khác đi một chút, mọi thứ được gọi là slice. action và reducer naming cũng được rút gọn, mọi thứ được diễn tả ở trong một file slice duy nhất.

## tại sao GTM hay fb pixel dùng cookies lưu dữ liệu người dùng?

- tại sao GTM, Pixel... hoặc các service trên mạng hay dùng Cookies để identify người dùng, **bởi vì Client của mình nó không khống chế hoặc edit code được**, do vậy khi gọi api bên đó nó buộc phải set cookies vào browser và handle các cookies đó. Còn sessionStorage hoặc localStorage là do mình tự quyết định. Vậy nên giữ `token` ở localStorage hay cookies? ⇒ nên giữ ở cookies để server api tự add và gỡ ra cho an toàn (các thứ liên quan đến bảo mật). Còn session thì giữ mấy cái id để tracking, localStorage giữ mấy cái như theme hoặc lang.
- Here is why we should use cookie to save token over localStorage: [link](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)

## closure

khi viết hàm A mà bên trong hàm A đó có một hàm B hoặc C, lúc này B hoặc C dùng biến ở hàm A thì trong scope sẽ sinh ra closure scope để giữ biến trong hàm A lại.

tại sao phải cần như vậy, vì một lý do nào đó thì hàm A có thể biến mất (out of scope) thì các biến trong nó sẽ mất đi, lúc này closure giữ biến đó lại cho hàm B, C dùng sau này

### sample code

```javascript
{
  let c = 111;
  function main() {
    let a = 100;
    let b = 2;

    function call() {
      let x = 1001;
      a += 10;
      a += 10;
      a += 10;
      console.log(a);

      function inner() {
        a += 10;
        a += 10;
        a += 10;
        x += 1;
        console.log(a);
        console.log(x);
      }
      inner();
    }
    console.log(b);
    console.log(c);
    call();
  }

  main();
}
```

---
