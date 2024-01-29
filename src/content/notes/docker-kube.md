---
title: 'Devops Topics'
description: 'Mostly use Docker and Kubernetes'
---

# open ubuntu in terminal

- pull ubuntu image: `docker pull ubuntu`
- ssh to the terminal: `docker run -it ubuntu bash`
- install packages: `apt update`
- build BTN application `docker build -t duongital/btn:1.0.0 . --platform linux/amd64`
- run BTN application `docker run -p 3001:3000 -d duongital/btn:1.0.0`

# docker note

- list all images: `docker images`
- list all containers: `docker ps`
- build image from current directory: `docker build -t <your username>/node-web-app .` 

docker dùng để tạo môi trường chỉ 1 app, muốn tạo nhiều app thì dùng docker-compose được sinh ra từ `docker-compose.yml`. vậy có phải docker-compose dùng cho việc làm tắt của của docker

sau khi chạy các app từ docker thì nó sẽ expose ra một port riêng, thường phải mở port này bên AWS mà bên digital ocean nó mở sẵn. Cái này thường dùng để test thôi chứ lên môi trường user thật thì phải dấu nó để, con engine chính sẽ dùng proxy ví dụ như nginx để forward cái port từ 80 (http) hoặc 443 (https) về cái post nội bộ bên trong container (cái này mình đang đoán vậy thôi chứ không biết chắc là thực tế người ta có dùng proxy nginx ở một server khác hay không)

Nghiên cứu thêm: gắn domain + ssl cho digital ocean droplet

## lệnh hay dùng 

- `docker run -p 49160:8080 -d <your username>/node-web-app` run node-web-app from docker port 8080 and expose to [localhost](http://localhost) with port 49160
- tag docker image:`docker tag getting-started YOUR-USER-NAME/getting-started`
- push to docker hub:`docker push YOUR-USER-NAME/getting-started`

```plaintext
test docker on digital ocean (sqlite loss data?)

http://134.209.98.77:1337/admin/auth/login  
duongital@gmail.com  
Zhe\*B8V3NfJE#V
```

## sample code

Dockerfile >> Image >> Container

```bash
# Sample of Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

```bash
# Sample of .dockerignore
node_modules
npm-debug.log
```

after compose the Dockerfile run `docker build -t <your username>/node-web-app .` >> create Image

to run image to container `docker run -p 49160:8080 -d <your username>/node-web-app`


aws is a cloud provider, help us to deloy and distribute content on the internet

serveral services:

- EC2: this is engine with private and public ports, suitalbe for Linux hosting server
- S3: save static files as images, videos
- Route53: handle and manage domains
- Cloutfonrt: CDN

# ec2 for the first time

- create an instance on micro with available disk at 1Gb
- during process >> create .pem file and saved to localdisk
    - macos: ssh normally with this file
    - windows 10: use wsl and `sudo` admin right to ssh 
- install nvm to manage nodejs
- install nginx to proxy_pass
    - note: ssh to private ip, but nginx setup for public ip (server_name 13.250.41.93;)
    - not touch `nginx.conf`, and default file in `sites-available`
- install pm2 to manage jobs

