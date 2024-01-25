operating system

- list all ports are running `sudo lsof -iTCP -sTCP:LISTEN -n -P`
- kill a port is running `kill -9 PID`
- copy all content in folder: `cp -r ./dist/* ~/public_apache`
- list all `service --status-all`
- start `sudo systemctl start nginx`
- stop `sudo systemctl stop nginx`

## cài đặt Pocketbase

- get binary under zip file: `wget https://github.com/pocketbase/pocketbase/releases/download/v0.7.9/pocketbase_0.7.9_linux_amd64.zip`
- install unzip: `sudo apt install unzip` then unzip the downloaded zip file

## linux file system and its feature

![file system](./attachments/20240125-file-system.png)

## systemd

saved all running services that every restart engine will be recovered

to create a new service, create a `*.servce` file in folder `/lib/systemd/system`, example: 

```
[Unit]
Description=pocketbase

[Service]
ExecStart=/root/pocketbase/pocketbase serve

[Install]
WantedBy=multi-user.target
```

common usages:

- list all running services: `systemctl | grep running`
- reload all deamon: `sudo systemctl daemon-reload`
- start a service: `sudo systemctl start your-service.service`
- enable to run service on every reboot: `sudo systemctl enable example.service`

note: systemctl is a sub command of systemd

## how to install themes in ubuntu desktop

step 1: install tweak to control themes `sudo apt install gnome-tweaks`

step 2: install `sudo apt install gnome-shell-extensions` to load local themes downloaded from the internet, to be created folders: ./themes and ./icons and then save to those locations.

structure of a theme:

- GTK: là phần giao diện giống như body của tab, alert...
- Icon: là các biểu tượng 
- GNOME shell: là top bar...

## how to install C C++

install essential tools: `sudo apt install build-essential`

---

## linux notes

CPU, RAM, Devices >> 3 loại này chạy được là nhờ vào `kernel` (ví dụ: ubuntu, windows, macos).Ở đây mình tập trung vào ubuntu đang dùng linux kernel, mình nghĩ linux là kernel gốc và ubuntu lấy nó để phát triển làm os của mình kết hợp với một số tính năng khác như giao diện GNOME... Ubuntu và MacOS đi ra từ linux và freeBSD, hai đứa và freeBSD thì đi ra từ UNIX.

Khi máy chạy sẽ có các tiến trình (process) bắt buộc gọi là Deamon, còn muốn app tự chạy theo thì dùng app systemd. Một process sẽ có một hoặc nhiều threads, các biến đọc được giữa các threads thì để trong global. Một process chạy sẽ có stack trace và CPU, RAM, Devices tương ứng. Được expose ra thành PID.

Việc các process nói chuyện với nhau (ngay cả khác máy mà dùng internet) thì được gọi là IPC (Interprocess Communication), IPC gồm 3 methods chính là: communication, synchornization, signal. Đọc docs ta hay thấy POSIX IPC và SystemV IPC vì đây là hai dạng implementation tương ứng với nhau khi mà BSD với SystemV tách ra làm hai hướng phát triển của UNIX

`socket` là một method nằm trong IPC communication dùng để truyền dữ liệu trong máy hoặc giữa nhiều máy với nhau. 
Ví dụ kết nối internet: tầng app ⇒ tầng transport ⇒ tầng internet ⇒ tầng link 
_TƯƠNG ỨNG_ CÓ http ⇒ tcp ⇒ ip ⇒ wi-fi (router). Thông thường cho web còn khi server kết nối với db như postgresql thì gọi thẳng từ tần transport là TCP/IP luôn.


# window

hello window 11