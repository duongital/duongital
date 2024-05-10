---
title: 'Java'
description: 'Cheatsheet on Java language'
---

# primitive variables

Java has eight primitive data types. They are:

1. **byte:** This is an 8-bit signed two's complement integer. It has a minimum value of -128 and a maximum value of 127 (inclusive).

2. **short:** This is a 16-bit signed two's complement integer. It has a minimum value of -32,768 and a maximum value of 32,767 (inclusive).

3. **int:** This is a 32-bit signed two's complement integer. It has a minimum value of -2,147,483,648 and a maximum value of 2,147,483,647 (inclusive).

4. **long:** This is a 64-bit signed two's complement integer. It has a minimum value of -9,223,372,036,854,775,808 and a maximum value of 9,223,372,036,854,775,807 (inclusive).

5. **float:** This is a single-precision 32-bit IEEE 754 floating point. Its range of values is beyond the scope of this response, but it can represent numbers from approximately 1.40 x 10^-45 to 3.40 x 10^38.

6. **double:** This is a double-precision 64-bit IEEE 754 floating point. Its range of values is also beyond the scope of this response, but it can represent numbers from approximately 4.94 x 10^-324 to 1.79 x 10^308.

7. **char:** This is a single 16-bit Unicode character. It has a minimum value of '\u0000' (or 0) and a maximum value of '\uffff' (or 65,535 inclusive).

8. **boolean:** This has only two possible values - true and false.

These primitive data types are the building blocks for creating more complex data structures in Java.

# boilerplate

```java
public class App {
	public static void main(String[] args) throws Exception {
		System.out.printf("Hello, World!");
	}
}
```

# data structures

## array

```java
// one direction
int[] nums = {1, 2, 3, 4};
System.out.println(nums[0]);
for (int i=0; i<nums.length; i++)
	System.out.println(i);

// two directions
int[][] matrix = {
	{ 1, 2, 3 },
	{ 4, 5, 6 }
};
for (int i = 0; i < matrix.length; i++)
	for (int j = 0; j < matrix[i].length; j++)
		System.out.println(matrix[i][j]);

```

## String

```java
String str = "Hello, World!";
int length = str.length(); 
boolean isEmpty = str.isEmpty();
str = str.concat(" New Text");
str = str.toUpperCase();
str = str.toLowerCase();

```

## ArrayList (collection)

```java
import java.util.ArrayList;

ArrayList<String> list = new ArrayList<String>();
list.add("Item1");
list.add("Item2");
list.add("Item3");
list.remove(0); // Remove the item at position 0
System.out.println(list); // [Item2, Item3]
```

## Set (collection)

```java
import java.util.HashSet;

// cannot use primitive types like `int` as type arguments for generic classes such as `HashSet`
HashSet<Integer> set = new HashSet<Integer>();
set.add(1);
set.remove(1);
boolean isEmpty = set.isEmpty();
boolean hasOne = set.contains(1);
int size = set.size();
boolean contains = set.contains(1);
for (Integer num : set)
	System.out.println(num);
```

## Map (collection)

```java
import java.util.HashMap;

HashMap<String, String> map = new HashMap<>();
map.put("key1", "value1"); 
map.put("key2", "value2");
map.remove("key1");
String g = map.get("key1")
System.out.println("Map size: " + map.size());

for (String i : map.keySet())
  System.out.println("key: " + i + " value: " + map.get(i));
```

add a value to the map

```java
// check if key exists in map 
Map<String, Integer> map = new HashMap<>();
if (map.containsKey(key)) {  
	int currentValue = map.get(key); 
	map.put(key, currentValue + 1); 
} else { 
	map.put(key, 1);
}
```

or in short `map.compute(key, (k, v) -> (v == null) ? 1 : v + 1);`

# Math

```java
double num = 25.0; 
double squareRoot = Math.sqrt(num);

float num = 4.6f; int roundedNum = Math.round(num);

double num = 10.0; double logValue = Math.log(num); // base e

int num1 = 100; int num2 = 200; 
int maxValue = Math.max(num1, num2);
int minValue = Math.min(num1, num2);
```

# switch case

```java
int day = 3; 
String dayOfWeek; 
switch (day) { 
	case 1: 
		dayOfWeek = "Monday"; 
		break; 
	case 2: 
		dayOfWeek = "Tuesday"; 
		break; 
	case 3: 
		dayOfWeek = "Wednesday"; 
		break; 
	case 4: 
		dayOfWeek = "Thursday"; 
		break; 
	case 5: 
		dayOfWeek = "Friday"; 
		break; 
	case 6: 
		dayOfWeek = "Saturday"; 
		break; 
	case 7: 
		dayOfWeek = "Sunday"; 
		break; 
	default: 
		dayOfWeek = "Invalid day"; 
		break; 
} 
System.out.println("Day of the week: " + dayOfWeek);
```

# loop

break vs continue:

```java
// Using 'continue'
for(int i = 0; i < 5; i++){
    if (i == 3) {
        continue; // Skips the rest of the loop 
    }
    System.out.print(i); // Prints 0124, skipping 3
}

// Using 'break'
for(int i = 0; i < 5; i++){
    if (i == 3) {
        break; // Exits the loop entirely
    }
    System.out.print(i); // Prints 012, exits the loop before 3
}

```

# OOP

IPEA: Inheritance, Polymorphism, Encapsulation, Abstract

## inheritance with `extends`

```java
class Vehicle {
  protected String brand = "Ford";        // Vehicle attribute
  public void honk() {                    // Vehicle method
    System.out.println("Tuut, tuut!");
  }
}

class Car extends Vehicle {
  private String modelName = "Mustang";    // Car attribute
  public static void main(String[] args) {

    // Create a myCar object
    Car myCar = new Car();

    // Call the honk() method (from the Vehicle class) on the myCar object
    myCar.honk();

    // Display the value of the brand attribute (from the Vehicle class) and the value of the modelName from the Car class
    System.out.println(myCar.brand + " " + myCar.modelName);
  }
}
```

## polymorphism with `override` and `overload`

```java
class Animal {
    void sound() {
        System.out.println("The animal makes a sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("The dog barks");
    }
}

class Cat extends Animal {
    void sound() {
        System.out.println("The cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        myAnimal.sound(); // Output: The animal makes a sound
        myDog.sound();    // Output: The dog barks
        myCat.sound();    // Output: The cat meows
    }
}

```

```java
class Animal {
    void sound() {
        System.out.println("The animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("The dog barks");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("The cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        myAnimal.sound(); // Output: The animal makes a sound
        myDog.sound();    // Output: The dog barks
        myCat.sound();    // Output: The cat meows
    }
}
```

## encapsulation with: `privated`, get set functions

```java
public class Person {
  private String name; // private = restricted access

  // Getter
  public String getName() {
    return name;
  }

  // Setter
  public void setName(String newName) {
    this.name = newName;
  }
}
```

## abstract with: `abstract` class or `interface`

```java
// Abstract class
abstract class Animal {
  // Abstract method (does not have a body)
  public abstract void animalSound();
  // Regular method
  public void sleep() {
    System.out.println("Zzz");
  }
}

// Subclass (inherit from Animal)
class Pig extends Animal {
  public void animalSound() {
    // The body of animalSound() is provided here
    System.out.println("The pig says: wee wee");
  }
}

class Main {
  public static void main(String[] args) {
    Pig myPig = new Pig(); // Create a Pig object
    myPig.animalSound();
    myPig.sleep();
  }
}
```

```java
// Interface
interface Animal {
  public void animalSound(); // interface method (does not have a body)
  public void sleep(); // interface method (does not have a body)
}

// Pig "implements" the Animal interface
class Pig implements Animal {
  public void animalSound() {
    // The body of animalSound() is provided here
    System.out.println("The pig says: wee wee");
  }
  public void sleep() {
    // The body of sleep() is provided here
    System.out.println("Zzz");
  }
}

class Main {
  public static void main(String[] args) {
    Pig myPig = new Pig();  // Create a Pig object
    myPig.animalSound();
    myPig.sleep();
  }
}
```