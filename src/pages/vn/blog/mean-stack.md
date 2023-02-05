---
layout: "../../../layouts/BlogPostVi.astro"
title: "MEAN Stacks"
description: "Tạo ứng dụng từ MEAN stack và build lên AWS"
pubDate: "Jul 12 2020"
heroImage: "/blog-cover.jpg"
---

Tạo ứng dụng từ MEAN stack và build lên AWS

Cuối tuần này có thời gian mình tạo một ứng dụng hello world nhỏ dùng MEAN stack và sau đó build lên AWS chơi. Viết lại vài dòng để sau này quên lục coi lại các bước. Vậy nên bài đọc mang tính chất khám phá.

App rất đơn giản với chức năng thêm đọc xóa sửa (CRUD) như hình:

![sample app](/blog/mean-stack/img_01.jpg)

Bắt đầu nào…

Link github bookapp: [https://github.com/duongital/mean1-app-book](https://github.com/duongital/mean1-app-book)

Cùng nhìn vào cây thư mục, phần backend mình dùng nodejs để xử lý các request, thư viện hỗ trợ là expressjs. Phần frontend mình dùng angularjs (phiên bản đầu) để bind data và xử lý phần view.

cấu trúc thư mục của dự án:

![code structure](/blog/mean-stack/img_02.jpg)

Thời điểm hiện tại viết bài đã có Angular 6, React 16 và Vue sắp ra phiên bản thứ 3. Mình vẫn chọn angular1 là tại vì nó đơn giản, chỉ cần hiểu một chút về javascript là bắt đầu được rồi. Đa phần các thư viện về sau sử dụng ES6 syntax và các lib hỗ trợ như Babel (convert files cho các browsers cũ đọc) hay webpack (dồn cách chạy của các files js vào một). Thú thật biết vậy thôi chứ mình chưa đi vào tìm hiểu sâu vào 3 đại gia lớn này, mới nhìn sơ vào docs của Vue thấy có vẻ dễ vô hơn hết.

Lúc code xong mình định dùng Heroku để build lên vì thấy nó hỗ trợ Docker. Sau đó mình viết một file compose là Dockerfile dùng để tạo file ảnh image, từ file ảnh này Docker dùng để tạo ra một container chứa nodejs và các files tĩnh. Theo mình hiểu thì con cá voi Docker này sẽ phải chở thêm một container nữa là mongodb để hoàn thiện app. Khi có 2 files images mình sẽ instance nó ra thành 2 containers, từ đó dùng docker để start tụi nó theo port mà mình mong muốn. Mình đã tạo xong Dockerfile cho nodejs, trong link github có sẵn mở ra tham khảo, trong đó code ghi kiểu dạng như là nó build lên các bước như thế nào… Làm xong mình tính build lên heroku thì code bị vướng chỗ không có container mongodb lên trước thì nó không start được. Mình tiếp tục viết thêm một file Dockerfile cho mongodb và build lên heroku thì mò mãi không được, gục ngã, đổi qua tìm hiểu AWS.

**Tìm hiểu sau:** theo mình hiểu mỗi lần ghi “heroku create” thì nó tạo con server cho mình dùng, nhưng không hiểu sao lúc push:web lên thì nó lại bị lỗi.

Có lần đọc đâu đó bài viết thì được biết là Heroku cũng build dựa trên các máy chủ của AWS, thôi lỡ rồi thì mò tới thằng gốc luôn. Bị cái nó tốn tiền mà kệ chắc mình sẽ không dùng quá free-tier mỗi tháng của AWS.

các mục miễn phí mỗi tháng của AWS:

![aws free tier](/blog/mean-stack/img_03.jpg)

Sau khi tạo account xong vào phần billing mình sẽ thấy dung lượng mỗi tháng mà AWS cho miễn phí EC2 là 30Gb, mà hình như con t2-micro mới được. Sau đó mình vô phần EC2 để tạo một con server ubutu-server-16.04 để tiến hành build app. Theo mình hiểu thì 30Gb đây đại diện cho dung lượng mà request bắt nó chạy, vd cài nodejs hay npm và tổng lượt request từ phía client cộng lại (không biết đúng không, confirm sau).

Lúc tạo instance, AWS có bắt tạo file .pem lưu vào local sau đó mã hóa file này lại. Để log-in vô con server này mình làm theo hướng dẫn cụ thể của theo public DNS. Mặc định windows10 không có CLI sử dụng SSH nên mình thoát ra sử dụng ubuntu (máy mình có cài ubuntu17.08 để cho giống nó).

giao diện lúc đăng nhập vào máy server

![login interface](/blog/mean-stack/img_04.jpg)

Đây là giao diện lúc mình đăng nhập thành công vào con server từ AWS, muốn thoát nó thì gõ “exit”. Mình nghĩ có khi nào clone project từ github bỏ vô đây xong dùng “npm start” nó chạy luôn không. Mình bắt đầu lên trang w3schools tạo một file đơn giản mở port 8080 để nodejs server trả về chữ “Hello, World”. Mình tạo file bằng cách “touch hello.js” và sửa file bằng “vim”, sau đó gõ “node hello.js” thì thấy mất con trỏ vậy là server bắt đầu lắng nghe. Mình vào link public DNS thì không thấy response gì, tìm hiểu trên mạng thì tụi nó chỉ mở port 8080 (trong file hello đã định nghĩa) trong phần sercurity group ở máy instance EC2. Lưu ý chỉ nên mở port này cho IP máy của mình thôi, để tránh cả thế giới vào

Lúc này mình thêm :8080 vào đuôi link public DNS thì thấy có response “Hello, World” thật. Wow, vậy là mình lập luận tiếp, mở thêm một port nữa cho MongoDB trên một máy này chắc có thể được nên không cần instance thứ 2. Sau đó mình bắt đầu cài nodejs, npm và mongodb trên máy server. Clone github dự án hoàn tất trước đó và mở “npm install” để cài đặt các thư viện js cần thiết.

Lúc này coi như mọi thứ đã xong và mình bắt đầu start các servers. Mình bắt đầu gõ “mongod –path…” thì thấy lỗi, tìm hiểu thì mới biết nó khác windows, chỉ cần gõ mongo là lên được port 27017. Mình không nhất thiết phải mở thêm port này ngoài sercurity group vì lúc trong server thì tụi nó tự gọi nhau được. Sau đó mình bị đứng trỏ, không gọi thêm server nodejs được, tìm hiểu thì mọi người chỉ cho dùng pm2 để xử lý cpu process. Nó sẽ giúp mình giữ trỏ và start bao nhiêu server tùy thích. Và muốn coi log của server nào thì dùng lệnh của nó để vô trong coi. Nó có lệnh coi logs all servers, nhìn màn hình mình chạy lúc đó khá ảo

giao diện lúc gọi pm2

![m2 interface](/blog/mean-stack/img_05.jpg)

Mình có chỉnh lại port trang chủ là 6060, và thế là ra link public DNS :6060 app đã sử dụng được rồi!

### Một số bugs cần hoàn thiện:

- Chưa xử lý async, dùng postman gọi API trả về nội dung không thân thiện, vì data mong muốn chưa đổi xong đã trả về. Lúc tìm hiểu thì bên UI mọi người dùng $q, nghe nói thằng này được truyền cảm hứng cho API Promise() trong ES6. Còn trong nodejs thì xử lý async trước đó người ta dùng gì mình không biết, đang học Promise() đọc mấy lần mà áp vô không ra gì
- Bấm edit cuốn sách này xong lưu lại, rồi edit cuốn sách khác thì server chết. Muốn dùng phải F5 liên tục.
- Server mongodb phải start trước nếu không nodejs không lên được, chắc do mình chưa try catch tốt.

### Một số hướng đi tiếp:

- Cần port điều hướng là nginx hoặc apache, vì nodejs làm không tốt nhiệm vụ này (sercurity, load balance…). Từ localhost nó sẽ trỏ đến 5000 hoặc 27017.
- Thêm chức năng đăng nhập cho mỗi thành viên quản lý sách. Lúc này build sẽ khó hơn rất vì có sercurity cho user gọi request.

Link github bookapp: [https://github.com/duongital/mean1-app-book](https://github.com/duongital/mean1-app-book)