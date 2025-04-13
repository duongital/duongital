---
title: 'Operating System'
description: 'Normally using Ubuntu, Windows and MacOS'
---

## What is an operating system?

It’s like the boss of your computer. It tells everything what to do — apps, files, memory, and hardware.

## What is a process and a thread?

A process is like an app. A thread is a little helper inside the app. Threads help do many things at once.

## What happens when your computer runs more than one thing?

The OS switches between them really fast — like juggling. It saves their place so it can come back later.

## What is multitasking?

Running many apps (processes) at the same time. Some use multiple helpers (threads) to work faster.

## Why do some apps wait?

They are waiting for something (like a file or input). While waiting, others can run.

## What is a thread pool?

A box of helpers (threads) ready to do jobs. You don’t make new helpers every time — you reuse them.

## Can two apps share memory?

Normally, no. Each app has its own space. But they can share special memory or send messages.

## What is a child process?

It’s like when an app makes a mini version of itself to do a small job.

## What is Copy-On-Write (COW)?

When two apps share the same thing but don’t really copy it unless one tries to change it.

## What is deadlock?

When two apps are both holding something and waiting for the other to let go. Like two kids both holding a toy saying “you first.”

## What is virtual memory?

Pretend memory. The computer uses the hard drive to act like it has more RAM than it really does.

## What is paging?

Breaking memory into small boxes (pages). The OS moves them in and out of real RAM as needed.

## What is heap and stack?

- Stack: for short-term stuff like function calls.
- Heap: for long-term stuff you create yourself.

## What is stack overflow?

It’s when too much stuff is put on the stack. Like too many plates on a small tower.

## What is garbage collection?

It’s like a cleanup robot that removes unused stuff from memory.

## What is a pointer?

It’s like a sign that says “the thing you want is over there.”

## Where are global variables stored?

In a special part of memory just for them.

## Why is everything a file in Linux?

Because it makes everything easier to manage: files, devices, even internet connections.

## What is a file descriptor?

It’s a number that helps the OS know what file or device you’re using.

## What happens if two apps use the same file?

They might mess each other up if not careful. They need to take turns or use locks.

## What is a system call?

It’s how an app asks the OS to do something — like open a file or send a message.

## What is user space and kernel space?

- User space: where apps run
- Kernel space: where the OS runs (only trusted code allowed)

## What is caching?

Saving data in a fast spot (memory) so it doesn’t have to be found again.

## What is LRU cache?

"Least Recently Used" — it forgets the old stuff you haven’t used in a while when it gets full.

## What is cache stampede?

Too many apps ask for the same thing at once before it’s cached. It can overload the system.

## What is a race condition?

When two helpers change something at the same time and it causes problems.

## What is a mutex or lock?

A lock says, “Only one helper can touch this thing at a time.”

## What’s the difference between concurrency and parallelism?

- Concurrency: taking turns super fast (like one toy but many kids)
- Parallelism: doing things at the same time (many kids, many toys)

## What happens when you call a function?

New info is added to the stack. When it returns, it’s removed.

## Why don’t we use heap for everything?

Stack is faster and auto-cleans. Heap needs more work to manage.

## What if memory is full?

Your app or system might slow down or crash. Some apps might get killed.

## What is the OS scheduler?

It decides who gets to use the CPU next — like a teacher calling on students.

## What is the kernel?

It’s the core part of the OS that talks to the hardware and controls everything else.

## What is input/output (I/O)?

It’s how the computer talks to the outside world — keyboard, screen, files...

## How does your keyboard talk to the computer?

It sends signals (tiny messages) through a driver that the OS understands.
