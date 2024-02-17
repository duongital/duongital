**C and C++ notes**

- programming: syntax only, problem solving: math => life time

- `using namespace std` means: in the header file, it has `std` namespace and we want to use it for not repeating `std::something`. Example `#include <string>` or `#include <iostream>` and then using namespace std means: the std namespace of those two headers: _string and iostream_

- example with all data types

```cpp
// simple declare and print out data type
int d;
long int ld;
char c;
float f;
double lf;
scanf("%d %ld %c %f %lf", &d, &ld, &c, &f, &lf);
printf("%d\n%ld\n%c\n%f\n%lf", d, ld, c, f, lf);
```

---

# 🥕 installation

- windows 10: install minGW
- ubuntu: sudo apt install build-essential
- macos: has `clang` installed by default
```bash
# install nvim with kickstarter and clangd lsp
$ clang++ main.cpp -o main
```

# 🥕 essential C C++ concepts__

## general ideas

windows 10: install minGW compiler version 32_64bits to use 64 bits and we will have pointer size at 8 bytes, by default it's set at 4 bytes (not good for learning)

in C, we don't have data structure support by default. In C++, there are something like collections in java and has some built-in data structures

the initial values of array that we don't define value is 0

C++ can read library in C, for e.g: `#include <stdio.h>`

program: code section, stack memory, heap memory

all codes are running on code section and stack memory

to accessing heap memory => using pointer

pointer has 8 bytes in memory and also has its own address

## pointer to array in stack

- program can't access outside things like: heap, keyboards, internet, disk... To do that we need pointer
- pointer is also having memory to hold it (int, bool...)
- pointer can pointing to stack/ heap
- malloc always stays in heap (C), use new keyword in (C++) stays in heap also

```cpp
int main() {
    int arr[4] = {1,2,3,4};
    //int (*p)[4] = &arr;
    int *p = &arr[0]; // only pointing to the first element

    for (int i=0; i<4; i++)
        cout<<arr[i]<<endl;

    for (int i=0; i<4; i++)
        cout<<p[i]<<endl;

    return 0;
}
```

## pointer to array in heap

remember to delete variable in heap after using them

every type of pointer take 8 bytes in memory

```cpp
int main() {
    int *p;

    // p = (int *) malloc(4 * sizeof(int));
    p = new int[5] // C++ syntax

    p[0] = 1; p[1] = 2; p[2] = 3; p[3] = 4;

    for (int i=0; i<4; i++)
        cout << p[i] << endl;

    delete [] p; // in C: we use free(p)
    return 0;
}
```

## reference (only available in C++)

- use `&r = a` to create a reference to variable a
- r and a have the same value and address positions, just different in names
- it's useful for param passing

## pointer to a struct

- accessing a struct using pointer: `(*p).length = 10` or `p->length = 10`
- accessing original struct: `p.length = 10`
- `malloc` is a function that return a pointer, so we usually de-reference (type casting) it by \*

### create struct in stack

```cpp
struct Rectangle {
    int length;
    int breadth;
};

int main() {
    Rectangle r = {10, 5}; // in C, it requires struct before Rectangle
    cout << r.length << endl;
    cout << r.breadth << endl;

    Rectangle *p = &r;
    cout << p->length << endl;
    cout << p->breadth << endl;

    return 0;
}

```

### create struct in heap

```cpp
struct Rectangle {
    int length;
    int breadth;
};

int main() {
    Rectangle *p;
    // p = (struct Rectangle *) malloc(sizeof(struct Rectangle));
    p = new Rectangle; // C++ syntax
    p->breadth = 15;
    p->length = 7;
    cout << p->breadth << endl;
    cout << p->length << endl;
    return 0;
}
```

## functions

- in C: param passed by value, address. In C++: param passed by value, address and reference
- grouping data => struct; grouping instructions => function
- function called as: module, procedure
- variables belong to function scope => can be same names in different functions

## parameter passing method

__passing by value__ will not change original values => they are copied and changed in function scope only

```cpp
int add(int a, int b) {
    int c = a + b;
    return c;
}

int main() {
    int num1 = 2, num2 = 3, sum;
    sum = add(num1, num2);
    cout << sum << endl;
    return 0;
}
```

__passing by address__ will change the original values by using pointer, eg: swap(&a, &b)

```cpp
void swap(int *a, int *b) {
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int num1 = 2, num2 = 3;
    swap(&num1, &num2);
    cout << num1 << endl;
    cout << num2 << endl;
    return 0;
}
```

__passing by reference__ (feature of C++): focus of define function `void swap(int &a, int &b) {}`, passing like this - the varaibles are not copied and not create new stack => all happens in main function and variable stays at same scope.

```cpp
void swap(int &a, int &b) {
    int temp;
    temp = a;
    a = b;
    b = temp;
}

int main() {
    int num1 = 2, num2 = 3;
    swap(num1, num2);
    cout << num1 << endl;
    cout << num2 << endl;
    return 0;
}
```

## array as parameter

array only passed as address (pointer) while struct call be called as value, address and reference

param: `arr[]` means pointer to array address `arr`, or we can use `*arr`

example of a function can return an array

```cpp
int * function(int n) { // int [] function(int n)
    int *p;
    p = (int *) malloc(n*sizeof(int));
    return p;
}

int main() {
    int *arr;
    arr = fun(5);
}
```

example of creating array from heap and return in main function

```cpp
int * fun(int size) {
    int *p;
    p = new int[size];
    for (int i=0; i<size; i++)
        p[i] = i+1;
    return p;
}

int main() {
    int *ptr, sz = 5;
    ptr = fun(sz);
    for (int i=0; i<sz; i++)
        cout << ptr[i] << endl;
    return 0;
}
```

## struct as paramenter

struct can be called as value, address and reference (C++)

__call by value__: if we change struct in function, the original won't change

```cpp
struct Rect {
    int length;
    int breadth;
};

int area(Rect r) {
    return r.length * r.breadth;
}

int main() {
    Rect r = {10, 20};
    cout << area(r) << endl;
    return 0;
}
```

__call by value__: if we change struct in function, the original changes

```cpp
int area(Rect &r) { // if we change attributes of r, the original struct changed
    return r.length * r.breadth;
}
```

__call by address__: if we change struct in function, the original changes

```cpp
struct Rect {
    int length;
    int breadth;
};

int changeLength(Rect *r) {
    r->length = 9;
}

int main() {
    Rect r = {10, 20};
    changeLength(&r);
    cout << r.length << endl;
    return 0;
}
```

struct contains array inside of it, what if we pass that struct as param => array will be copied? The answer is YES, the compiler will handle this for us.

example of create a struct in heap memory and print out values

```cpp
struct Rect {
    int length;
    int breadth;
};

Rect* fun() {
    Rect* p;
    p = new Rect {10, 20};
    return p;
}

int main() {
    Rect* p = fun();
    cout << p->length << endl;
    cout << p->breadth << endl;
    return 0;
}
```

## struct vs. function

in C language, functions relating to struct are usually defined in same place. This is to show the relationship and also the style of C language.

## convert C to C++

in C, there're lots of functions relating to struct => the question is why they are not grouped together. That's the reason why in C++ we have `class`.

## monolithic program

all functions executed in main function

## modular program

separate functions into smaller modules and execute in sequence

## oop concept

example of rectangle and calculate area

```cpp
class Rect {
private:
    int length;
    int breadth;
public:
    Rect() {
        length = 0;
        breadth = 0;
    }

    Rect(int l, int b) {
        length = l;
        breadth = b;
    }

    int area() {
        return length * breadth;
    }

    void setLength(int l) {
        length = l;
    }

    int getLength() {
        return length;
    }

    ~Rect() {
        cout << "destructor";
    }
};

int main() {
    Rect r(10, 20);
    cout <<"area: "<<r.area()<<endl;

    return 0;
}
```

template class is equal to generic class

example above using template class

```cpp
template <class T>
class Rect {
private:
    T length;
    T breadth;
public:
    Rect(T l, T b) {
        this->length = l;
        this->breadth = b;
    }

    T area();
};

template <class T>
T Rect<T>::area() {
    return this->length * this->breadth;
}

int main() {
    Rect<int> r(10, 20);
    cout <<"area: "<<r.area()<<endl;
    return 0;
}
```

---

# 🥕 stack, heap, ADT, complexity

ADT is abstract data types (stack, heap), for example: stack is a ADT to show that this is a list FIFO and we don't know how it is implemented. Actually the stack can be implemented by linked list or binary tree but we don't care about the code, just know how to create and its methods.

## types of data

all data saved on hard disk, including software: MS Word

when MS Word executed => loading to RAM => CPU will execute codes line by line

data structure is part on running program, after loading on RAM in forms: array, map, images, videos...

main types of data:

- data structure: using on RAM
- database: relational database with tables
- data warehouse: legacy data saved for history and analyse
- data mining:
- big data: using and analyse very big data

## stack vs heap

### stack 

every byte has its own address, even boolean is 1 byte, integer is 4 bytes, pointer 8 bytes

RAM includes so many segemt, each segment is 64Kb (65535 bytes)

each segment has 3x sections: heap, stack, code section

what is static memory: memory allocating at compile time (before runtime)

every functions call will create a stack. So how much memory is located for a function? It depends on the number of variables declared in that functions. The size is also depends on compiler, computer... Variables created on function calls and destroyed as function ends

### heap

heap is used for non-organized memory, treating as a resource (can think as a printer with request and response). Program can't access heap directly, using pointer is the only way to do that.

memory leak: there are lots of memories in heap that are not destroyed after using



## physical vs logical data structures

physical DS: we can see or imagine it, for example array and linked list. array can be created on stack or heap but linked list just created on heap only.

logical DS: stack, queue, tree, graph, hash table. These are create based on either array or linked list or combination of two (physical DS).

## abstract data type (ADT)

data type: representation of data and operation on data. For example: integer is 4 bytes (represetation) and can be + - * / (operation).

example above is primitive data, in contrast if we don't know operation or how it implemented we will call them as abstract data => List expose methods: add() remove() search()... 

---

# 🥕 recursion

## concept

tracing tree: is a tree that represent how recursive function works

be careful with statement stay before and after recursive function, it decides how statements to be called and print out the screen

```cpp
void func(int n) {
    if (n > 0) {
        cout << n; // calling phase (ascending): print 3 2 1
        func(n - 1);
        cout << n; // returning phase (descending): print 1 2 3
    }
}

int main() {
    int x = 3;
    func(x);
}
```

in recursion we have two phases: calling phase and return phase, imagine we are going to a line of rooms and we step in room by room, in each room we turn off the light, after the last room we must go back in order to reach the previous main gate. Remeber that the action turning off the light comes after moving on every room, so the man will go throught all the room and turning off the light on his way back.

**loop just only has ascending phase but recursion has ascending & descending phases.**

## how recursion uses stack

every function call will create new stack and drop it after the function is ended.

## recurrence relation - time complexity of recursion

## static and global variables in recursion

declare a variable outside or global scope will stay in main function and saved there. If we increase it, it will be remembered and not delete on every stack of recursion drops.

instead of using global variable we can use `static int x = 10` inside that function.

## tail recursion (1/5)

there are 5 types of recursion: tail, head, tree, indirect, nested

tail: call main function itself at last line, no execution at returning time

every tail recursion can be converted to while loop and vice versa, but space complexity of while is O(1) and tail recursion is O(n). In some compiler, it's smart and would find the way to convert from tail recursion to while for optimize space complexity. Notes: time complexity of those two are the same at O(n)

## head recursion (2/5)

opposite to tail recursion, actions are called after main function calling itselft, no execution at calling time

head recursion can be converted to while loop but it's not easy

## tree recursion (3/5)

the tail and head recursion above just call main function one time => this is called linear recusion. in some cases, we want to call that main function more than one time => this is tree recursion

```cpp
void func(int n) {
    if (n > 0) {
        cout << n << endl;
        func(n-1); // calling the 1st time
        func(n-1); // calling the 2nd time
    }
}
```

## indrect recursion (4/5)

function A calls function B, and in function B it calls function A, until the condition is not satisfied the recusion will be ended.

in code, if the errors notify that function B is not defined, we can mock a dummy function like this: `void funcB(int n)` to avoid.

## nested recursion (5/5)

pass recursive function to the parameter => recusive inside recursive

```cpp
int fun(int n) {
    if (n > 100) {
        return n - 10;
    } else {
        return fun(fun(n + 11));
    }
}

// fun(95) => result is 91
```

## sum of natural number using recursion

we have 3 ways to solve this problem:

- math: equal to n(n-1)/2 take time O(1)
- for loop: take time O(n) but space is O(1)
- recursion: time and space are O(n)

```cpp
int sum(int n) {
    if (n == 0) {
        return 0;
    } else {
        return sum(n - 1) + n;
    }
}
```

note: sum is executed at returning phase

## factorial using recursion

```cpp
int factorial(int n) {
    if (n == 0) {
        return 1;
    } else {
        return factorial(n - 1) * n;
    }
}
```

note: sum is executed at returning phase

## power using recursion

```cpp
int power(int m, int n) { // m^n
    if (n == 0) {
        return 1;
    } else {
        return power(m, n-1) * m;
    }
}
```

we can reduce times called by using optimization and refactoring above function. 

note: sum is executed at returning phase

## Taylor series using recusion

logarit with natural expotional

e^x = 1 + x/1 + x^2/2! + x^3/3! + ... + x^n/n!

`static` is keyword to init variable once and it lives the whole lifetime of the program

```cpp
int e(int x, int n) {
    static int p=1, f=1;
    int result;
    if (n==0) {
        return 1;
    }
    else {
        r = e(x, n-1);
        p=p*x;
        f=f*n;
        return r + p/f;
    }
}
```

note: the larger n, the more precise of result. time complex: O(n^2)

## Taylor series using Horner's rule

target: reduce from time complexicty => O(n)

if recursion happens on calling phase => can be used loop easily

```cpp
double e(int x, int n) {
    double s=1;
    int i;
    double num=1;
    double den=1;
    for (i=1; i<=n; i++) {
        num*=x; den*=i;
        s+=num/den;
    }
    return s;
}
```

solution by recursion:

```cpp
double e(int x, int n) {
    static double s;
    if (n == 0) {
        return s;
    } else {
        s = 1 + x/n*s;
    }
    return e(x, n-1);
}
```

## Fibonaci series using recursion

```cpp
int fib(int n) { // time complexity: 2^n
    if (n<=1)
        return n;
    return fib(n-2) + fib(n-1);
}
```

above function calls multiple times for the same minor functions. to avoid this we can use `memoization` technique.

```cpp
int F[10]; // -1 for all 10 spaces of array, need util func to do
int fib(int n) { // time complexity: n
    if (n<=1) {
        F[n] = n;
        return n;
    } else {
        if (F[n-2] == -1)
            F[n-2] = fib(n-2);
        if (F[n-1] == -1)
            F[n-1] = fib(n-1);
        return F(n-2) + F(n-1);
    }
}
```

## nCr using recursion

## tower of Hanoi problem

problem goes here

---
