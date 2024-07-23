---
title: 'Algorithm'
description: 'algorithm is for all programing languages, we can apply when being expert at one or many. It help us a lot while getting a complex situation.'
---

# 🍊 1. approaches:

## 🍊 1.1 complete search 

- iterative
- backtracking: examples sudoku solution 

## 🍊 1.2 divide and conquer 

- binary search 

## 🍊 1.3 greedy 

examples: Dijkstra, Prim

`greedy algorithm` is used for choosing current selection and then choose another best solution afterwards. They all depend on each other.


## 🍊 1.4 dynamic programing 

Examples: 0/1 Knapsack, Longest Increasing Subsequence

`dynamic programing`: almost all problems can be solved by recursive back tracking approach, but this method is slow and multiple calculations repeat all the time. In order to tackle this, we use `dynamic programming` to solve the problem.

# 🫐 2. graph  

Note that all vertices of a graph should have unique values. Because we only visit a vertex once and mark as visited. We can traverse a graph that has duplicated values, but as it's marked as visited so that BFS or DFS will skip the vertex.

There are three different ways to represent a graph: adjacency matrix, adjacency list, edge list. These are special and only suitable for all unique vertices. While in a **binary tree**, the struct of each node has left and right pointer. So we don't worry about using bfs or DFS to visit the same node on every step.

Type of a graph:

|           | un-direct | direct |
| --------- | --------- | ------ |
| no-weight | (1)       | (2)    |
| weighed   | (3)       | (4)    | 

Traverse a no weighted graph:

|              | BFS                    | DFS                      |
| ------------ | ---------------------- | ------------------------ |
| purpose      | traverse shortest path | traverse                 |
| DS           | queue                  | stack, recursion         |
| condition    | no weight              | no weight                |
| detect cycle | possible               | possible, recommended    |
| apps         | find shortest path     | exploring, detect cycles |
| time complex | $O(V+E)$               | $O(V+E)$                 | 

Traverse a weighted graph:

|              | Dijkstra             | Bellman-Ford              | Floyd-Warshall        |
| ------------ | -------------------- | ------------------------- | --------------------- |
| purpose      | shortest path from s | same as Dijkstra          | all shortest paths    |
| DS           | priority_queue       |                           |                       |
| condition    | + weight values      | +/- weights, no (-) cycle | same as BF            |
| apps         | AI, maps             | game, detect (-) cycle    | graph theory research |
| time complex | $O(V^2)$             | $O(V*E)$             | $O(V^3)$              |


## 🫐 bfs 

Traverse by using the concept of `queue`. The result is the shortest path (no weight on edges).

```cpp
void BFS(int s) {
  for (int i = 0; i < V; i++) {
    visited[i] = false;
    path[i] = -1;
  }

  queue<int> q;
  visited[s] = true;
  q.push(s);

  while (!q.empty()) {
    int u = q.front();
    q.pop();

    for (int i = 0; i < graph[u].size(); i++) {
      int v = graph[u][i];
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
        path[v] = u;
      }
    }
  }
}
```

## 🫐 dfs 

Traverse by using the concept of `stack`  or recursion (based on language stack).

- using `stack` ds: don't remember previous parent vertex, easily to break the loop.
- using recursion: know the previous vertex, hard to break the loop.

```cpp
void DFS(int s) {
  for (int i = 0; i < V; i++) {
    visited[i] = false;
    path[i] = -1;
  }

  visited[s] = true;
  stack<int> stk;
  stk.push(s);

  while (!stk.empty()) {
    int u = stk.top();
    stk.pop();

    for (int i = 0; i < graph[u].size(); i++) {
      int v = graph[u][i];
      if (!visited[v]) {
        visited[v] = true;
        path[v] = u;
        stk.push(v);
      }
    }
  }
}
```

```cpp
void DFSRecursion(int s) {
  visited[s] = true;

  for (int i = 0; i < graph[s].size(); i++) {
    int v = graph[s][i];
    if (!visited[v]) {
      path[v] = s;
      DFSRecursion(v);
    }
  }
}
```

## 🫐 Dijkstra

- Purpose: finding the shortest path during traverse from a starting point to all vertices.
- Condition: all edge weight values must be positive.

```cpp

```

## 🫐 Bellman-Ford

- Purpose: finding the shortest path during traverse from a starting point to all vertices.
- Condition: work with positive and negative edge weight values, but there is not negative cycle (e.g: sum of a triangle edges is lower than 0).

```cpp

```

## 🫐 Floyd-Warshall

- Purpose: finding the shortest path between *all pairs* of vertices in a graph. Using dynamic programming to archive this.
- Condition: same as Bellman-Ford.

```cpp

```

# 🍊 3. math 

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

# 🍏 4. string 

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

# 🍏 5. geometry 

- point
- line
- circle
- triangle
