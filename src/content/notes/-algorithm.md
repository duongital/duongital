---
title: 'Algorithm'
description: 'algorithm is for all programing languages, we can apply when being expert at one or many. It help us a lot while getting a complex situation.'
---

# 1. approaches:

## 1.1 complete search 🍊

- iterative
- backtracking: examples sudoku solution 

## 1.2 divide and conquer 🍊

- binary search 

## 1.3 greedy 🍊

examples: Dijkstra, Prim

`greedy algorithm` is used for choosing current selection and then choose another best solution afterwards. They all depend on each other.


## 1.4 dynamic programing 🍊

Examples: 0/1 Knapsack, Longest Increasing Subsequence

`dynamic programing`: almost all problems can be solved by recursive back tracking approach, but this method is slow and multiple calculations repeat all the time. In order to tackle this, we use `dynamic programming` to solve the problem.

# 2. graph 🫐 

Note that all vertices of a graph should have unique values. Because we only visit a vertex once and mark as visited. We can traverse a graph that has duplicated values, but as it's marked as visited so that bfs or dfs will skip the vertex.

There are three different ways to represent a graph: adjacency matrix, adjacency list, edge list. These are special and only suitable for all unique vertices. While in a **binary tree**, the struct of each node has left and right pointer. So we don't worry about using bfs or dfs to visit the same node on every step.

## bfs 

Using the concept of `queue` to traverse.

## dfs 

Using the concept of `stack`  or recursion (based on language stack) to traverse.

- using `stack` ds: don't remember previous parent vertex, easily to break the loop.
- using recursion: know the previous vertex, hard to break the loop.


# 3. math 🍊

```cpp
#include <cmath>

cout << max(5, 10);
cout << sqrt(64);  
cout << round(2.6);  
cout << log(2);
```

- fibonacci
- prime number
- greatest common divisor

# 4. string 🍏

- pattern matching
- processing skills

```cpp
string greeting = "Hello";
cout << "The length of the greeting string is: " << greeting.length();
cout << myString[0];  // H
cout << myString.at(0);  // H

string firstName = "John ";  
string lastName = "Doe";  
string fullName = firstName + lastName;  
cout << fullName;

string firstName = "John ";  
string lastName = "Doe";  
string fullName = firstName.append(lastName);  
cout << fullName;
```

# 5. geometry 🍏

- point
- line
- circle
- triangle
