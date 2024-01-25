

# thoughts

- có vẻ các ngôn ngữ (typescript, c++...) hay cách thiết kế của database (mysql, postgresql...) đều đang muốn ràng buộc vào lúc khởi tạo, điều này đang giúp mình trong quá compile hay runtime rào lại và quăng ra các lỗi có liên quan ⇒ từ đó giúp dev có thể suy nghĩ lại về logic do mình tạo ra là hợp lý hay không.
- trong lúc code thời điểm ban đầu mình nên ràng buộc biến, hàm thành những constrains nhiều nhất có thể, việc này giúp run-time khi có lỗi thì mình sẽ dễ trace hơn
- các ngôn ngữ như rust, go... khi code xong build ra file bin cho các máy khác chạy thì phải chọn target-os và arch tương ứng. ví dụ như macos:arm, linux:x86... còn ngôn ngữ thông dịch như nodejs, python thì có core cài trong máy server xử lý rồi.

# tại sao người ta dùng `callstack` mà không phải `liststack`

bởi vì mình không dùng hết tính năng, rõ ràng đưa nhiều tính năng nghe có vẻ ok hơn nhưng bị vấn đề: 

- tốn tài nguyên khi dùng data structure lớn, 
- không thể khống chế được vì sức mạnh lớn (có bug sẽ khó truy tìm dấu vết) ⇒ vậy dùng stack sẽ dễ hiểu bản chấn vấn đề và an toàn hơn list

# generics chỉ là params

nghĩ đơn giản generic chỉ param truyền thêm vào để khống chế kiểu của biến dùng sau đó

# deamon là gì?

Có ba loại process trong Linux: **interactive, batch, daemon**

- Các interactive process sẽ chạy tương tác với người dùng tại giao diện dòng lệnh (chế độ all-text) như trên terminal ssh hoặc console.
- Batch process được gửi vào hàng đợi thực thi tiến trình trong tương lai theo lịch và không liên kết tương tác với các dòng lệnh. Loại tiến trình này phù hợp để chạy các tác vụ lặp lại nhiều lần khi sử dụng hệ thống ở mức thấp.
- Daemon được hệ thống xác định với bất kỳ process nào có process parent PID là 1, hay còn được gọi là process init. Init luôn là quá trình đầu tiên khởi động khi máy chủ khởi động và tồn tại trên máy chủ cho đến khi máy chủ tắt đi. Init chấp nhận bất kỳ process nào có parent process bị kill mà không cần quan tâm chờ trạng thái của child process. Vì vậy phương thức phổ biến để khởi chạy một daemon liên quan đến forking (tức là chia) một hoặc 2 và làm cho các process cũ, các parent process, grandparent process bị kill đi, trong khi các child (hoặc grandchild) process vẫn thực hiện các chức năng bình thường của nó.

