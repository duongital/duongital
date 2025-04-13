---
title: 'Programming Languages'
description: 'I use Python and JS most of the time'
---

## 🟨 JavaScript Basics

### 1. Primitive Data Types

JavaScript supports:

- **Number**: `let x = 42;`
- **String**: `let name = "Alice";`
- **Boolean**: `let isActive = true;`
- **Null**: `let nothing = null;`
- **Undefined**: `let y;` (a variable declared but not assigned)

### 2. Collections

- **Array (list)**: `let fruits = ["apple", "banana", "cherry"];`
- **Set**: `let unique = new Set([1, 2, 3]);`
- **Map**:

```javascript
let user = new Map()
user.set('name', 'Alice')
user.set('age', 25)
```

JavaScript does not have a built-in `tuple` type like Python.

### 3. Conditionals

```javascript
if (score > 90) {
  console.log('Excellent!')
} else if (score > 75) {
  console.log('Good job!')
} else {
  console.log('Keep trying!')
}
```

### 4. Switch Case

```javascript
switch (day) {
  case 'Monday':
    console.log('Start of the week!')
    break
  case 'Friday':
    console.log('Almost weekend!')
    break
  default:
    console.log('Another day!')
}
```

### 5. Loops

- **For loop**:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i)
}
```

- **While loop**:

```javascript
let i = 0
while (i < 5) {
  console.log(i)
  i++
}
```

- **Skip (continue) and exit (break)**:

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) continue
  if (i === 8) break
  console.log(i)
}
```

### 6. Check Type

```javascript
typeof 42 // "number"
typeof 'hello' // "string"
Array.isArray([]) // true
```

### 7. Exit Program (in Node.js)

```javascript
process.exit(0)
```

### Javascript / Typescript

Count apperance of character in an array:

```javascript
let m = new Map()
for (const e of arr) {
  m.set(e, (m.get(e) || 0) + 1)
}
```

---

## 🟦 Python Basics

### 1. Primitive Data Types

Python uses:

- **Integer**: `x = 42`
- **Float**: `pi = 3.14`
- **String**: `name = "Alice"`
- **Boolean**: `is_active = True`
- **None**: `value = None`

### 2. Collections

- **List**: `fruits = ["apple", "banana", "cherry"]`
- **Set**: `unique = {1, 2, 3}`
- **Dictionary (like Map)**: `user = {"name": "Alice", "age": 25}`
- **Tuple**: `coordinates = (10, 20)`

### 3. Conditionals

```python
if score > 90:
    print("Excellent!")
elif score > 75:
    print("Good job!")
else:
    print("Keep trying!")
```

### 4. Switch Case Alternative

Python doesn't have a built-in `switch`. You can use `if-elif-else` or dictionaries:

```python
actions = {
    "start": "Starting...",
    "stop": "Stopping...",
    "pause": "Pausing..."
}
print(actions.get(command, "Unknown command"))
```

### 5. Loops

- **For loop**:

```python
for i in range(5):
    print(i)
```

- **While loop**:

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

- **Skip (continue) and exit (break)**:

```python
for i in range(10):
    if i == 5:
        continue
    if i == 8:
        break
    print(i)
```

### 6. Check Type

```python
type(42)         # <class 'int'>
type("hello")    # <class 'str'>
isinstance([], list)  # True
```

### 7. Exit Program

```python
exit()
# or
import sys
sys.exit()
```
