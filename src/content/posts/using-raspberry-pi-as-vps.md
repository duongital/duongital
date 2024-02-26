---
title: 'Using Raspberry Pi 4 as VPS'
description: 'Simpe setup to getting started with Raspberry Pi'
pubDate: 'Feb 26 2024'
---

Client -> Cloudflare Tunnels -> NGINX -> PocketBase, PostgreSQL...

Raspberry Pi OS using Debian, to check CPU arch using: `lscpu`

Install `cloudflared` CLI tool:

```bash
wget https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.tgz
sudo chmod +x ./cloudflared
./cloudfalred -v
```

Create a tunnel:

```bash
./cloudflared tunnel create terminal
```

Create a config file `nvim ~/.cloudflared/config.yml` with content:

```yml
tunnel: 823626d1-0b16-49c5-9d09-b34c86266409 #from tunnel id created
credentials-file: /home/duongital/.cloudflared/823626d1-0b16-49c5-9d09-b34c86266409.json

ingress:
  - hostname: http.caybaobap.com
    service: http://localhost:80
  - hostname: ssh.caybaobap.com
    service: ssh://localhost:22
  - service: http_status:404
```

HTTP is public but SSH should be protected using Application, we do that later.

Then we need to config DNS for the domain by adding CNAME:

```bash
./cloudflared tunnel route dns 823626d1-0b16-49c5-9d09-b34c86266409 http.caybaobap.com
```

![cname added](./attachments/20240226-cname.png)
*check on dashboard to have CNAME or not*

Test the tunnel by running `./cloudflared tunnel run terminal`, the we can visit the domain to see if http response correctly.

Install the service to `systemd`: 

```bash
sudo ./cloudflared --config ~/.cloudflared/config.yml
# remember this action will create another config file located in /etc/cloudflared/config.yml, we need to change it for next restart
sudo nvim /etc/cloudflared/config.yml
sudo nvim /etc/systemd/system/cloudflared.service # change root file
```

Now we need to protect SSH on port 22 by using Application, with the `beta` feature to render on browser we can connect to Raspberry Pi anywhere (even mobile).

![application creation](./attachments/20240226-application.png)
*create an application to protect ssh*

![enable ssh browser](./attachments/20240226-enable-ssh-browser.png)
*keep all default settings but remember to enable Browser rendering*

So now every time we visit ssh.caybaobap.com, it will verify if you are the person in Policy and send 6 digits to the email.

Future ideas:

- Monitoring Raspberry Pi with Grafana
- Expose PostgreSQL service, maybe: sql.caybaobap.com
- Mount an micro SSD 1T to save or upload files (UI web to view Gallery)

