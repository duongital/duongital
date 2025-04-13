---
title: 'Sercurity'
description: 'So you wana hack'
---

## What’s the difference between Hash, Encrypt, and Encode?

- **Hashing**: Like turning your name into a secret code that you can’t turn back. Great for passwords.
- **Encryption**: Like locking a message in a treasure chest with a key. Only someone with the key can open it.
- **Encoding**: Like turning a picture into LEGO blocks so a computer can understand it. It's for reading, not hiding.

## Can we guess what a hash says?

Maybe! You can try millions of guesses until you get the same hash. But it’s really, really hard if it’s done right.

## What is Symmetric vs Asymmetric encryption?

- **Symmetric**: One key to lock and unlock. Like sharing a padlock key with a friend.
- **Asymmetric**: One key to lock (public), another to unlock (private). Like sending someone a locked box only they can open.

## What’s Fast Hash vs Slow Hash?

- **Fast Hash**: Quick! Used for checking files.
- **Slow Hash**: Takes more time on purpose. Used for passwords to make it harder to crack.

## Why do we use Encode?

To turn things (like songs, videos, or words) into 1s and 0s that computers can understand and send.

## What’s a perfect hash?

A hash that never has two things with the same result — no “collisions.” Super rare!

## What’s load factor in hashing?

It’s like how full a bookshelf is. If it’s too full, we get a bigger shelf (rehashing).

## What is SSL/TLS?

It's how your computer talks secretly with websites. It’s like shaking hands with secret codes so no one can listen in.

Steps:

1. Your computer says "hello"
2. Website replies with "hello" and its ID card
3. You check the ID card
4. You send a secret (locked with the site’s key)
5. Both sides make a new secret code to talk
6. Now you’re safe to chat!

## What is a CA (Certificate Authority)?

It’s like a teacher who says “Yes, this ID card is real.” Your computer trusts what the teacher says.

## What is a digital signature?

It’s like a secret stamp that proves “I really wrote this!”

## What is HMAC?

It’s a stamp + lock combo that checks if the message was changed or faked.

## How to store passwords and secret stuff safely?

- **Passwords**: Hash them — no need to know the real ones.
- **Secrets like keys**: Encrypt them and hide the key in a safe place.

## What’s a DDoS and how do we stop it?

A DDoS is like a huge crowd all shouting at your door so you can't hear real people.

To stop it:

- Block noisy IP addresses
- Let only a few requests in at a time (rate limit)
- Use special guards (firewalls or CDNs) to help watch the gate.
