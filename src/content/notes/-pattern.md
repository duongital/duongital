---
title: 'Design Patterns in Programming'
description: 'Some design patterns in OOP languages: Java, C++... and functional ones: Javascript, Python...'
---

# **functional programming**

## closure

A closure is when a function "remembers" variables from outside its own scope. It lets inner functions access variables from an outer function even after the outer one has finished running.

```python
def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    return inner

counter = outer()
print(counter())  # 1
print(counter())  # 2
```

## currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking one argument.

```python
def add(a):
    def inner(b):
        return a + b
    return inner

add5 = add(5)
print(add5(3))  # 8
```

# **object oriented programming**

## oop - creation

### factory method

```python
class Generator:
    def generate(self, type):
        pass

class FactoryNike(Generator):
    def generate(self, type):
        return f"Nike {type}"

factory1 = FactoryNike()
print(factory1.generate("ao_thun"))
```

### abstract factory

```python
class KingdomFactory:
    def create_king(self): pass
    def create_army(self): pass
    def create_castle(self): pass
```

### builder

```python
class Burger:
    def __init__(self):
        self.bread = None
        self.meat = None

class BurgerBuilder:
    def __init__(self):
        self.burger = Burger()

    def set_bread(self, bread):
        self.burger.bread = bread
        return self

    def set_meat(self, meat):
        self.burger.meat = meat
        return self

    def build(self):
        return self.burger
```

### prototype

```python
import copy

class Sheep:
    def clone(self):
        return copy.deepcopy(self)
```

### singleton

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
```

## oop - struct

### adapter

```python
class OldPrinter:
    def print_old(self):
        print("Old Printer")

class PrinterAdapter:
    def __init__(self):
        self.old_printer = OldPrinter()

    def print(self):
        self.old_printer.print_old()
```

### bridge

```python
class DrawAPI:
    def draw_circle(self):
        pass

class RedCircle(DrawAPI):
    def draw_circle(self):
        print("Red Circle")

class Circle:
    def __init__(self, draw_api):
        self.draw_api = draw_api

    def draw(self):
        self.draw_api.draw_circle()
```

### composite

Treats individual objects and groups of objects the same way.

```python
class Component:
    def operation(self):
        pass

class Leaf(Component):
    def __init__(self, name):
        self.name = name

    def operation(self):
        print(f"Leaf: {self.name}")

class Composite(Component):
    def __init__(self, name):
        self.name = name
        self.children = []

    def add(self, component):
        self.children.append(component)

    def operation(self):
        print(f"Composite: {self.name}")
        for child in self.children:
            child.operation()

# Usage
leaf1 = Leaf("A")
leaf2 = Leaf("B")
tree = Composite("Root")
tree.add(leaf1)
tree.add(leaf2)

sub_tree = Composite("Sub")
sub_tree.add(Leaf("C"))
tree.add(sub_tree)

tree.operation()
```

### decorator

Adds behavior to objects at runtime without changing their class.

### facade

Simplifies access to a large system by providing a unified interface.

### flyweight

Minimizes memory usage by sharing data between similar objects.

### proxy

Controls access to an object, adding a layer like logging or validation.

## oop - behavior

### chain of responsibility

Passes request along a chain of handlers.

### command

Encapsulates a request as an object.

### iterator

Provides a way to access elements of a collection without exposing the underlying structure.

### mediator

Centralizes complex communication between objects.

### memento

Captures and restores an object’s state.

### observer

Notifies dependents when an object changes.

### state

Lets an object alter its behavior when its state changes.

### strategy

Lets a class change its behavior at runtime.

### template method

Defines the skeleton of an algorithm and lets subclasses override steps.

### visitor

Lets you add new operations to existing object structures.
