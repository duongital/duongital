---
title: 'C++'
description: 'Notes on using C++ language'
---

# primitive variables

| type name | bytes  |
| --------- | ------ |
| short     | 2      |
| int       | 4      |
| long      | 4 or 8 | 
| long long | 8      |
| float     | 4      |
| double    | 8      |
| bool      | 1      |
| char      | 1      |

For short, int, long, long long we can define to have positive number only by using `unsigned` keyword, for example: `unsigned int a;`

# boilerplate

```cpp
#include <bits/stdc++.h>
int main() {
	count << "Hello, World!" << endl;
	return 0;
}
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

// break
for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    break;  
  }  
  cout << i << "\n";  
}

// continue
for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    continue;  
  }  
  cout << i << "\n";  
}
```

# pass by reference vs. value

if data structure is large, using `&` to avoid copy data, additionally: modify original data, don't take ownership of data or manage its memory.

```cpp
// Pass by reference
void modifyVector(std::vector<int>& nums) {
    nums.push_back(10); // Modifies the original vector
}

// Pass by value
void processVector(std::vector<int> nums) {
    nums.push_back(10); // Modifies only the local copy
    for (int num : nums) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> myVector = {1, 2, 3};

    modifyVector(myVector);
    // myVector is now {1, 2, 3, 10}

    processVector(myVector);
    // myVector is still {1, 2, 3, 10}
    // processVector printed 1 2 3 10 10
    return 0;
}

```