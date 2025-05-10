---
title: 'Algorithm'
description: 'algorithm is for all programing languages, we can apply when being expert at one or many. It help us a lot while getting a complex situation.'
---

> 🍏: easy, 🫐:medium, 🍊: hard

# 🍊 1. approaches:

## 1.1 complete search

- iterative
- backtracking: examples sudoku solution

## 1.2 divide and conquer

- binary search

## 1.3 greedy

examples: Dijkstra, Prim

`greedy algorithm` is used for choosing current selection and then choose another best solution afterwards. They all depend on each other.

## 1.4 dynamic programing

Examples: 0/1 Knapsack, Longest Increasing Subsequence

`dynamic programing`: almost all problems can be solved by recursive back tracking approach, but this method is slow and multiple calculations repeat all the time. In order to tackle this, we use `dynamic programming` to solve the problem.

# 🫐 2. graph traversal

Note that all vertices of a graph should have unique values. Because we only visit a vertex once and mark as visited. We can traverse a graph that has duplicated values, but as it's marked as visited so that BFS or DFS will skip the vertex.

There are three different ways to represent a graph: adjacency matrix, adjacency list, edge list. These are special and only suitable for all unique vertices. While in a **binary tree**, the struct of each node has left and right pointer. So we don't worry about using BFS or DFS to visit the same node on every step.

Type of a graphs:

|          | undirect | direct |
| -------- | -------- | ------ |
| unweight | (1)      | (2)    |
| weighed  | (3)      | (4)    |

Traverse an unweighted graph:

|              | BFS                    | DFS                      |
| ------------ | ---------------------- | ------------------------ |
| purpose      | traverse shortest path | traverse                 |
| DS           | queue                  | stack, recursion         |
| condition    | no weight              | no weight                |
| detect cycle | possible               | possible, recommended    |
| apps         | find shortest path     | exploring, detect cycles |
| time complex | $O(V+E)$               | $O(V+E)$                 |
| visit        | all vertices           | all vertices             |

Traverse a weighted graph to find the shortest path:

|              | Dijkstra             | Bellman-Ford              | Floyd-Warshall        |
| ------------ | -------------------- | ------------------------- | --------------------- |
| purpose      | shortest path from s | same as Dijkstra          | all shortest paths    |
| DS           | priority_queue       |                           |                       |
| condition    | + weight values      | +/- weights, no (-) cycle | same as BF            |
| apps         | AI, maps             | game, detect (-) cycle    | graph theory research |
| time complex | $O(V^2)$             | $O(V*E)$                  | $O(V^3)$              |
| visit        | all vertices         |                           |                       |

## 🫐 bfs

Traverse by using the concept of `queue`. The result is the shortest path (no weight on edges).

```python
from collections import deque

def BFS(s, V, graph):
    visited = [False] * V
    path = [-1] * V

    q = deque()
    visited[s] = True
    q.append(s)

    while q:
        u = q.popleft()
        for v in graph[u]:
            if not visited[v]:
                visited[v] = True
                q.append(v)
                path[v] = u

    return path
```

## 🫐 dfs

Traverse by using the concept of `stack` or recursion (based on language stack).

- using `stack` ds: don't remember previous parent vertex, easily to break the loop.
- using recursion: know the previous vertex, hard to break the loop.

```python
def DFS(s, V, graph):
    visited = [False] * V
    path = [-1] * V

    visited[s] = True
    stack = [s]

    while stack:
        u = stack.pop()
        for v in graph[u]:
            if not visited[v]:
                visited[v] = True
                path[v] = u
                stack.append(v)

    return path
```

```cpp
def DFSRecursion(s, graph, visited, path):
    visited[s] = True

    for v in graph[s]:
        if not visited[v]:
            path[v] = s
            DFSRecursion(v, graph, visited, path)
```

## 🫐 Dijkstra

- Purpose: finding the shortest path during traverse from a starting point to all vertices.
- Condition: all weight values must be positive.

```python
import heapq

INF = float('inf')
MAX = 100

# Each graph[u] contains (v, weight)
graph = [[] for _ in range(MAX)]
dist = [INF] * MAX
path = [-1] * MAX

def Dijkstra(s):
    dist[s] = 0
    pq = [(0, s)]  # (distance, node)

    while pq:
        w, u = heapq.heappop(pq)

        if w > dist[u]:
            continue  # Skip if we already found a shorter path

        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
                path[v] = u
```

## 🫐 Bellman-Ford

- Purpose: finding the shortest path during traverse from a starting point to all vertices.
- Condition: work with positive and negative edge weight values, but there is not negative cycle (e.g: sum of a triangle edges is lower than 0).

```python
INF = float('inf')
MAX = 100

class Edge:
    def __init__(self, source=0, target=0, weight=0):
        self.source = source
        self.target = target
        self.weight = weight

dist = [INF] * MAX
path = [-1] * MAX
graph = []  # list of Edge instances
V = E = 0   # number of vertices and edges

def BellmanFord(s):
    dist[s] = 0

    for _ in range(V):
        for edge in graph:
            u = edge.source
            v = edge.target
            w = edge.weight
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                path[v] = u

    # Check for negative weight cycle
    for edge in graph:
        u = edge.source
        v = edge.target
        w = edge.weigh
```

## 🫐 Floyd-Warshall

- Purpose: finding the shortest path between _all pairs_ of vertices in a graph. Using dynamic programming to archive this.
- Condition: same as Bellman-Ford.

```python
INF = float('inf')

def floyd_warshall(graph, V):
    # graph is a VxV adjacency matrix, where graph[i][j] is the weight from i to j (INF if no edge)
    dist = [[graph[i][j] for j in range(V)] for i in range(V)]
    next_node = [[-1 if graph[i][j] == INF else j for j in range(V)] for i in range(V)]

    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_node[i][j] = next_node[i][k]

    return dist, next_node
```

# 🍊 3. math

```cpp
import math

print(max(5, 10))       # 10
print(math.sqrt(64))    # 8.0
print(round(2.6))       # 3
print(math.log(2))      # Natural logarithm of 2 (~0.6931)

```

- fibonacci
- prime number
- greatest common divisor

# 🍏 4. string

- pattern matching
- processing skills

```python
greeting = "Hello"
print("The length of the greeting string is:", len(greeting))

print(greeting[0])       # H
print(greeting[0])       # H (Python has no .at(), index access is the same)

firstName = "John "
lastName = "Doe"
fullName = firstName + lastName
print(fullName)

firstName = "John "
lastName = "Doe"
firstName += lastName  # Equivalent to firstName.append(lastName) in C++
print(firstName)

```

# 🍏 5. geometry

- point
- line
- circle
- triangle
