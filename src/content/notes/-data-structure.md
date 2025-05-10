---
title: 'Data Structure'
description: 'To use data efficiency while solving a problem'
---

> 🍏: easy, 🫐:medium, 🍊: hard

# 1. linear ds

standard

## 🍏 1.1 static array

Sometimes, to limit the array that we are creating. Don't want to mutate it during runtime so static array is the good choice.

In C++ we have `int arr[]`:

```cpp
// one direction
int myNum[3] = {10, 20, 30};
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};

// two directions
string letters[2][4] = {
  { "A", "B", "C", "D" },
  { "E", "F", "G", "H" }
};

// sort array using std library
int arr[] = {4,5,1,2,3};
sort(arr, arr+n); // arr: first address, arr+n: last address
```

In Python we have a data structure called `tupple`:

```python
static_array = (1, 2, 3, 4, 5)
tuple_of_strings = ("apple", "banana", "cherry")
```

## 🍏 1.2 dynamic array

Dynamic array is good for cases that we don't know exactly the length of it in the future. Access an element will have O(1) time, as the new array will be allocated if it reaches a limit in the memory. It's different from a Linked List to have a Node everywhere in the memory.

In C++ we have `vector<int>`:

```cpp
// initializer list
vector<int> vector1 = {1, 2, 3, 4, 5};
vector1.push_back(6);
vector1.at(0) = 2; // change the first element
vector1.pop_back(); // remove the last element

// sort a vector using std library
vector<int> vector2 = {3,4,5,2,1};
sort(vector2.begin(), vector2.end())
```

| Function     | Description                                          |
| ------------ | ---------------------------------------------------- |
| `size()`     | returns the number of elements present in the vector |
| `clear()`    | removes all the elements of the vector               |
| `front()`    | returns the first element of the vector              |
| `back()`     | returns the last element of the vector               |
| `empty()`    | returns **1** (true) if the vector is empty          |
| `capacity()` | check the overall size of a vector                   |

In Python we can define as below for the same approach but I'm not sure how the memory created inside:

```python
dynamic_array = [1, 2, 3, 4, 5]
dynamic_array.append(6)  # [1, 2, 3, 4, 5, 6]
dynamic_array.pop()      # Removes the last element
```

We can see C++ `vector` is quite similar to Python `list`.

## 🍊 1.3 bitmask

Use cases:

- You have multiple boolean flags or settings.
- You want a memory-efficient solution.
- You need fast operations (enabling, disabling, checking flags).

| Operation | Description                |                        |
| --------- | -------------------------- | ---------------------- |
| \`x       | y\`                        | Bitwise OR (sets bits) |
| `x & y`   | Bitwise AND (checks bits)  |                        |
| `x ^ y`   | Bitwise XOR (toggles bits) |                        |
| `~x`      | Bitwise NOT (flips bits)   |                        |
| `x << n`  | Left shift by `n` bits     |                        |
| `x >> n`  | Right shift by `n` bits    |                        |

## 🍏 1.4 struct or node to implement super data structure

A struct or a node can combine together to have a higher data structure (queue, linked list...)

In C++ `ListNode`: struct to implement a linked list, stack, queue...

```cpp
struct ListNode {
	int val;
	ListNode* next;
	ListNode() : val(0), next(nullptr) {}
	ListNode(int x) : val(x), next(nullptr) {}
	ListNode(int x, ListNode* next) : val(x), next(next) {}
};
```

In Python we have a sinle node list like this:

```python
class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

## 🍏 1.5 linked list

We have: singly linked list, doubly linked list...

In an interview: given a node implemented, we are usually asked questions manually to:

- reverse a singly linked list
- remove an nth element in a linked list
- etc...

```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            next_node = curr.next  # Save next node
            curr.next = prev       # Reverse the link
            prev = curr            # Move prev forward
            curr = next_node       # Move curr forward

        return prev  # New head of the reversed list
```

## 🫐 1.6 stack

Last in first out

In C++ we can import `stack` from `std` library:

```cpp
#include <stack>
```

In Python we can use dynamic array or list `[]` to have same approach. Or closer we can use `deque` (dequeue).

```python
from collections import deque

stack = deque()
stack.append(10)
stack.append(20)
print(stack.pop())  # 20
```

## 🫐 1.7 queue

Queue can be implemented by using array or linked list.

In C++ we can import `queue` from `std` library:

```cpp
#include <queue>
```

In Python we can use `deque` (recommended) or `queue.Queue` to have the same approach:

```python
from collections import deque

queue = deque()
queue.append(10)       # enqueue
queue.append(20)
print(queue.popleft())  # 10 (FIFO)
```

## 🫐 1.8 double ended queue

It's intersting that C++ internally use `dequeue` to implement `stack` or `queue`.

In C++ we can import `dequeue` from `std` library:

```cpp
#include <deque>
```

In Python:

```python
from collections import deque

my_deque = deque([10, 20, 30])

my_deque.append(40)       # O(1)
my_deque.appendleft(5)    # O(1)
my_deque.pop()            # O(1)
my_deque.popleft()        # O(1)

print(my_deque)  # deque([10, 20, 30])
```

Remeber that dequeue:

- Efficient insertions/removals at both ends (O(1)).
- Slower random access (O(n)).

---

below data structures implemented by your own:

# 2. non-linear ds

## 🫐 2.1 max heap and min heap

In C++ we have `priority_queue`:

- this is a _complete_ binary tree (different from _full_ and _perfect_ ones):
  - full: each parent must have two children.
  - complete: xếp từ trên xg dưới từ trái qua phải (ko cần đủ 2 lá)
  - perfect: full + complete.
- complete >> full >> perfect
- two types: min head, max heap:

  - min heap: parent is less than or equal children
  - max heap: parent is greater than or equal children

- things to remember:
  - create a heap from an array
  - add an element to a heap
  - remove an element from a heap

In Python we have min heap:

```python
import heapq

pq = []
heapq.heappush(pq, 10)
heapq.heappush(pq, 5)
heapq.heappush(pq, 20)

print(heapq.heappop(pq))  # 5 (smallest element)
```

or max heap:

```python
import heapq

pq = []
heapq.heappush(pq, -10)
heapq.heappush(pq, -5)
heapq.heappush(pq, -20)

print(-heapq.heappop(pq))  # 20 (max element)
```

## 🫐 2.2 balanced binary search tree

In C++ we have `set` and `map`:

### set

In C++ we have:

```cpp
#include <set>

set<int> my_set1 = {5, 3, 8, 1, 3};
```

In Python we don't have exactly approach, as the set in C++ will be ordered. We can use `s = set()` but not guaranteed to be sorted.

### map

In C++ we have:

```cpp
map<int, string> student;

student[1] = "Jacqueline";
student[2] = "Blake";
```

In Python we have `collections.OrderedDict` to have a sorted map.

## 🍊 2.3 hash table

In C++ we have `unorder_map` and `unorder_set`:

```cpp
unordered_map<char, int> m;
for (char c : s) {
	m[c]++;
}
```

API same as `map` and `set`

|        | `set`, `map` | `unorder_set`, `unorder_map` |
| ------ | ------------ | ---------------------------- |
| DS     | balanced BST | hash table                   |
| insert | O($log_n$)   | O(1)                         |

In Python we have `{}` and `set()`:

```python
m = {}
m["apple"] = 10
m["banana"] = 5
print(m["apple"])  # Output: 10

s = set()
s.add(3)
s.add(1)
s.add(2)
print(s)  # Output might be: {1, 2, 3} or {3, 1, 2} (unordered)
```

---

below data structures are not standard and implemented with your own implementation:

## 🫐 2.4 graph: adjacency matrix, adjacency list, edge list

In Python read a graph by using edge list:

```python
MAX = 100
graph = [[] for _ in range(MAX)]  # graph is a list of lists
visited = [False] * MAX
path = [-1] * MAX

def main():
    E = int(input())
    V = int(input())

    for _ in range(E):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)

    for i in range(V):
        visited[i] = False
        path[i] = -1

    # start BFS or DFS here
```

## 🫐 2.5 union-find disjoint sets

not learn yet

## 🍊 2.6 segment tree

not learn yet
