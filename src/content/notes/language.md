---
title: 'Programming Languages'
description: 'I use Python and JS most of the time'
---

# Python Basics

> source: neetcode

Compare method vs function:

- Method: belong to an object, for example: `arr.sort()`
- Function: is a global util function, not belong to any object, for example: sorted(arr)

Compare `sort` vs `sorted`:

- sort: used for array only, mutate original array
- sorted: global function used for ilterable data (list, tuple, string), return new object and doesn’t mutate

## 1. **Variables**

```python
# Variables are dynamicly typed
n = 0
print('n =', n)
>>> n = 0

n = "abc"
print('n =', n)
>>> n = abc

# Multiple assignments
n, m = 0, "abc"
n, m, z = 0.125, "abc", False

# Increment
n = n + 1 # good
n += 1    # good
n++       # bad

# None is null (absence of value)
n = 4
n = None
print("n =", n)
>>> n = None

```

## 2. **If-statements**

```python
# If statements don't need parentheses
# or curly braces.
n = 1
if n > 2:
    n -= 1
elif n == 2:
    n *= 2
else:
    n += 2

# Parentheses needed for multi-line conditions.
# and = &&
# or  = ||
n, m = 1, 2
if ((n > 2 and
    n != m) or n == m):
    n += 1

```

## 3. **Loops**

```python
n = 5
while n < 5:
    print(n)
    n += 1

# Looping from i = 0 to i = 4
for i in range(5):
    print(i)

# Looping from i = 2 to i = 5
for i in range(2, 6):
    print(i)

# Looping from i = 5 to i = 2
for i in range(5, 1, -1):
    print(i)

# Use enumberate to print the index
arr = [1,2,3]
for idx, i in enumerate(arr):
	print(idx, i)

```

## 4. **Math**

```python
# Division is decimal by default
print(5 / 2)

# Double slash rounds down
print(5 // 2)

# CAREFUL: most languages round towards 0 by default
# So negative numbers will round down
print(-3 // 2)

# A workaround for rounding towards zero
# is to use decimal division and then convert to int.
print(int(-3 / 2))

# Modding is similar to most languages
print(10 % 3)

# Except for negative values
print(-10 % 3)

# To be consistent with other languages modulo
import math
from multiprocessing import heap
print(math.fmod(-10, 3))

# More math helpers
print(math.floor(3 / 2))
print(math.ceil(3 / 2))
print(math.sqrt(2))
print(math.pow(2, 3))

# Max / Min Int
float("inf")
float("-inf")

# Python numbers are infinite so they never overflow
print(math.pow(2, 200))

# But still less than infinity
print(math.pow(2, 200) < float("inf"))

```

## 5. **Arrays**

Appending and popping at the end is fast: O(1) time complexity. But not at the beginning, so we can utilize this to use `[]` as stack. For queue we should use `deque`.

Optimized for random access O(1) time complexity.

Appending and popping at the beginning is slow. Because it shifts right all elements in memory. The operation takes O(n) time complexity.

```python
# Arrays (called lists in python)
arr = [1, 2, 3]
print(arr)

# Can be used as a stack
arr.append(4)
arr.append(5)
print(arr)

arr.pop()
print(arr)

arr.insert(1, 7)
print(arr)

arr[0] = 0
arr[3] = 0
print(arr)

# Initialize arr of size n with default value of 1
n = 5
arr = [1] * n
print(arr)
print(len(arr))

# Careful: -1 is not out of bounds, it's the last value
arr = [1, 2, 3]
print(arr[-1])

# Indexing -2 is the second to last value, etc.
print(arr[-2])

# Sublists (aka slicing)
arr = [1, 2, 3, 4]
print(arr[1:3])

# Similar to for-loop ranges, last index is non-inclusive
print(arr[0:4])

# But no out of bounds error
print(arr[0:10])

# Unpacking
a, b, c = [1, 2, 3]
print(a, b, c)

# Be careful though
# a, b = [1, 2, 3]

# Loop through arrays
nums = [1, 2, 3]

# Using index
for i in range(len(nums)):
    print(nums[i])

# Without index
for n in nums:
    print(n)

# With index and value
for i, n in enumerate(nums):
    print(i, n)

# Loop through multiple arrays simultaneously with unpacking
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]
for n1, n2 in zip(nums1, nums2):
    print(n1, n2)

# Reverse
nums = [1, 2, 3]
nums.reverse()
print(nums)

# Sorting
arr = [5, 4, 7, 3, 8]
arr.sort()
print(arr)

arr.sort(reverse=True)
print(arr)

arr = ["bob", "alice", "jane", "doe"]
arr.sort()
print(arr)

# Custom sort (by length of string)
arr.sort(key=lambda x: len(x))
print(arr)

# List comprehension
arr = [i for i in range(5)]
print(arr)

# 2-D lists
arr = [[0] * 4 for i in range(4)]
print(arr)
print(arr[0][0], arr[3][3])

# This won't work
# arr = [[0] * 4] * 4

```

## 6. **Strings**

```python
# Strings are similar to arrays
s = "abc"
print(s[0:2])

# But they are immutable
# s[0] = "A"

# So this creates a new string
s += "def"
print(s)

# Valid numeric strings can be converted
print(int("123") + int("123"))

# And numbers can be converted to strings
print(str(123) + str(123))

# In rare cases you may need the ASCII value of a char
print(ord("a"))
print(ord("b"))

# Combine a list of strings (with an empty string delimitor)
strings = ["ab", "cd", "ef"]
print("".join(strings))

```

## 7. **Queues**

In Python `deque` is **doubled ended queue**. Double ended queue is optimized for both appending and popping both ends: O(1) time complexity.

Not optimized for random access: O(n) time complexity. Because it uses linked list (kind of or similar technique) to traverse.

`deque` is a class, same as `dict` or `list`, so need to import as: _**from collection import deque**_

```python
# Queues (double ended queue)
from collections import deque

queue = deque()
queue.append(1)
queue.append(2)
print(queue)

queue.popleft()
print(queue)

queue.appendleft(1)
print(queue)

queue.pop()
print(queue)

```

## 8. **HashSets**

why HashSet use `remove` while HashMap use `pop`? Because set removes values, map remove keys and values.

```python
# HashSet
mySet = set()

mySet.add(1)
mySet.add(2)
print(mySet)
print(len(mySet))

print(1 in mySet)
print(2 in mySet)
print(3 in mySet)

mySet.remove(2)
print(2 in mySet)

# list to set
print(set([1, 2, 3]))

# Set comprehension
mySet = { i for i in range(5) }
print(mySet)

```

## 9. **HashMaps**

```python
# HashMap (aka dict)
myMap = {}
myMap["alice"] = 88
myMap["bob"] = 77
print(myMap)
print(len(myMap))

myMap["alice"] = 80
print(myMap["alice"])

print("alice" in myMap)
myMap.pop("alice")
print("alice" in myMap)

myMap = { "alice": 90, "bob": 70 }
print(myMap)

# Dict comprehension
myMap = { i: 2*i for i in range(3) }
print(myMap)

# Looping through maps
myMap = { "alice": 90, "bob": 70 }
for key in myMap:
    print(key, myMap[key])

for val in myMap.values():
    print(val)

for key, val in myMap.items():
    print(key, val)

# Find value of a hashmap but key doesn't exist
myMap.get("candy", 0) # fallback value is 0
```

## 10 **Tuples**

```python
# Tuples are like arrays but immutable
tup = (1, 2, 3)
print(tup)
print(tup[0])
print(tup[-1])

# Can't modify
# tup[0] = 0

# Can be used as key for hash map/set
myMap = { (1,2): 3 }
print(myMap[(1,2)])

mySet = set()
mySet.add((1, 2))
print((1, 2) in mySet)

# Lists can't be keys
# myMap[[3, 4]] = 5

```

## 11. **Heaps**

`headp` is a module not a class, provides functions and operate directly.

```python
import heapq

# under the hood are arrays
minHeap = []
heapq.heappush(minHeap, 3)
heapq.heappush(minHeap, 2)
heapq.heappush(minHeap, 4)

# Min is always at index 0
print(minHeap[0])

while len(minHeap):
    print(heapq.heappop(minHeap))

# No max heaps by default, work around is
# to use min heap and multiply by -1 when push & pop.
maxHeap = []
heapq.heappush(maxHeap, -3)
heapq.heappush(maxHeap, -2)
heapq.heappush(maxHeap, -4)

# Max is always at index 0
print(-1 * maxHeap[0])

while len(maxHeap):
    print(-1 * heapq.heappop(maxHeap))

# Build heap from initial values
arr = [2, 1, 8, 4, 5]
heapq.heapify(arr)
while arr:
    print(heapq.heappop(arr))

```

## 12. **Functions**

```python
def myFunc(n, m):
    return n * m

print(myFunc(3, 4))

# Nested functions have access to outer variables
def outer(a, b):
    c = "c"

    def inner():
        return a + b + c
    return inner()

print(outer("a", "b"))

# Can modify objects but not reassign
# unless using nonlocal keyword
def double(arr, val):
    def helper():
        # Modifying array works
        for i, n in enumerate(arr):
            arr[i] *= 2

        # will only modify val in the helper scope
        # val *= 2

        # this will modify val outside helper scope
        nonlocal val
        val *= 2
    helper()
    print(arr, val)

nums = [1, 2]
val = 3
double(nums, val)

```

## 13. **Classes**

```jsx
class MyClass:
    # Constructor
    def __init__(self, nums):
        # Create member variables
        self.nums = nums
        self.size = len(nums)

    # self key word required as param
    def getLength(self):
        return self.size

    def getDoubleLength(self):
        return 2 * self.getLength()

myObj = MyClass([1, 2, 3])
print(myObj.getLength())
print(myObj.getDoubleLength())
```

---

# JavaScript Basics

## 1. **Variables**

```javascript
// Variables can be declared with let, const, or var
let n = 0;
console.log(n); // 0

n = "abc";
console.log(n); // abc

// Multiple assignments
let a = 0, b = "abc";

// Increment
n = n + 1; // good
n += 1;    // good
n++;       // also valid in JS

// null and undefined
let x = 4;
x = null;      // explicitly no value
let y;         // undefined (declared but not assigned)
console.log(x, y); // null undefined
```

## 2. **If-statements**

```javascript
// If statements need parentheses and curly braces
let n = 1;
if (n > 2) {
    n -= 1;
} else if (n === 2) {
    n *= 2;
} else {
    n += 2;
}

// && = and, || = or
let m = 2;
if ((n > 2 && n !== m) || n === m) {
    n += 1;
}
```

## 3. **Loops**

```javascript
// While loop
let n = 0;
while (n < 5) {
    console.log(n);
    n++;
}

// For loop from i = 0 to i = 4
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For loop from i = 2 to i = 5
for (let i = 2; i <= 5; i++) {
    console.log(i);
}

// For loop from i = 5 to i = 2
for (let i = 5; i >= 2; i--) {
    console.log(i);
}

// Loop with index using forEach
let arr = [1, 2, 3];
arr.forEach((val, idx) => {
    console.log(idx, val);
});
```

## 4. **Math**

```javascript
// Division
console.log(5 / 2); // 2.5

// Floor division
console.log(Math.floor(5 / 2)); // 2

// Negative division
console.log(Math.floor(-3 / 2)); // -2

// Truncate towards zero
console.log(Math.trunc(-3 / 2)); // -1

// Modulo
console.log(10 % 3); // 1
console.log(-10 % 3); // -1

// Math helpers
console.log(Math.floor(3 / 2)); // 1
console.log(Math.ceil(3 / 2));  // 2
console.log(Math.sqrt(2));      // 1.414...
console.log(Math.pow(2, 3));    // 8

// Max / Min values
Infinity;
-Infinity;

// Max safe integer
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

## 5. **Arrays**

```javascript
// Arrays
let arr = [1, 2, 3];
console.log(arr);

// Push and pop (O(1) at end)
arr.push(4);
arr.push(5);
console.log(arr); // [1,2,3,4,5]

arr.pop();
console.log(arr); // [1,2,3,4]

// Insert at index (O(n))
arr.splice(1, 0, 7); // at index 1, delete 0, insert 7
console.log(arr); // [1,7,2,3,4]

// Update values
arr[0] = 0;
console.log(arr);

// Initialize array with default values
let n = 5;
let defaultArr = new Array(n).fill(1);
console.log(defaultArr); // [1,1,1,1,1]

// Negative indexing (not supported, use at() method)
arr = [1, 2, 3];
console.log(arr.at(-1)); // 3
console.log(arr.at(-2)); // 2

// Slicing
arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3)); // [2,3]
console.log(arr.slice(0, 4)); // [1,2,3,4]

// Destructuring
[a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Loop through arrays
let nums = [1, 2, 3];

// Using index
for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
}

// Without index
for (let num of nums) {
    console.log(num);
}

// With index and value
nums.forEach((num, i) => {
    console.log(i, num);
});

// Loop through multiple arrays
let nums1 = [1, 3, 5];
let nums2 = [2, 4, 6];
for (let i = 0; i < Math.min(nums1.length, nums2.length); i++) {
    console.log(nums1[i], nums2[i]);
}

// Reverse
nums.reverse();
console.log(nums); // [3,2,1]

// Sorting
arr = [5, 4, 7, 3, 8];
arr.sort((a, b) => a - b); // ascending
console.log(arr);

arr.sort((a, b) => b - a); // descending
console.log(arr);

// Sort strings
arr = ["bob", "alice", "jane", "doe"];
arr.sort();
console.log(arr);

// Custom sort (by length)
arr.sort((a, b) => a.length - b.length);
console.log(arr);

// Array comprehension (map)
arr = Array.from({length: 5}, (_, i) => i);
console.log(arr); // [0,1,2,3,4]

// 2-D arrays
let grid = Array.from({length: 4}, () => Array(4).fill(0));
console.log(grid);
```

## 6. **Strings**

```javascript
// Strings are immutable
let s = "abc";
console.log(s.slice(0, 2)); // "ab"

// Concatenation creates new string
s += "def";
console.log(s); // "abcdef"

// Convert strings to numbers
console.log(parseInt("123") + parseInt("123")); // 246

// Convert numbers to strings
console.log(String(123) + String(123)); // "123123"

// Get character code
console.log("a".charCodeAt(0)); // 97
console.log("b".charCodeAt(0)); // 98

// Join array of strings
let strings = ["ab", "cd", "ef"];
console.log(strings.join("")); // "abcdef"
```

## 7. **Queues**

```javascript
// Arrays can be used as queues
let queue = [];
queue.push(1);
queue.push(2);
console.log(queue); // [1,2]

queue.shift(); // remove from front (O(n))
console.log(queue); // [2]

// For better performance, consider using a deque library
// or implement circular buffer
```

## 8. **HashSets**

```javascript
// Set
let mySet = new Set();

mySet.add(1);
mySet.add(2);
console.log(mySet); // Set {1, 2}
console.log(mySet.size); // 2

console.log(mySet.has(1)); // true
console.log(mySet.has(3)); // false

mySet.delete(2);
console.log(mySet.has(2)); // false

// Array to set
let set = new Set([1, 2, 3]);
console.log(set);

// Set from range (using spread)
mySet = new Set([...Array(5).keys()]);
console.log(mySet); // Set {0,1,2,3,4}
```

## 9. **HashMaps**

```javascript
// Map (like Python dict)
let myMap = new Map();
myMap.set("alice", 88);
myMap.set("bob", 77);
console.log(myMap);
console.log(myMap.size); // 2

myMap.set("alice", 80);
console.log(myMap.get("alice")); // 80

console.log(myMap.has("alice")); // true
myMap.delete("alice");
console.log(myMap.has("alice")); // false

// Initialize map
myMap = new Map([["alice", 90], ["bob", 70]]);
console.log(myMap);

// Loop through maps
for (let key of myMap.keys()) {
    console.log(key, myMap.get(key));
}

for (let val of myMap.values()) {
    console.log(val);
}

for (let [key, val] of myMap.entries()) {
    console.log(key, val);
}

// Get with default value
console.log(myMap.get("candy") || 0); // 0

// Object literal (alternative to Map)
let obj = { alice: 90, bob: 70 };
console.log(obj["alice"]); // 90
```

## 10. **Functions**

```javascript
// Function declaration
function myFunc(n, m) {
    return n * m;
}
console.log(myFunc(3, 4)); // 12

// Arrow function
const multiply = (n, m) => n * m;
console.log(multiply(3, 4)); // 12

// Nested functions with closures
function outer(a, b) {
    const c = "c";

    function inner() {
        return a + b + c;
    }
    return inner();
}
console.log(outer("a", "b")); // "abc"

// Modifying variables in closure
function double(arr, val) {
    function helper() {
        // Modifying array works
        for (let i = 0; i < arr.length; i++) {
            arr[i] *= 2;
        }
        // Reassigning primitive won't affect outer scope
        val *= 2;
    }
    helper();
    console.log(arr, val);
}

let nums = [1, 2];
let val = 3;
double(nums, val); // [2,4] 3
```

## 11. **Classes**

```javascript
class MyClass {
    // Constructor
    constructor(nums) {
        this.nums = nums;
        this.size = nums.length;
    }

    getLength() {
        return this.size;
    }

    getDoubleLength() {
        return 2 * this.getLength();
    }
}

let myObj = new MyClass([1, 2, 3]);
console.log(myObj.getLength()); // 3
console.log(myObj.getDoubleLength()); // 6
```

## 12. **Useful Patterns**

```javascript
// Count occurrences in array
let arr = ['a', 'b', 'a', 'c', 'b', 'a'];
let count = new Map();
for (let item of arr) {
    count.set(item, (count.get(item) || 0) + 1);
}
console.log(count); // Map {'a' => 3, 'b' => 2, 'c' => 1}

// Array methods
let nums = [1, 2, 3, 4, 5];
console.log(nums.filter(x => x > 2)); // [3,4,5]
console.log(nums.map(x => x * 2));    // [2,4,6,8,10]
console.log(nums.reduce((sum, x) => sum + x, 0)); // 15
console.log(nums.some(x => x > 3));   // true
console.log(nums.every(x => x > 0));  // true
```

---
