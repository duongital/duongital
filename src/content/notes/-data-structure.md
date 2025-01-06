---
title: 'Data Structure'
description: 'To use data efficiency while solving a problem'
---

> 🍏: easy, 🫐:medium, 🍊: hard

# 1. linear ds

standard

## 🍏 1.1 `int arr[]`: static array

```cpp
// one direction
int myNum[3] = {10, 20, 30};
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};
cout << cars[0]; // Volvo
int getArrayLength = sizeof(myNum) / sizeof(int);

// two directions
string letters[2][4] = {
  { "A", "B", "C", "D" },
  { "E", "F", "G", "H" }
};

for (int i = 0; i < 2; i++) {
  for (int j = 0; j < 4; j++) {
    cout << letters[i][j] << "\n";
  }
}

// sort array using std library
int arr[] = {4,5,1,2,3};
sort(arr, arr+n); // arr: first address, arr+n: last address
```

## 🍏 1.2 `vector<int>`: dynamic array

```cpp
// initializer list
vector<int> vector1 = {1, 2, 3, 4, 5};
vector1.push_back(6);
cout << "Element at Index 0: " << vector1.at(0) << endl;
vector1.at(0) = 2; // change the first element
vector1.pop_back(); // remove the last element
for (const int& i : vector1) {
	cout << i << "  ";
}

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

## 🍊 1.3 bitmask

## 🍏 1.4 `list`: linked list

## 🫐 1.5 `stack`: stack

last in first out

## 🫐 1.6 `queue`: queue

first in first out

## 🫐 1.7 `dequeue`: double ended queue

used to implement `stack` or `queue`

---

below data structures implemented by your own:

## 🍏 1.8 `ListNode`: struct to implement a linked list

using while to traverse a linked list

```cpp
struct ListNode {
	int val;
	ListNode* next;
	ListNode() : val(0), next(nullptr) {}
	ListNode(int x) : val(x), next(nullptr) {}
	ListNode(int x, ListNode* next) : val(x), next(next) {}
};
```

# 2. non-linear ds

## 🫐 2.1 `priority_queue`: max heap and min heap

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
  -

## 🫐 2.2 `set` and `map`: balanced binary search tree

not learn yet

### set

```cpp
#include <set>

set<int> my_set1 = {5, 3, 8, 1, 3};
for(int val : my_set1) {
	cout << val << " ";
}
my_set1.count(8) == 1 // check if 8 appear one time

```

| Operation  | Description                         |
| ---------- | ----------------------------------- |
| `insert()` | Insert elements into a set.         |
| `erase()`  | Delete elements from a set.         |
| `clear()`  | Remove all the elements from a set. |
| `empty()`  | Check if the set is empty.          |
| `size()`   | Returns the size of the set.        |

### map

```cpp
map<int, string> student;

student[1] = "Jacqueline";
student[2] = "Blake";
student[3] = "Denise";
student[4] = "Aaron";

for (int i = 1; i <= student.size(); ++i) {
	cout << "Student[" << i << "]: " << student[i] << endl;
}

// use iterator to display map elements
map<int, string>::iterator iter;
for (iter = student.begin(); iter != student.end(); ++iter) {
	cout << iter->first << " - " << iter->second << endl;
}
```

count characters in a string by using a map:

```cpp
unordered_map<char, int> m;
for (char c : s) {
	m[c]++;
}

for (const auto& pair : m) {
	cout << "key: " << pair.first << ", value: " << pair.second << endl;
}

```

| Operation  | Description                                          |
| ---------- | ---------------------------------------------------- |
| `insert()` | adds an element (key-value pair) to the map          |
| `erase()`  | removes an element or range of elements from the map |
| `clear()`  | removes all the elements from the map                |
| `find()`   | searches the map for the given key                   |
| `size()`   | returns the number of elements in the map            |
| `empty()`  | returns `true` if the map is empty                   |

## 🍊 2.3 `unorder_map` and `unorder_set`: hash table

API same as `map` and `set`

|        | `set`, `map` | `unorder_set`, `unorder_map` |
| ------ | ------------ | ---------------------------- |
| DS     | balanced BST | hash table                   |
| insert | O($log_n$)   | O(1)                         |

---

below data structures are not standard and implemented with your own implementation:

## 🍏 2.4 `ListNode` struct to implement a binary tree

```cpp
struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode() : val(0), left(nullptr), right(nullptr) {}
	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
	TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
```

## 🫐 2.5 graph: adjacency matrix, adjacency list, edge list

read a graph by using edge list:

```cpp
#define MAX 100
int E, V; // edges and vertices
vector<int> graph[MAX]; // graph is an array of vector
bool visited[MAX];
int path[MAX];

int main() {
	cin >> E >> V;
	int t = E; // the number of edges to the loop
	while (t--) {
		int u, v;
		cin >> u >> v;
		graph[u].push_back(v);
		graph[v].push_back(u);
	}
	for (int i=0; i<V; i++) {
		visited[i] = false;
		path[i] = -1;
	}
	// start BFS or DFS here
	return 0;
}
```

## 🫐 2.6 union-find disjoint sets

not learn yet

## 🍊 2.7 segment tree

not learn yet
