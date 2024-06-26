---
title: 'Python'
description: 'Cheatsheet on Python language'
---

() [] {} is simple way of writing tupple() list() or dict(), all are created from classes or data abstraction methology oop. even mylist[0] is originally written as getitem(mylist, 0).

# create virtual environment 

using current Python version

```bash
# create env at the current directory with name `venv` 
python3 -m venv venv 
# activate python 
source venv/bin/activate 
# exit venv 
deactivate
```

# built-in data types

Look like Python doesn't have primitive value, all come from classes. Default or built-in classes are defined in lower case.

Javascript also has wrapper class for: String, Number and Boolean. Same as Python, variables like: string, number, boolean are immutable and copied during passing as parameter. The difference is JS defined these as primitive data types while Python implemented as `class` under mutable or immutable ones. Summary as below:

**Immutable:**

1. **Integers (`int`)**: Immutable, meaning their values cannot be changed after creation.
2. **Floats (`float`)**: Immutable.
3. **Complex numbers (`complex`)**: Immutable.
4. **Booleans (`bool`)**: Immutable. They can only be `True` or `False`.
5. **Strings (`str`)**: Immutable. Once created, their values cannot be modified.
6. **Tuples (`tuple`)**: Immutable. Once created, elements cannot be modified, added, or removed.

**Mutable:**

1. **Lists (`list`)**: Mutable. Elements can be added, removed, or modified after creation.
2. **Dictionaries (`dict`)**: Mutable. Key-value pairs can be added, removed, or modified after creation.
3. **Sets (`set`)**: Mutable. Elements can be added or removed after creation. However, the set itself is mutable, but the elements within it must be immutable.

|                 | python built-in class              | javascript    |
| --------------- | ---------------------------------- | ------------- |
| Text Type:      | `str`                              | `string`      |
| Numeric Types:  | `int`, `float`, `complex`          | `number`      |
| Sequence Types: | `list`, `tuple`, `range`           | `Array`       |
| Mapping Type:   | `dict`                             | `Map`         |
| Set Types:      | `set`, `frozenset`                 | `Set`         |
| Boolean Type:   | `bool`                             | `boolean`     |
| Binary Types:   | `bytes`, `bytearray`, `memoryview` | `ArrayBuffer` |
| None Type:      | `NoneType`                         | `null`        |
|                 |                                    |               |

Check type:

```python
type(3) # class <int> (default types of system is in small cases)
type(int) # class <type> so built-in types might extends from class <type>

```

User defines class should be in uppercase.

What is `len`? Using `type(len)` we can see that this is a `<class 'builtin_function_or_method'>`. So:

- builtin: default by Python, no need to import
- function: `len(my_list)`
- method: `my_list.__len__()`

Similar to `len`  (_builtin function or method_) includes: max, min, abs, sorted, sum,  callable.

Short syntax:

```python
odds = [1, 3, 5, 7, 9]
[x + 1 for x in odds] # [4, 6, 8, 10]
[x for x in odds if x %% 5 == 0] # [1, 5]
```

Sequence type: list, range, string, flat tree, linked list... have sequence abstraction: 

```python
# membership
>>> 2 in digits
>>> 1234 not in digits

# slicing
>>> digits[0:2]
```

# boilerplate

```python
class Solution:
	def __init__(self):

	def __str__(self):
```

# data structures

## string

```python
b = "Hello, World!"  
print(b[2:5]) # llo
print(b[:5]) # slice from start
print(b[2:]) # slice to the end
print(a.strip()) # same as js trim()
print(a.replace("H", "J"))
print(a.split(",")) # returns ['Hello', ' World!']
```

python collections include: list, tuple, set, dictionary

## list

```python
# class `list` is used to create a new list
thislist = ["apple", "banana", "cherry"] # or using class list with constructor below
thislist = list(("apple", "banana", "cherry")) # note the double round-brackets
list1 = ["abc", 34, True, 40, "male"] # can be in different types

# loop through a list
for x in list1:  
  print(x)

# sort a number list
thislist = [100, 50, 65, 82, 23]  
thislist.sort()
thislist.sort(reverse = True)

# clone a list
clone = thislist.copy()

```

some useful methods: append, clear, copy, count, extends, index, insert, pop, remove, revers, sort

## tuple

tuple is immutable, to edit we should convert using `a = list(thistuple)`, remember to convert back after modification `b = tuple(a)`

```python
thistuple = ("apple", "banana", "cherry")  
print(thistuple)
print(thistuple[0]) # access apple
for x in thistuple:  
  print(x)
for i in range(len(thistuple)):  # loop with index
  print(thistuple[i])
del thistuple # remove out of memory
```

## set

```python
thisset = {"apple", "banana", "cherry"}
thisset.add("orange") # add more
thisset.remove("banana")
for x in thisset:  
  print(x)
del thisset
```

## dictionary

```python
thisdict = {  
  "brand": "Ford",  
  "model": "Mustang",  
  "year": 1964  
}
thisdict["year"] = 2018 # change value or year
print(thisdict["brand"])
print(len(thisdict))
thisdict.pop("model") # remove key and related value
mydict = thisdict.copy()
for x in thisdict:  
  print(thisdict[x])
for x in thisdict.values():  
  print(x)
for x in thisdict.keys():  
  print(x)
```

```python
# count the appearance of a string
dict = {}
for s in inputString:
	dict[s] = dict.get(s, 0) + 1
```

# math

```python
# built-in functions
x = min(5, 10, 25)  
y = max(5, 10, 25)
x = abs(-7.25)
x = pow(4, 3)

# from module
import math  
  
x = math.sqrt(64
x = math.ceil(1.4)  
y = math.floor(1.4
x = math.pi
```

# conditional, loop

Python doesn't implement `switch case`, in version 3.10 we have `match case`

```python
a = 33  
b = 200  
if b > a:  
  print("b is greater than a")

# for loop
fruits = ["apple", "banana", "cherry"]  
for x in fruits:  
  print(x)

# while loop
i = 1  
while i < 6:  
  print(i)  
  i += 1
```

# OOP

IPEA: Inheritance, Polymorphism, Encapsulation, Abstract

## Inheritance with class in parameter

```python
class Person:  
  def __init__(self, fname, lname):  
    self.firstname = fname  
    self.lastname = lname  
  
  def printname(self):  
    print(self.firstname, self.lastname)

# extends class Person
class Student(Person):  
  pass
```

## Polymorphism

can understand as many forms, for example `len()` can be used for string, tuple...

```python
class Vehicle:  
  def __init__(self, brand, model):  
    self.brand = brand  
    self.model = model  
  
  def move(self):  
    print("Move!")  
  
class Car(Vehicle):  
  pass  
  
class Boat(Vehicle):  
  def move(self):  
    print("Sail!")  
  
class Plane(Vehicle):  
  def move(self):  
    print("Fly!")  
  
car1 = Car("Ford", "Mustang") #Create a Car object  
boat1 = Boat("Ibiza", "Touring 20") #Create a Boat object  
plane1 = Plane("Boeing", "747") #Create a Plane object  
  
for x in (car1, boat1, plane1):
  x.move()
```

## Encapsulation with `__`

double underscore would represent a private attribute.

```python
class Base:
	def __init__(self):
		self.a = "GeeksforGeeks"
		self.__c = "Private C" # instance can't access this

	def print_private(self):
		print("hello private", self.__c) # instance can use this
```

## Abstract with `@`

```python
import abc

class Boat(abc.ABC):
    @abc.abstractmethod
    def swim(self):
        pass
```

- The `Boat` class is inheriting from `abc.ABC`, indicating that it's intended to be an abstract class.
- The `swim` method inside the `Boat` class is marked as an abstract method using the `@abc.abstractmethod` decorator. This means that any subclass of `Boat` must provide an implementation for the `swim` method.

