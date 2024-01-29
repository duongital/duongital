---
title: 'Common Web Servers'
description: 'Using nginx or Apache as a web server'
---

- check if everything setup ok: `sudo nginx -t`
- restart: `sudo systemctl restart nginx`

# nginx 

- should change default config in folder `/etc/nginx/sites-available/default`
- if this is aws machine ec2: remember to change `server_name` to public ip
- change default root to local `root /home/duongital/public_html;`

## macos

install: `brew install nginx`
where is it running `which nginx`
check config file and running ok: `nginx -t`

start nginx in background: `brew services start nginx`
stop nginx `brew services stop nginx`
update config file and reload `brew services reload nginx`

config react router with nginx: location / { try_files $uri $uri/ /index.html; }

## linux

installation on ubuntu: `sudo apt install nginx`
config file location: `/etc/nginx/nginx.conf`
default serve folder: `/usr/share/nginx/html`

`$ sudo systemctl enable nginx`
`$ sudo systemctl start nginx`
`$ sudo systemctl restart nginx`
`$ sudo systemctl stop nginx`
`$ sudo systemctl reload nginx`
`$ sudo systemctl status nginx`

### install on AWS EC2

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

lưu ý mở sercurity group anywhere cho HTTP v4 và HTTP v6 tại port 80

cd `/etc/nginx/sites-available`

### steps to point a domain to server ip, then handled by `nginx`

install nginx: `sudo apt update & sudo apt install nginx`
allow ssh http and https: 
    - `sudo ufw allow 'Nginx HTTP'`
    - `sudo ufw allow 'Nginx HTTPS'`
    - `sudo ufw allow 'OpenSSH'`
check if everything ok: `sudo ufw status`

create folder: `sudo mkdir -p /var/www/admin.duong-khanh.com/html`
create file: `sudo nano /var/www/admin.duong-khanh.com/html/index.html`
create some html:
```HTML
<html>
    <head>
        <title>Welcome to admin.duong-khanh.com!</title>
    </head>
    <body>
        <h1>Success!  The admin.duong-khanh.com server block is working!</h1>
    </body>
</html>
```

server this static content: `sudo nano /etc/nginx/sites-available/admin.duong-khanh.com`
content is below:
```bash
server {
    listen 80;
    listen [::]:80;

    root /var/www/youngeristcollagen.com/html;
    index index.html index.htm index.nginx-debian.html;

    server_name youngeristcollagen.com www.youngeristcollagen.com;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

**important** enable the file by creating a link from it to the sites-enabled directory, which Nginx reads from during startup:
`sudo ln -s /etc/nginx/sites-available/admin.duong-khanh.com /etc/nginx/sites-enabled/`
`sudo ln -s /etc/nginx/sites-available/youngeristcollagen.com /etc/nginx/sites-enabled/`



### SSL on NGINX

ref: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

bước 1: tạo tên miền config simple như sau

```bash
server {
    listen 80;
    listen [::]:80;

    root /var/www/youngeristcollagen.com/html;
    index index.html index.htm index.nginx-debian.html;

    server_name youngeristcollagen.com www.youngeristcollagen.com;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

bước 2: link site qua sites-enabled ``sudo ln -s /etc/nginx/sites-available/youngeristcollagen.com /etc/nginx/sites-enabled/`

bước 3: chạy bot generate certificate

sudo certbot --nginx -d example.com -d www.example.com
sudo certbot --nginx -d youngeristcollagen.com -d www.youngeristcollagen.com

bước 4: proxy pass `proxy_pass http://127.0.0.1:8090;`

```nginx
server {

        root /var/www/admin.duong-khanh.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name admin.duong-khanh.com;

        location / {
                proxy_set_header Connection '';
                proxy_http_version 1.1;
                proxy_read_timeout 360s;

                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                proxy_pass http://127.0.0.1:8090;
        }

        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/admin.duong-khanh.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/admin.duong-khanh.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = admin.duong-khanh.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name admin.duong-khanh.com;
    return 404; # managed by Certbot


}
```


bước 5:

- check if everything setup ok: `sudo nginx -t`
- restart: `sudo systemctl restart nginx`

🪲 dry run bị lỗi

### config for react router

config react router with nginx: location / { try_files $uri $uri/ /index.html; }

### proxy pass port localhost:3000/ to port localhost:8080/todo

2022-02-11: shouldn't change file `/etc/nginx/nginx.conf`, change file `default` in folder `/ect/nginx/sites-available`

```conf
http {
    server {
        listen 80;
        server_name 13.250.41.93; // direct to public ip 

        root /home/ubuntu/public_html; 

        location / {
                index index.html index.html;
        }

        location /todo {
                proxy_pass http://0.0.0.0:3000;
                include /etc/nginx/proxy_params;
        }
    }
}

```

---

server {

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;
    server_name www.youngeristcollagen.com youngeristcollagen.com; # managed by Certbot


        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }


    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/youngeristcollagen.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/youngeristcollagen.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot



}
server {
    if ($host = www.youngeristcollagen.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = youngeristcollagen.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
    server_name www.youngeristcollagen.com youngeristcollagen.com;
    return 404; # managed by Certbot
}


apache is famous for web server, it can be used to serve a website or load balancing or even a proxy pass to localhost with a port. All functions can be same with nginx.


# apache

- install: `sudo apt install apache2`
- install firewall to control ports: `sudo ufw allow 'Apache'`
- default config file: /etc/apache2/sites-available/000-default.conf
- default folder serve:

```bash
<Directory "/home/duongital/public_html">
	DirectoryIndex index.html
	AllowOverride All
	Require all granted
</Directory>
```

## config for react router create-react-app

set access to specific folder:

```bash
<VirtualHost *:80>
	<Directory /var/www/html>
	    Options Indexes FollowSymLinks MultiViews
	    AllowOverride All
	    Require all granted
	</Directory>

. . .
</VirtualHost>
```

run rewrite mode: `sudo a2enmod rewrite`

add this config to public folder (src code)

```bash
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

