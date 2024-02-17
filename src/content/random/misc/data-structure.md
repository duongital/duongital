---
title: Data Structure
description: All types of Data Structure that we use everyday.
tags:
  - hello
  - backlog
  - react
---

# 🥕 arrays representations

---

# 🥕 array ADT

## introduction to array

{{ array }} is a vector type, include same type for every block.
<!--SR:!2024-02-04,4,270-->

on address memory, they are grouped together and closely next to each other.

## declaration of array

`int A[5]`: list of 5 integers next to each other, nothing is init => garbage values inside each element

`int A[3] = {1,2,3}`: declare and init

`int A[3] = {1}` has result [1,0,0]

we can access element of array:

- A[2]
- 2[A]
- `*(A+2)`

note: if we count address of each element of array, we can see that those all element positioned next to each other and separate by 4 bytes: `0x61fdc8, 0x61fdcc, 0x61fdd0`

## static vs dynamic array

in c++, array size can be created on run time with `cin` input from the user. but in c, we can't do that.

normally, fixed array created on stack, but if we want create on heap memory we use keyword `new` and pointer to it. for example: `int* p; p = new int[5]`. remember to delete memory after not using this pointer in heap by `delete []p`.

accessing element in stack and heap are same: A[0] = 5;

## how to increase array size

create a new array and pointer the old to the new one, remember to delete the old one to avoid memory leak.

```cpp
int *p, *q;
p = (int*) malloc(5*sizeof(int));
p[0]=0;p[1]=2;p[2]=2;p[3]=3;p[4]=4;p[5]=5;
free(p); //remove p avoid memory leak
q = (int*) malloc(5*sizeof(int));
for (int i=0; i<5; i++) // copy old values to new array
    q[i] = p[i]);
p = q;
```

## 2d arrays

there are 3 ways to create 2d arrays:

- on stack: int A[2][2] = {{1,2},{1,2}}
- on heap: int* A[2], and then A[0] = new int[2], A[1] = new int[2]
- all on heap: int** A; A = new int* [2]; ... add element same as 2nd step
<!--SR:!2024-02-01,1,230-->

note: double pointer (**) helps create variable directly on `heap`

## array representation by compiler

in code, variable name will be converted to address. for example: address(A[3]) = 200 + 3*2 = 206 = Lo + i * sizeof(type)

fact: this is should explain why index getting started with 0, because it's easier to query and faster and simpler in formular. Just think that the index started at 1, then the formular: Lo + (i-1)*sizeof(type) // why complicated

## row major formula for 2d arrays

array A with size: m x n
address(A[i][j]) = Lo + [i*n + j] * sizeof(type)
1 2 3 2012
4 5 6 2024
7 8 9 2036
10 11 12 2048

## column major formular for 2d arrays

address(A[i][j]) = Lo + [i + j*m] * sizeof(type)

## formulas for nD arrays

row major: 
address(A[i1][i2][i3][i4]) = Lo + [i1*d2*d3*d4 + i2*d3*d4 + i3*d4 + i4]*w

column major:
address: see formula in clip and then overall with n dimesion

note: normal multiplication take n^2 time complex, we can reduce by using Horner's rule to n time only.

## formulas for 3d arrays

use double ** to see the value of nD array value, e.g: `**(A + 1)`

---

# 🥕 string

---

# 🥕 matrix

---

# 🥕 sparse matrix and polynomial representation

---

# 🥕 linked list

---

# 🥕 sparse matrix and polynomial using linked list

---

# 🥕 stack

---

# 🥕 queue

---

# 🥕 tree

---

# 🥕 binary search tree

---

# 🥕 AVL tree

---

# 🥕 search tree

---

# 🥕 heap tree

---

# 🥕 sorting techniques

---

# 🥕 hashing techniques

---

# 🥕 graph

---

# 🥕 asymptotic notations

---
