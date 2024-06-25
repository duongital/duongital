---
title: 'C++'
description: 'Cheatsheet on C++ language'
---

# primitive variables

| type name | bytes |
| --------- | ----- |
| short     | 2     |
| int       | 4     |
| long      | 4     |
| long long | 8     |
| float     | 4     |
| double    | 8     |
| bool      | 1     |
| char      | 1     |

For short, int, long, long long we can define to have positive number only by using `unsigned` keyword, for example: `unsigned int a;`

# boilerplate

```cpp
int main() {
	count << "Hello, World!" << endl;
	return 0;
}
```

# data structures

## array

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
```

## vector

```cpp
// Initializer list
vector<int> vector1 = {1, 2, 3, 4, 5};
vector1.push_back(6);
cout << "Element at Index 0: " << vector1.at(0) << endl;
vector1.at(0) = 2; // change the first element
vector1.pop_back(); // remove the last element
for (const int& i : vector1) {
	cout << i << "  ";
}
```

other utils functions: size(), clear(), front(), back(), empty(), capacity()

## string

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

## set

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

## map

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

add a value to the map

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

# math

```cpp
#include <cmath>

cout << max(5, 10);
cout << sqrt(64);  
cout << round(2.6);  
cout << log(2);
```

# switch case

```cpp
int day = 4;  
switch (day) {  
  case 1:  
    cout << "Monday";  
    break;  
  case 2:  
    cout << "Tuesday";  
    break;  
  case 3:  
    cout << "Wednesday";  
    break;  
  case 4:  
    cout << "Thursday";  
    break;  
  case 5:  
    cout << "Friday";  
    break;  
  case 6:  
    cout << "Saturday";  
    break;  
  case 7:  
    cout << "Sunday";  
    break;  
}  
// Outputs "Thursday" (day 4)
```

# loop

break vs continue:

```cpp
int myNumbers[5] = {10, 20, 30, 40, 50};  
for (int i : myNumbers) {  
  cout << i << "\n";  
}

for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    break;  
  }  
  cout << i << "\n";  
}

for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    continue;  
  }  
  cout << i << "\n";  
}
```
