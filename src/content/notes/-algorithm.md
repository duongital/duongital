---
title: 'Algorithm'
description: 'algorithm is for all programing languages, we can apply when being expert at one or many. It help us a lot while getting a complex situation.'
---

> 🍏: easy, 🫐:medium, 🍊: hard

# 🍊 1. approaches:

## 1.1 complete search

Complete search (also called brute force) tries all possible solutions.

### Iterative approach

```python
# Example: Find all subsets of a set
def find_all_subsets(arr):
    n = len(arr)
    subsets = []

    # There are 2^n possible subsets
    for i in range(2**n):
        subset = []
        for j in range(n):
            # Check if j-th element is in current subset
            if (i >> j) & 1:
                subset.append(arr[j])
        subsets.append(subset)

    return subsets

# Example usage
print(find_all_subsets([1, 2, 3]))
# Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

### Backtracking approach

Backtracking builds solutions incrementally and abandons them ("backtracks") when they can't lead to a valid solution.

```python
# Example: Solve N-Queens problem
def solve_n_queens(n):
    def is_safe(board, row, col):
        # Check column
        for i in range(row):
            if board[i] == col:
                return False
            # Check diagonals
            if abs(board[i] - col) == abs(i - row):
                return False
        return True

    def backtrack(board, row):
        if row == n:
            result.append(board[:])
            return

        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                backtrack(board, row + 1)
                board[row] = -1  # backtrack

    result = []
    backtrack([-1] * n, 0)
    return result

# Example: 4-Queens
solutions = solve_n_queens(4)
print(f"Found {len(solutions)} solutions for 4-Queens")
```

## 1.2 divide and conquer

Divide the problem into smaller subproblems, solve them, then combine results.

```python
# Example: Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # not found

# Example usage
sorted_arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(sorted_arr, 7))  # Output: 3
```

```python
# Example: Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example usage
print(merge_sort([64, 34, 25, 12, 22, 11, 90]))
# Output: [11, 12, 22, 25, 34, 64, 90]
```

## 1.3 greedy

A `greedy algorithm` makes the locally optimal choice at each step, hoping to find a global optimum.

Examples: Dijkstra's algorithm, Prim's algorithm, Huffman coding, Activity Selection

```python
# Example: Coin Change (greedy approach)
# Note: This only works for certain coin systems!
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)
    result = []

    for coin in coins:
        while amount >= coin:
            result.append(coin)
            amount -= coin

    return result if amount == 0 else None

# Example usage
coins = [25, 10, 5, 1]
amount = 63
print(coin_change_greedy(coins, amount))
# Output: [25, 25, 10, 1, 1, 1]
```

```python
# Example: Activity Selection Problem
def activity_selection(start, finish):
    n = len(start)
    activities = sorted(zip(start, finish), key=lambda x: x[1])

    selected = [activities[0]]
    last_finish = activities[0][1]

    for i in range(1, n):
        if activities[i][0] >= last_finish:
            selected.append(activities[i])
            last_finish = activities[i][1]

    return selected

# Example usage
start = [1, 3, 0, 5, 8, 5]
finish = [2, 4, 6, 7, 9, 9]
print(activity_selection(start, finish))
# Output: [(1, 2), (3, 4), (5, 7), (8, 9)]
```

## 1.4 dynamic programming

`Dynamic programming`: Solves problems by breaking them down into overlapping subproblems and storing results to avoid redundant calculations.

Key principles:
- **Optimal substructure**: Optimal solution contains optimal solutions to subproblems
- **Overlapping subproblems**: Same subproblems are solved multiple times

Examples: 0/1 Knapsack, Longest Increasing Subsequence, Fibonacci, Edit Distance

```python
# Example: Fibonacci (with memoization)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

print(fibonacci_memo(50))  # Fast! Output: 12586269025
```

```python
# Example: 0/1 Knapsack Problem
def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]

            # Take item i-1 if it fits
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]

# Example usage
weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
capacity = 7
print(knapsack(weights, values, capacity))  # Output: 9
```

```python
# Example: Longest Increasing Subsequence
def longest_increasing_subsequence(arr):
    if not arr:
        return 0

    n = len(arr)
    dp = [1] * n  # dp[i] = length of LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# Example usage
arr = [10, 9, 2, 5, 3, 7, 101, 18]
print(longest_increasing_subsequence(arr))  # Output: 4 ([2,3,7,18])
```

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
        w = edge.weight
        if dist[u] != INF and dist[u] + w < dist[v]:
            print("Graph contains negative weight cycle")
            return False

    return True
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

## Common Math Operations

```python
import math

print(max(5, 10))       # 10
print(min(5, 10))       # 5
print(abs(-42))         # 42
print(math.sqrt(64))    # 8.0
print(math.pow(2, 3))   # 8.0
print(round(2.6))       # 3
print(math.floor(2.9))  # 2
print(math.ceil(2.1))   # 3
print(math.log(2))      # Natural logarithm of 2 (~0.6931)
print(math.log10(100))  # 2.0
```

## Fibonacci Sequence

```python
# Method 1: Iterative (efficient)
def fibonacci_iterative(n):
    if n <= 1:
        return n

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b

    return b

print(fibonacci_iterative(10))  # Output: 55
```

```python
# Method 2: With memoization (see section 1.4)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
```

## Prime Numbers

```python
# Check if a number is prime
def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Check odd divisors up to sqrt(n)
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False

    return True

print(is_prime(17))  # True
print(is_prime(18))  # False
```

```python
# Sieve of Eratosthenes: Find all primes up to n
def sieve_of_eratosthenes(n):
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(math.sqrt(n)) + 1):
        if is_prime[i]:
            # Mark all multiples of i as not prime
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

print(sieve_of_eratosthenes(30))
# Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

## Greatest Common Divisor (GCD)

```python
# Euclidean Algorithm
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 18))  # Output: 6
```

```python
# Using built-in function
import math
print(math.gcd(48, 18))  # Output: 6
```

```python
# Least Common Multiple (LCM)
def lcm(a, b):
    return abs(a * b) // gcd(a, b)

print(lcm(12, 15))  # Output: 60
```

## Factorial

```python
# Iterative approach
def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial(5))  # Output: 120
```

```python
# Using built-in function
import math
print(math.factorial(5))  # Output: 120
```

## Combinatorics

```python
# Combinations: C(n, k) = n! / (k! * (n-k)!)
def combinations(n, k):
    if k > n or k < 0:
        return 0
    if k == 0 or k == n:
        return 1

    # Optimize: C(n, k) = C(n, n-k)
    k = min(k, n - k)

    result = 1
    for i in range(k):
        result = result * (n - i) // (i + 1)

    return result

print(combinations(5, 2))  # Output: 10
```

```python
# Using built-in function
import math
print(math.comb(5, 2))  # Output: 10 (Python 3.8+)
```

## Power and Modular Arithmetic

```python
# Fast exponentiation (for large powers)
def power(base, exp):
    result = 1
    while exp > 0:
        if exp % 2 == 1:
            result *= base
        base *= base
        exp //= 2
    return result

print(power(2, 10))  # Output: 1024
```

```python
# Modular exponentiation: (base^exp) % mod
def mod_power(base, exp, mod):
    result = 1
    base = base % mod

    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp // 2
        base = (base * base) % mod

    return result

print(mod_power(2, 10, 1000))  # Output: 24 (2^10 % 1000 = 1024 % 1000)
```

# 🍏 4. string

## Basic String Operations

```python
greeting = "Hello"
print("The length of the greeting string is:", len(greeting))  # 5

# Accessing characters
print(greeting[0])       # H (first character)
print(greeting[-1])      # o (last character)
print(greeting[1:4])     # ell (slicing)

# String concatenation
firstName = "John"
lastName = "Doe"
fullName = firstName + " " + lastName
print(fullName)  # John Doe

# String methods
text = "  Hello World  "
print(text.strip())      # "Hello World" (remove whitespace)
print(text.lower())      # "  hello world  "
print(text.upper())      # "  HELLO WORLD  "
print(text.replace("World", "Python"))  # "  Hello Python  "

# Checking substrings
print("World" in text)   # True
print("xyz" in text)     # False

# String splitting and joining
words = "apple,banana,cherry".split(",")
print(words)  # ['apple', 'banana', 'cherry']
print(" - ".join(words))  # "apple - banana - cherry"
```

## Pattern Matching

### KMP (Knuth-Morris-Pratt) Algorithm

Efficient string matching algorithm with O(n + m) time complexity.

```python
def kmp_search(text, pattern):
    """
    Find all occurrences of pattern in text using KMP algorithm
    """
    def compute_lps(pattern):
        # LPS: Longest Proper Prefix which is also Suffix
        m = len(pattern)
        lps = [0] * m
        length = 0  # length of previous longest prefix suffix
        i = 1

        while i < m:
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1

        return lps

    n = len(text)
    m = len(pattern)
    lps = compute_lps(pattern)

    i = 0  # index for text
    j = 0  # index for pattern
    result = []

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            result.append(i - j)  # pattern found at index i-j
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return result

# Example usage
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"
print(kmp_search(text, pattern))  # Output: [10]
```

### Rabin-Karp Algorithm (Rolling Hash)

```python
def rabin_karp(text, pattern):
    """
    Find pattern in text using rolling hash
    """
    n = len(text)
    m = len(pattern)
    d = 256  # number of characters in alphabet
    q = 101  # a prime number

    h = pow(d, m - 1, q)  # hash value for leading digit
    p = 0  # hash value for pattern
    t = 0  # hash value for text window
    result = []

    # Calculate initial hash values
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q

    # Slide the pattern over text
    for i in range(n - m + 1):
        # Check if hash values match
        if p == t:
            # Check characters one by one
            if text[i:i + m] == pattern:
                result.append(i)

        # Calculate hash for next window
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0:
                t += q

    return result

# Example usage
text = "GEEKS FOR GEEKS"
pattern = "GEEKS"
print(rabin_karp(text, pattern))  # Output: [0, 10]
```

## Common String Problems

### Palindrome Check

```python
def is_palindrome(s):
    # Method 1: Simple comparison
    return s == s[::-1]

# Method 2: Two pointers (more efficient for large strings)
def is_palindrome_two_pointers(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False
```

### Longest Palindromic Substring

```python
def longest_palindrome(s):
    """
    Find the longest palindromic substring using expand around center
    """
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1

    if not s:
        return ""

    start = end = 0
    for i in range(len(s)):
        # Odd length palindrome (center is one character)
        len1 = expand_around_center(i, i)
        # Even length palindrome (center is between two characters)
        len2 = expand_around_center(i, i + 1)
        max_len = max(len1, len2)

        if max_len > end - start:
            start = i - (max_len - 1) // 2
            end = i + max_len // 2

    return s[start:end + 1]

print(longest_palindrome("babad"))  # "bab" or "aba"
```

### Anagram Check

```python
def are_anagrams(s1, s2):
    # Method 1: Using sorting
    return sorted(s1) == sorted(s2)

# Method 2: Using character count
from collections import Counter

def are_anagrams_counter(s1, s2):
    return Counter(s1) == Counter(s2)

print(are_anagrams("listen", "silent"))  # True
print(are_anagrams("hello", "world"))    # False
```

### String Reversal

```python
# Method 1: Using slicing (most Pythonic)
def reverse_string(s):
    return s[::-1]

# Method 2: Using built-in reversed()
def reverse_string_builtin(s):
    return ''.join(reversed(s))

# Method 3: Manual reversal
def reverse_string_manual(s):
    result = []
    for char in s:
        result.insert(0, char)
    return ''.join(result)

print(reverse_string("Hello"))  # "olleH"
```

# 🍏 5. geometry

## Point Operations

```python
import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def distance_to(self, other):
        """Calculate Euclidean distance between two points"""
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

    def distance_to_origin(self):
        """Calculate distance from origin (0, 0)"""
        return math.sqrt(self.x**2 + self.y**2)

    def midpoint(self, other):
        """Find midpoint between two points"""
        return Point((self.x + other.x) / 2, (self.y + other.y) / 2)

# Example usage
p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance_to(p2))  # 5.0
print(p2.distance_to_origin())  # 5.0
print(p1.midpoint(p2))  # Point(1.5, 2.0)
```

## Line Operations

```python
class Line:
    def __init__(self, p1, p2):
        """Line defined by two points"""
        self.p1 = p1
        self.p2 = p2

    def slope(self):
        """Calculate slope of the line"""
        if self.p2.x - self.p1.x == 0:
            return float('inf')  # vertical line
        return (self.p2.y - self.p1.y) / (self.p2.x - self.p1.x)

    def length(self):
        """Calculate length of line segment"""
        return self.p1.distance_to(self.p2)

    def is_parallel(self, other):
        """Check if two lines are parallel"""
        return self.slope() == other.slope()

    def is_perpendicular(self, other):
        """Check if two lines are perpendicular"""
        m1 = self.slope()
        m2 = other.slope()
        if m1 == float('inf') or m2 == float('inf'):
            return False
        return abs(m1 * m2 + 1) < 1e-9

# Example usage
line1 = Line(Point(0, 0), Point(2, 2))
line2 = Line(Point(0, 0), Point(2, -2))
print(f"Slope: {line1.slope()}")  # 1.0
print(f"Length: {line1.length():.2f}")  # 2.83
print(f"Perpendicular: {line1.is_perpendicular(line2)}")  # True
```

### Point-Line Distance

```python
def point_to_line_distance(point, line_p1, line_p2):
    """
    Calculate shortest distance from a point to a line segment
    """
    # Vector from line_p1 to line_p2
    dx = line_p2.x - line_p1.x
    dy = line_p2.y - line_p1.y

    # If line is actually a point
    if dx == 0 and dy == 0:
        return point.distance_to(line_p1)

    # Calculate parameter t
    t = ((point.x - line_p1.x) * dx + (point.y - line_p1.y) * dy) / (dx * dx + dy * dy)

    # Clamp t to [0, 1] for line segment
    t = max(0, min(1, t))

    # Find closest point on line segment
    closest_x = line_p1.x + t * dx
    closest_y = line_p1.y + t * dy
    closest = Point(closest_x, closest_y)

    return point.distance_to(closest)

# Example
p = Point(2, 2)
l1 = Point(0, 0)
l2 = Point(4, 0)
print(f"Distance: {point_to_line_distance(p, l1, l2):.2f}")  # 2.00
```

## Circle Operations

```python
class Circle:
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

    def area(self):
        """Calculate area of circle"""
        return math.pi * self.radius ** 2

    def circumference(self):
        """Calculate circumference of circle"""
        return 2 * math.pi * self.radius

    def contains_point(self, point):
        """Check if point is inside circle"""
        return self.center.distance_to(point) <= self.radius

    def intersects_circle(self, other):
        """Check if two circles intersect"""
        distance = self.center.distance_to(other.center)
        return distance <= self.radius + other.radius

# Example usage
c1 = Circle(Point(0, 0), 5)
print(f"Area: {c1.area():.2f}")  # 78.54
print(f"Circumference: {c1.circumference():.2f}")  # 31.42
print(c1.contains_point(Point(3, 4)))  # True (distance is 5)
print(c1.contains_point(Point(4, 4)))  # False

c2 = Circle(Point(8, 0), 4)
print(c1.intersects_circle(c2))  # True (distance is 8, radii sum is 9)
```

## Triangle Operations

```python
class Triangle:
    def __init__(self, p1, p2, p3):
        self.p1 = p1
        self.p2 = p2
        self.p3 = p3

    def area(self):
        """Calculate area using cross product formula"""
        return abs((self.p2.x - self.p1.x) * (self.p3.y - self.p1.y) -
                   (self.p3.x - self.p1.x) * (self.p2.y - self.p1.y)) / 2

    def perimeter(self):
        """Calculate perimeter"""
        return (self.p1.distance_to(self.p2) +
                self.p2.distance_to(self.p3) +
                self.p3.distance_to(self.p1))

    def is_valid(self):
        """Check if triangle is valid (area > 0)"""
        return self.area() > 0

    def contains_point(self, p):
        """Check if point is inside triangle using area method"""
        area_original = self.area()

        area1 = Triangle(p, self.p2, self.p3).area()
        area2 = Triangle(self.p1, p, self.p3).area()
        area3 = Triangle(self.p1, self.p2, p).area()

        return abs(area_original - (area1 + area2 + area3)) < 1e-9

# Example usage
t = Triangle(Point(0, 0), Point(4, 0), Point(2, 3))
print(f"Area: {t.area()}")  # 6.0
print(f"Perimeter: {t.perimeter():.2f}")  # ~10.64
print(f"Contains (2, 1): {t.contains_point(Point(2, 1))}")  # True
print(f"Contains (5, 5): {t.contains_point(Point(5, 5))}")  # False
```

## Convex Hull (Graham Scan)

```python
def convex_hull(points):
    """
    Find convex hull using Graham's scan algorithm
    Returns points in counter-clockwise order
    """
    def cross_product(o, a, b):
        """Calculate cross product to determine turn direction"""
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

    # Sort points by x-coordinate, then by y-coordinate
    points = sorted(points, key=lambda p: (p.x, p.y))

    if len(points) <= 2:
        return points

    # Build lower hull
    lower = []
    for p in points:
        while len(lower) >= 2 and cross_product(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # Build upper hull
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross_product(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    # Remove last point of each half because it's repeated
    return lower[:-1] + upper[:-1]

# Example usage
points = [Point(0, 0), Point(1, 1), Point(2, 2), Point(2, 0),
          Point(2, 4), Point(3, 3), Point(4, 2)]
hull = convex_hull(points)
print("Convex hull points:")
for p in hull:
    print(p)
```
