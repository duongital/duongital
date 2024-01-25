---
title: 'Simple backend with PocketBase'
description: 'Just focus with Frontend then we have everything with Backend API available'
pubDate: 'May 14 2023'
---

Having a running server on AWS or DigitalOcean, SSH to the server and doing following:

- download latest PocketBase zip file from [PocketBase](https://pocketbase.io/docs/)
- install unzip app to extract the zip file `sudo apt install unzip`
- unzip the file `unzip pocketbase_folder`
- install nginx and config default file in `/etc/nginx/sites-available`

```conf
http {
    server {
        ...
        server_name 13.250.41.93; // your IP server address
        location / {
                proxy_pass http://0.0.0.0:8090; // expose PocketBase port
        }
    }
}
```

- we now forwarding all request from port 80 to port 8090 that PocketBase will run on the server
- next step is to use `systemctl` to start PocketBase service, to create a new service, create a `*.servce` file in folder `/lib/systemd/system`, example:

```
[Unit]
Description=pocketbase

[Service]
ExecStart=/root/pocketbase/pocketbase serve

[Install]
WantedBy=multi-user.target
```

- now we start pocket base service `sudo systemctl start pocketbase.service`
- go back to public IP address and check if PocketBase is running

<img width="1415" alt="image" src="https://github.com/duongital/duongital/assets/5635533/4480556a-5934-4e78-bdbf-bd5608a217bb">

Congratulations! We now can start with Frontend project and not worrying much about: authentication, data persistent, realtime api...
