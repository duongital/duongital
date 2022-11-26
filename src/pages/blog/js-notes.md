---
layout: "../../layouts/BlogPost.astro"
title: "Note linh tinh về JS"
description: "vì hàm không có hoisting, không bị trùng lặp do khai báo lại và bind được this vô trong hàm"
pubDate: "Apr 12 2021"
heroImage: "/blog-cover.png"
---

khi khai báo _vòng lặp_ thì lưu ý trong _mở ngoặc đóng ngoặc_ thì biến i:

- `var` thì sống ra ngoài for scope {} => sử dụng i như access var out of scope (closure), nhưng ko ngoài **parent scope**
- `let` thì sống trong scope {} => sử dụng i như local block scope

đối với function scope thì mọi biến đều sống trong function scope, nếu khai bằng var thì cũng không chạy ra ngoài được, khi debug we will see that there's scope name of function, out side of function scope that function to become variable of outer scope

# tại sao người ta hay khai báo hàm bằng const và arrow function?

vì hàm không có hoisting, không bị trùng lặp do khai báo lại và bind được this vô trong hàm

# phân biệt require và import?

nodejs không hỗ trợ `import` `export` của ES module, vì vậy khi dùng nodejs lưu ý load thư viện bằng `require`, sắp tới nodejs sẽ support ES module và hiện tại đang cho thử nghiệm bằng cờ gì đó

tuy nhiên khi dùng webpack thì webpack đã hỗ trợ toàn bộ ES6 syntax by default, để hỗ trợ phiên bản gần nhất thì vẫn nên dùng babel-loader ⇒ vậy khi lập trình front-end nếu có bundle bằng webpack thì ta có thể thoải mái dùng `import` vì webpack đã lo rồi.

khi `require` một module nào đó thì đó là singleton chứ không phải là instance, nếu gán a và b là 2 biến giữ module thì xem như a b đang trỏ tới module đó mà thôi.

# hidden class và inline caching là gì?

`hidden class` trong js các object được sinh ra mô phỏng theo json nên có props và methods có thể được thay đổi dynamic. chính vì điều đó quá trình sinh ra object sẽ tốn kém tài nguyên hơn java hay c# vậy nên core v8 thực hiện một `hidden class` để mô phỏng quá trình sinh ra object từ hidden class này để code chạy được nhanh hơn.

lưu ý thứ tự các props và methods nếu khác nhau thì cũng có hidden class khác nhau, vì vậy để tối ưu việc sử dụng lại code thì cần có thứ tự giống nhau

`inline caching`: khi 2 hoặc nhiều class cùng share một `hiden class` thì để tối ưu cho methods được gọi lặp đi lặp lại, thay vì đi vào hidden class để tìm kiếm thì cơ chế `inline caching` sẽ giúp việc này thực thi được nhanh hơn bằng cách cache hàm đó tạm ở đâu đó.

# closure

khi viết hàm A mà bên trong hàm A đó có một hàm B hoặc C, lúc này B hoặc C dùng biến ở hàm A thì trong scope sẽ sinh ra closure scope để giữ biến trong hàm A lại.

tại sao phải cần như vậy, vì một lý do nào đó thì hàm A có thể biến mất (out of scope) thì các biến trong nó sẽ mất đi, lúc này closure giữ biến đó lại cho hàm B, C dùng sau này

# formik không expose hàm handleChange ra cho mình dùng

formik không expose hàm handleChange ra cho mình dùng, mà nó tự định nghĩa trong thư viện và đồng thời handleChange để đổi các input value. Tạm thời có thể thấy dùng được object `initialValues` với các keys binding trong các element của form với 2 interfaces là `onSubmit` và `validate`. `errors` `touched` và `values` là 3 objects đặc biệt:

- errors: Boolean ⇒ giữ flag đúng hoặc sai của lỗi
- touched: Boolean ⇒ check xem người dùng đã từng điền hay chưa
- values: String ⇒ giữ giá trị của input đó

# thunk withExtraArgument

thunk withExtraArgument: bình thường add thunk middleware vào redux thì chỉ có 2 argument là dispatch và getState, để add thêm argument thứ 3 thì phải dùng thunk.withExtraArgument (thường là api) để khi dispatch action thì mình có thể truyền được 3 params dùng. Lúc này việc call api trong các files action sẽ gọn hơn một chút.

# tại sao GTM hay fb pixel dùng cookies lưu dữ liệu người dùng?

tại sao GTM, Pixel... hoặc các service trên mạng hay dùng Cookies để identify người dùng, **bởi vì Client của mình nó không khống chế hoặc edit code được**, do vậy khi gọi api bên đó nó buộc phải set cookies vào browser và handle các cookies đó. Còn sessionStorage hoặc localStorage là do mình tự quyết định. Vậy nên giữ `token` ở localStorage hay cookies? ⇒ nên giữ ở cookies để server api tự add và gỡ ra cho an toàn (các thứ liên quan đến bảo mật). Còn session thì giữ mấy cái id để tracking, localStorage giữ mấy cái như theme hoặc lang.

Here is why we should use cookie to save token over localStorage: [link](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)