---
path: "/google-index-trang-web-nhu-the-sao"
date: 2022-08-16T17:12:33.962Z
title: "Google index trang web như thế sao"
---

Khi làm một trang web với mục tiêu lên top tìm kiếm thì mình sẽ bắt đầu tập trung vào phần SEO. Lúc trước mình cũng quan tâm lắm, gần đây mọi người nhờ làm web giùm có hay yêu cầu thì mình cũng nghĩ tới phần này nhiều hơn.

Bắt đầu với cái blog @duongital của mình build bằng Gastby version 2. Khi bắt đầu search `site:duongital.com` thì mình thấy nó trả đủ kết quả index trong result của google. Mình mới nghĩ nó auto hỗ trợ bởi thư viện và Gatsby có thì Nextjs cũng có.

Xong từ đó quay qua dùng Nextjs cho các khách hàng gần nhất.

Một tháng, rồi hai tháng sau khi map domain mua từ `matbao` về `vercel` thì mọi thứ chạy trơn tru, chỉ có cái là cái web `youngerist.vn` của mình vẫn không có một bất cứ update từ google index ngoại trừ trang chủ. Mình thấy lạ và bắt đầu thử các cách sau:

- Dùng công cụ Lighthouse check trong Chrome để phân tích SEO, kết quả thấp và đạt cỡ chừng 85 điểm. Mà chắc không phải do nó, nhiêu đó điểm cũng đủ lên index rồi chứ!
- Có phải do tên miền từ deploy host của vercel không ăn index, ví dụ: `abc.vercel.app`. Sau tìm hiểu thì Vercel nó tự động response no index cho các trang của nó, vậy mình phải map từ domain riêng của mình vậy nên có lẽ mình không bị rơi vào lỗi này.
- Hay do trang mình đang thiếu `robots.txt` và `sitemap.xml`, nhiều người bảo không cần. Mà đúng là như vậy vì cái trang @duongital của mình đâu có đâu. Gatsby build ra không hề có con robots nào trong đó cũng như sitemap. Mà nghĩ chắc thôi gắn thử, mình bắt đầu làm cho Youngerist.

Thời điểm viết bài là ngày 16 tháng 8 (Aug 16).

### Hai ngày sau (Aug 18):

Mình dùng một auto tool để generate robot và sitemap, lúc này thấy trong public folder có đầy đủ thông tin cần thiết, sau đó chỉnh route53 lại bằng cách thêm thẻ `txt` để cài đặt google search console (GSC), GSC báo là lỗi redirect gì ta? Mình tạm để đó và manually upload sitemap, và manuall update tay một route trong trang.

### Ba ngày sau (Aug 19):

Đã thấy kết quả trang upload tay, nhưng như vậy là thủ công vì sau này mỗi lần thêm trang phải làm vậy thì không tốt lắm, mình tiếp tục chờ từ kết quả update indexs từ sitemap.

### Sep 3:

Mình nhận nhiều email của gmail báo redirect, kiểm tra lại thì thấy toàn bộ setup www đang redirect vô domain. Sửa lại toàn bộ domain gốc là chính, và cách sub domain www sẽ redirect vào domain chính.

Tiếp tục chờ...
