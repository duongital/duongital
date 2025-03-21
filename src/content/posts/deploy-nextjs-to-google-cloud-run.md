---
title: 'Deploy a NextJS application to Google Cloud Run'
description: 'Simple setup to manually deploy a NextJS app without using Vercel or Netlify'
pubDate: 'Mar 21 2025'
---

NextJS brings a number of features building on top of ReactJS, we can implement a full-stack application by using React Server Component. But deploying a NextJS app is not easy, and normally I would choose Vercel or Netlify proviers to simplify the process.

I have just joined an intersting project and I find that devops team here manually deploy it to Google Cloud Run (GCR) and I want to try this solution from scratch with supporting AI models for the steps. 😄

These are Google Cloud services that I used:

- Google Cloud Run: to deploy Docker image to serverless.
- VPC Network: IP addresses to create static IP and mapping to a domain
- Network Services: Load balancing to point the traffic to GCR
- Cloud Build: to connect with Github repository for Continuous Deployment (CD)

OK, let's go!

# 1. Google Cloud Run + Cloud Build

After finish implementing your NextJS application, we need to create a Dockerfile. Below is a very simple of it:

Example of Dockerfile: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

Then visit GCR dashboard and we need to create a new service, choose the middle option to integrate with Github repository. With this option, we can use Cloud Build automatically on every push on `main` branch.

![create a GCR service](./attachments/gcr-create-gcr-service.png)

After deploying a Docker container successfully, we will have a URL like this: https://youngerist-5470084010.us-central1.run.app. We can use that if it's public by the setting. As the time I write this, there is a beta feature to map a domain but it's not recommended and we need to use VPC Networks and Network Services.

# 2. VPC Network + Network Services

These two services with the target is to mapping a real domain to the URL that GCR generated.

By using IP addresses of the VPC Network service, we can have a static IP as below:

![create a static IP address](./attachments/gcr-vpc-network.png)

And then we can config the DNS, for example I used Cloudflare:

![DNS config](./attachments/grc-dns-config.png)

The last step is to create a new balancer to connect static IP and Cloud Run application. We can use Network Services:

![load balancer](./attachments/gcr-load-balancer.png)

After this step, we can visit the domain and it will go directly to the Google Cloud Run service. Because this is a serverless service so we don't worry about how to scale or how much we must pay per month.

But as we are using other network services, it costs about 20$ per month and I find that it's quite expensive for a hobby service.

# Conclusion

- Deploy a Docker container to Google Cloud Run is a good idea without using other network services.
- There are serveral network services using serverless technique and might worth to research later on.
- Google Cloud Run is quite good with available dashboard: metric, log, trace, SLOs... Comparing to Vercel or Netlify, we must pay to see and reverse logs.
