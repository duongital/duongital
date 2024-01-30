---
title: 'C++'
description: 'Cheatsheet on C++ language'
---

# boilerplate

```cpp
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World" << endl;
  return 0;
}
```

# data types

```cpp
int myNum = 5;               // Integer (whole number)  
float myFloatNum = 5.99;     // Floating point number  
double myDoubleNum = 9.98;   // Floating point number  
char myLetter = 'D';         // Character  
bool myBoolean = true;       // Boolean  
string myText = "Hello";     // String
```

| Data Type | Size         | Description                               |
| --------- | ------------ | ----------------------------------------- |
| `boolean` | 1 byte       | Stores true or false values               |
| `char`    | 1 byte       | Stores a single character/letter/number   |
| `int`     | 2 or 4 bytes | Stores whole numbers, without decimals    |
| `float`   | 4 bytes      | Sufficient for storing 6-7 decimal digits |
| `double`  | 8 bytes      | Sufficient for storing 15 decimal digits  |

# operators

```text
arithmetic:
+ addition
- subtraction
* multiply
/ division
% return remainder
++ increase by 1
-- decrease by 1
```

| Assignment | Example | Same As    |
| ---------- | ------- | ---------- |
| =          | x = 5   | x = 5      |
| +=         | x += 3  | x = x + 3  |
| -=         | x -= 3  | x = x - 3  |
| *=         | x *= 3  | x = x * 3  |
| /=         | x /= 3  | x = x / 3  |
| %=         | x %= 3  | x = x % 3  |
| &=         | x &= 3  | x = x & 3  |
| \|=        | x \|= 3 | x = x \| 3 |
| ^=         | x ^= 3  | x = x ^ 3  |
| >>=        | x >>= 3 | x = x >> 3 |
| <<=        | x <<= 3 | x = x << 3 |

| Comparison | Name                     | Example |
| ---------- | ------------------------ | ------- |
| ==         | Equal to                 | x == y  |
| !=         | Not equal                | x != y  |
| >          | Greater than             | x > y   |
| <          | Less than                | x < y   |
| >=         | Greater than or equal to | x >= y  |
| <=         | Less than or equal to    | x <= y  |

| Logical | Name        | Example            |
| ------- | ----------- | ------------------ |
| &&      | Logical and | x < 5 &&  x < 10   |
| \|      | Logical or  | x < 5 \| x < 4     |
| !       | Logical not | !(x < 5 && x < 10) |

# math

```cpp
// Include the cmath library  
#include <cmath>  
  
cout << sqrt(64);  
cout << round(2.6);  
cout << log(2);
cout << max(5, 10);
cout << min(5, 10);
```

# condition and switch

```cpp
// condition
int x = 20;  
int y = 18;  
if (x > y) {  
  cout << "x is greater than y";  
}

// switch
int day = 4;  
switch (day) {  
  case 6:  
    cout << "Today is Saturday";  
    break;  
  case 7:  
    cout << "Today is Sunday";  
    break;  
  default:  
    cout << "Looking forward to the Weekend";  
}
```

# loop

```cpp
// while loop
int i = 0;  
while (i < 5) {  
  cout << i << "\n";  
  i++;  
}

// for loop
int i = 0;  
do {  
  cout << i << "\n";  
  i++;  
}  
while (i < 5);

// for loop
for (int i = 0; i < 5; i++) {  
  cout << i << "\n";  
}

```

using `break` in for loop will jump out of a loop:

```cpp
for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    break;  
  }  
  cout << i << "\n";  
}
```

using `continue` will skip a step in a loop:

```cpp
for (int i = 0; i < 10; i++) {  
  if (i == 4) {  
    continue;  
  }  
  cout << i << "\n";  
}
```

# array

array is to store multiple values with the same types

```cpp
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};
cout << cars[0];  // Outputs Volvo
cars[0] = "Opel";  
cout << cars[0]; // Now outputs Opel instead of Volvo

int myNum[3] = {10, 20, 30};
```

loop through an array

```cpp
string cars[5] = {"Volvo", "BMW", "Ford", "Mazda", "Tesla"};  
for (int i = 0; i < 5; i++) {  
  cout << cars[i] << "\n";  
}

int myNumbers[5] = {10, 20, 30, 40, 50};  
for (int i = 0; i < 5; i++) {  
  cout << myNumbers[i] << "\n";  
}

// using foreach loop  
for (int i : myNumbers) {  
  cout << i << "\n";  
}
```

array size

```cpp
int myNumbers[5] = {10, 20, 30, 40, 50};  
cout << sizeof(myNumbers); // Print 20

int myNumbers[5] = {10, 20, 30, 40, 50};  
int getArrayLength = sizeof(myNumbers) / sizeof(int);  
cout << getArrayLength; // Print 5
```

multi-dimensional array

```cpp
string letters[2][4] = {  
  { "A", "B", "C", "D" },  
  { "E", "F", "G", "H" }  
};  
  
cout << letters[0][2];  // Outputs "C"
for (int i = 0; i < 2; i++) {  
  for (int j = 0; j < 4; j++) {  
    cout << letters[i][j] << "\n";  
  }  
}

// we can also have 3-dimensional array with 3 for loops
```

# struct

create a variable `myStructure` as a struct:

```cpp
// Create a structure variable called myStructure  
struct {  
  int myNum;  
  string myString;  
} myStructure;  // or myStruct1, myStruct2, myStruct3; for multiple ones
  
// Assign values to members of myStructure  
myStructure.myNum = 1;  
myStructure.myString = "Hello World!";  
  
// Print members of myStructure  
cout << myStructure.myNum << "\n";  
cout << myStructure.myString << "\n";
```

named struct:

```cpp
// Declare a structure named "car"  
struct car {  
  string brand;  
  string model;  
  int year;  
};  
  
int main() {  
  // Create a car structure and store it in myCar1;  
  car myCar1;  
  myCar1.brand = "BMW";  
  myCar1.model = "X5";  
  myCar1.year = 1999;  
  
  // Create another car structure and store it in myCar2;  
  car myCar2;  
  myCar2.brand = "Ford";  
  myCar2.model = "Mustang";  
  myCar2.year = 1969;  
   
  // Print the structure members  
  cout << myCar1.brand << " " << myCar1.model << " " << myCar1.year << "\n";  
  cout << myCar2.brand << " " << myCar2.model << " " << myCar2.year << "\n";  
   
  return 0;  
}
```

# reference vs pointer

```cpp
string food = "Pizza";  
string &meal = food;  
  
cout << food << "\n";  // Outputs Pizza  
cout << meal << "\n";  // Outputs Pizza
```

To access memory address or reference, use the `&` operator, and the result will represent where the variable is stored:

```cpp
string food = "Pizza";
cout << &food; // Outputs 0x6dfed4
```

A **pointer** however, is a variable that **stores the memory address as its value**.

```cpp
string food = "Pizza";  // A food variable of type string  
**string* ptr = &food;**    // A pointer variable, with the name ptr, that stores the address of food  
  
// Output the value of food (Pizza)  
cout << food << "\n";  
  
// Output the memory address of food (0x6dfed4)  
cout << &food << "\n";  
  
// Output the memory address of food with the pointer (0x6dfed4)  
cout << ptr << "\n";
```

# function

definition

```cpp
void myFunction(string fname) {  
  cout << fname << " Refsnes\n";  
}  
  
int main() {  
  myFunction("Liam");  
  myFunction("Jenny");  
  myFunction("Anja");  
  return 0;  
}
```

function overloading with the same name but different parameters

```cpp
int plusFuncInt(int x, int y) {  
  return x + y;  
}  
  
double plusFuncDouble(double x, double y) {  //also fine to return int
  return x + y;  
}  
  
int main() {  
  int myNum1 = plusFuncInt(8, 5);  
  double myNum2 = plusFuncDouble(4.3, 6.26);  
  cout << "Int: " << myNum1 << "\n";  
  cout << "Double: " << myNum2;  
  return 0;  
}
```

recursion

```cpp
int sum(int k) {  
  if (k > 0) {  
    return k + sum(k - 1);  
  } else {  
    return 0;  
  }  
}  
  
int main() {  
  int result = sum(10);  
  cout << result;  
  return 0;  
}
```