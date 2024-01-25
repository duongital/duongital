có vẻ các ngôn ngữ (typescript, c++...) hay cách thiết kế của database (mysql, postgresql...) đều đang muốn ràng buộc vào lúc khởi tạo, điều này đang giúp mình trong quá compile hay runtime rào lại và quăng ra các lỗi có liên quan ⇒ từ đó giúp dev có thể suy nghĩ lại về logic do mình tạo ra là hợp lý hay không.

# creation

## factory method

không cần biết hàm đó được implement như thế nào, chỉ cần truyền param vào để được return như ý muốn

ví dụ: 

- khai báo interface để các factories implement, mục đích để bảo đảm các factory sinh ra nó gọi chung hàm giống tên: `interface Generate(String type) { String generate(type)  }`
- khởi tạo factory, ví dụ Nike: `class FactoryNike implement Generate {}`
- instance factory1: `var factory1 = new FactoryNike(); factory1.generate("ao_thun")`
- instance facotry2: `var factory2 = new FactoryAdidas(); factory2.generate("ao_thun")`

## abstract factory

là tầng cao hơn của factory method, dạng như có nhiều methods quá phải instance ra class riêng 

ví dụ: 

- khai báo interface King: `interface King { String getDescription()}`
- khai báo interface Army: `interface Army { String getDescription()}`
- khai báo interface Castle: `interface Castle { String getDescription()}`

- khai báo 3 class để implement 3 interface trên

- tạo interface lớn kiểu trả về là 3 interface trên (khác biệt với _factory method_ chỗ này)
```java
interface KingdomFactory {
  King createKing();
  Army createArmy();
  Castle createCastle();
}
```
- sau đó muốn tạo factory mới thì implement interface KindomFactory `class ElfKingdomFactory implements KingdomFactory {}`
- sau đó override lại 3 hàm createKing, createArmy và createCastle trả về 3 class tương ứng
- khi khởi tạo một quốc gia nào đó thì king, army hay castle được sinh ra từ factory method của kingdom đó

## builder

khởi tạo object đi theo từng bước rất nhỏ, hữu dụng khi hàm cần nhiều params để khởi tạo. vì có lúc chỉ gọi 2 params thôi thì không cần phải fill hết vd 100 params

## prototype

tạo thêm một hàm clone trong class đó để khi cần có thể copy lại

## singleton

lưu ý không dùng `new` vì object singleton không được tạo mới, chỉ tồn tại một object duy nhất
và dùng mãi mãi

---

# struct

## adapter

adapter nói về cấu trúc object, cảm giác khá giống như factory method và truyền nhiều params vào hơn so với factory method.

## bridge

## composite

dạng photoshop có nhiều layer, trên mỗi layer có vẻ một vài thứ

## decorator

## facade

có một tính năng nào đó dùng quá nhiều libraries, đồng thời thứ tự đi cũng rất quan trọng.

vậy ta nên tạo class facade để đóng gói tụi nó lại một chỗ. hàm main gọi class đó và xử lý. code nhìn đẹp hơn.

## flyweight

share RAM ra dùng chung thay vì mỗi object ôm mỗi RAM riêng để xử lý tác vụ chung đó thì sẽ mất tài nguyên nhiều, trong khi không phải lúc nào cũng đang dùng cái RAM đó.

## proxy

proxy như người vệ sĩ, biết hết thông tin của idol (lưu trong cache), khi có fans tụ tạp thì proxy đứng ra handle request, nếu biết thông tin thì proxy trả lời còn không thì redirect qua cho idol.


---

# behavior

## chain of responsibility

một chuỗi thứ tự các obj kiểm tra điều kiện và pass từ bước một, ví dụ: đối tượng bệnh nhân đi khám bệnh sẽ được đi qua các bước của đối tượng lần lượt theo thứ tự > tiếp tân > bác sĩ chẩn đoán > kê toa > thanh thoán, các bước này có thể khác nhau tuỳ vào đối tượng trước đó truyền param và cho bước kế tiếp là dành cho ai.

## command

bạn waiter nhận order từ khách. mang vào đưa cho bếp nấu rồi giao lại cho khách.

## iterator

object muốn traverse được thì implement cái pattern này.

## mediator

## memeto

## observer

có 2 class: subject và observer list. subject ôm tụi observer list trong người và khi nào có noti thì bắn gửi

## state

dạng trạng thái tổng. ở mỗi state nào đó thì có những hành vi dùng khác nhau.

## strategy

giống như state nhưng các obj khác hoàn toàn không biết trạng thái lẫn nhau

## template method

## visitor

this is content of visitor
