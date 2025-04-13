---
title: 'Networking'
description: 'Servers are talking to each other'
---

## How do computers start talking (TCP connection)?

Imagine you want to talk to a friend. First, you wave (SYN), your friend waves back (SYN-ACK), then you say "okay!" (ACK). That’s called a 3-way handshake. Now you both know it’s time to talk.

## Why 3 handshakes and not just 2?

Because 2 only lets one person talk. With 3, both of you can talk and listen — like a real conversation.

## What does SYN and ACK mean?

- **SYN** = "Hi, I want to talk"
- **ACK** = "I got your message"

## Why do we use random numbers?

They help keep track of who said what, in what order. It’s like numbering pages in a letter so they don’t get mixed up.

## What if the last handshake is lost?

The server waits a bit. If nothing happens, it gives up. Like if you wave and no one answers.

## What happens if something breaks in the message?

There’s a math check (checksum). If it looks wrong, the computer throws it away and waits for a better message.

## What if a message gets lost?

TCP is smart. If no one replies, it guesses the road is jammed and slows down to avoid traffic.

## How does TCP say goodbye?

Four steps: One says goodbye, the other says okay. Then the second says goodbye, and the first says okay. Now the chat ends.

## What if one computer crashes?

The other side waits, then gives up. Like calling someone and they never pick up.

## TCP vs UDP – what’s the difference?

- **TCP**: Makes sure every message arrives in the right order. Great for emails, websites.
- **UDP**: Faster, doesn’t check. Good for games or video calls.

## What’s "Ping"?

Ping is like yelling "Are you there?" to another computer. If it hears you, it yells back. The "TTL" is like how many people it can go through before giving up.

## What is HTTP?

HTTP is how your browser talks to websites. You send a request like "I want this picture", and the site sends it back.

## Is HTTP forgetful?

Yes! Each message is treated like it’s the first time. That’s called **stateless**.

## What is a cookie?

A cookie is a small note a website gives your browser to remember you.

## Can someone steal your cookie?

Yes, if the cookie isn’t protected. That’s why we use flags like **HttpOnly**.

## What is a session?

The server keeps a short memory of you (like a tab). It knows you're still visiting and links your actions together.

## What is JWT?

It’s like a signed note from the server that proves you’re allowed to be here. Safer than plain cookies.

## What kind of stuff can HTTP send?

Anything: pictures, songs, videos, documents...

## What is REST?

It’s a set of rules to build web APIs. REST makes sure websites talk to each other clearly and simply.

## What is AJAX?

AJAX lets websites talk to the server in the background so you don’t see a page reload.

## What is HTTPS?

It’s HTTP but with a secret code (encryption), so no one else can read what you’re sending.

## What happens when you type google.com?

1. Computer finds the IP address of google.com (like its home address)
2. It checks if it should use HTTPS
3. It connects to Google
4. It asks for the page
5. Google sends back the page
6. Browser shows it to you

## What is DNS?

DNS is like a phone book. It tells your computer the IP address for a name like google.com.

## Why does DNS use UDP?

It’s fast and messages are small. But if too big, it uses TCP instead.

## What is a socket?

A socket is like a phone line between two computers.

## Can many people talk to the same server?

Yes! They each use their own socket with different port numbers.

## What is a proxy or VPN?

- **Proxy**: Hides your identity.
- **Reverse Proxy**: Hides the server.
- **VPN**: Creates a secret tunnel to another place.

## What is a load balancer?

It’s like a traffic cop that sends people to different servers so no one gets too busy.

## What is a buffer?

A small storage area that helps things move smoother, like holding water in a bottle before pouring.

## What is a router?

A device that helps send messages to the right place in your home or to the internet.

## MAC vs IP in your home?

Inside your home, computers use **MAC addresses** — like house numbers on the same street.

## What is a switch?

A smart device that sends data only where it needs to go. A hub sends it everywhere.
