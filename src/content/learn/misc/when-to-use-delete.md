In C++, the `delete` operator is used to deallocate memory that was previously allocated dynamically using the `new` operator. This is crucial for managing memory in your programs and preventing memory leaks. Here are some scenarios where you might use `delete`:

1. **When you're done with a dynamic object:** If you've created a dynamic object (an object that was allocated on the heap), you should delete it once you're done using it. This is because dynamic objects persist beyond the lifetime of the function or block where they were created, and failing to delete them can lead to memory leaks [Source 1](https://stackoverflow.com/questions/26695393/when-do-i-have-to-delete-a-pointer).

```cpp
Fraction* f1 = new Fraction(); // dynamic object
// do something with f1
delete f1; // delete when done
```

2. **When reassigning a pointer to a new object:** If you reassign a pointer to a new object without first deleting the old object, you can create a memory leak. To avoid this, you should delete the old object before assigning the pointer to a new one [Source 1](https://stackoverflow.com/questions/26695393/when-do-i-have-to-delete-a-pointer).

```cpp
Fraction* f1 = new Fraction(); // dynamic object
f1 = new Fraction(); // reassign without deleting old object
// This can lead to a memory leak

// Instead, do:
Fraction* f1 = new Fraction(); // dynamic object
if(f1) {
    delete f1; // delete old object before reassigning
    f1 = new Fraction(); // now safe to reassign
}
```

3. **When deleting an array:** If you've created a dynamic array, you should delete it using `delete[]` instead of `delete`. This is because `delete` only deallocates memory for a single object, whereas `delete[]` deallocates memory for an entire array [Source 2](https://learn.microsoft.com/en-us/cpp/cpp/delete-operator-cpp?view=msvc-170).

```cpp
int* arr = new int[10]; // dynamic array
// do something with arr
delete[] arr; // delete the array
```

4. **When deleting a pointer to a dynamic object:** If you have a pointer to a dynamic object, you should delete it when you're done using it. The pointer itself isn't deleted, but the memory it points to is [Source 3](https://www.geeksforgeeks.org/delete-in-c/).

```cpp
Fraction* f1 = new Fraction(); // dynamic object
// do something with f1
delete f1; // delete the dynamic object
```

Remember, every `new` should have a corresponding `delete`, and every `new[]` should have a corresponding `delete[]`. Failing to do so can lead to memory leaks, which can cause your program to consume more and more memory over time.