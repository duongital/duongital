---
title: 'Design Patterns in Programming'
description: 'Some design patterns in OOP languages: Java, C#...'
---

# **object oriented programming**

## oop - creation

### factory method

- khai báo interface để các factories implement, mục đích để bảo đảm các factory sinh ra nó gọi chung hàm giống tên: `interface Generate(String type) { String generate(type)  }`
- khởi tạo factory, ví dụ Nike: `class FactoryNike implement Generate {}`
- instance factory1: `var factory1 = new FactoryNike(); factory1.generate("ao_thun")`
- instance facotry2: `var factory2 = new FactoryAdidas(); factory2.generate("ao_thun")`

### abstract factory


```java
interface KingdomFactory {
  King createKing();
  Army createArmy();
  Castle createCastle();
}
```


### builder



### prototype



### singleton


## oop - struct

### adapter


### bridge

### composite


### decorator

### facade


### flyweight


### proxy


## oop - behavior

### chain of responsibility

### command


### iterator

### mediator

### memeto

### observer

### state

### strategy

### template method

### visitor

# **functional programming**

## functional - closure

## functional - currying
