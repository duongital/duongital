> Don’t be the person who “never quite understood” something like recursion.

# Composing Programs with Python

In programming, we deal with two kinds of elements: 

1. functions and 
2. data. 

Informally, data is stuff that we want to manipulate, and functions describe the rules for manipulating the data. Thus, any powerful programming language should be able to describe primitive data and primitive functions, as well as have some methods for combining and abstracting both functions and data.

## building abstraction with functions

elements of a programming include:

- expression: >>> 1 + 1 
- call expression: >>> max(1, 2)
- import a library: >>> from math import sqrt
- name or variable: >>> a = 100
- nested expression: >>> sub(pow(2, add(1, 10)), pow(2, 5)). 

default value on a parameter:

```py
def pressure(v, t, n = 6.022e33):
    k = 1.38e-23
    return n * k * t / v
```
this part also includes: conditional statememnts, iteration and testing topics.

Higher-order functions in Python are functions that meet one or more of the following criteria:

- Allow other functions to be passed to it as parameters.
- Can send back other functions as a result.
- Create new functions within its body.

Currying is a part of HOF technique by using function as result. For example: f(x, y) => f(x)g(y). This is useful for creating a function with initial values for later usage.

Lambda function or an anonymous function is to define a function without a name. For example: >>> a = lambda x: x * 2

HOF is also a technique for decorator.

Recusive function: remember forward cases and backward cases.

## building abstractions with data

Every value in Python has a class determines what type of value it is. >>> type(1)

Data abstraction is similar to functional abstraction, when creating a function, the details can be suppressed and can be replaced by any other function with the same behavior. It isolates how a compound data is used from the details of how it is constructed (linked list, set, map...).

Sequences is a data type can be interable: list, string, tree, linked list.

Mutable Data is a data that we can't change. While immutable data such as number is immutable. Mutable data for example: list

OOP includes AEIP (abstract, encapsulation, inheritant, polymophism). Every object also has a type, called its class.

Implmenting Classes and Objects can be implemented without using `class` keyword.

Object abstraction???

Efficency is for performance.

Recursive Objects are objects that call ifself in one or several nodes.

## interpreting computer programs

tbc

## data processing

tbc