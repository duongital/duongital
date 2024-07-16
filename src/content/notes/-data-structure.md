---
title: 'Data Structure'
description: 'To use data efficiency while solving a problem'
---


# 1. linear ds

## 1.1 standard

### static array `int arr[MAX]` 🍏

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

### dynamic array `vector<int>` 🍏

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

### bitmask 🍊

### linked list `list` 🍏

### stack `stack` 🫐

### queue `queue` 🫐

### dequeue (double ended queue) `dequeue` 🫐

## 2.2 not standard

data structures with your own implementation:

- linked list with `ListNode` struct 🍏

# 2. non-linear ds

## 2.1 standard

### balanced binary search tree: `set` 🍏

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

### balanced binary search tree: `map` 🍏

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

### priority queue: `heap` 🫐

### hash table: `unorder_map` 🍊

## 2.2 not standard

data structures with your own implementation:

- binary tree with `ListNode` struct 🍏
- graph: adjacency matrix, adjacency list, edge list 🫐
- union-find disjoint sets 🫐
- segment tree 🍊
