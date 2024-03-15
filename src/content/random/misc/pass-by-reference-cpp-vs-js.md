In C++, if we pass an object without `&` to a parameter, a compiler will make a copy of it:

```cpp
vector<int> arr = {1,2,3};
void random1(vector<int> testArr) {
	testArr.push_back(4); // original arr is not modified
}
void random2(vector<int> &testArr) {
	testArr.push_back(4); // original arr becomes {1,2,3,4}
}
```

In Javascript, it we pass by *an object* then we pass it by a reference.

```javascript
let arr = [1, 2, 3];
function random(testArr) {
	testArr.push(4); // original arr becomes [1,2,3,4]
}
```

But if we pass by *a primitive value*, it still copies the parameter:

```javascript
let a = 10;
function random(testNumber) {
	testNumber += 1;
}
random(a); // a is still 10;
```

**This behavior in Javascript is same as Java, C# (I think so 😄). And C++ is same as Go or Rust.**