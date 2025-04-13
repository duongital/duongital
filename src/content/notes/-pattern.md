---
title: 'Design Patterns in Programming'
description: 'Some design patterns in OOP languages: Java, C++... and functional ones: Javascript, Python...'
---

# **functional programming**

## closure

A closure is when a function "remembers" variables from outside its own scope. It lets inner functions access variables from an outer function even after the outer one has finished running.

```python
def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    return inner

counter = outer()
print(counter())  # 1
print(counter())  # 2
```

## currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking one argument.

```python
def add(a):
    def inner(b):
        return a + b
    return inner

add5 = add(5)
print(add5(3))  # 8
```

# **object oriented programming**

## oop - creation

### factory method

```python
class Generator:
    def generate(self, type):
        pass

class FactoryNike(Generator):
    def generate(self, type):
        return f"Nike {type}"

factory1 = FactoryNike()
print(factory1.generate("ao_thun"))
```

### abstract factory

```python
class KingdomFactory:
    def create_king(self): pass
    def create_army(self): pass
    def create_castle(self): pass
```

### builder

```python
class Burger:
    def __init__(self):
        self.bread = None
        self.meat = None

class BurgerBuilder:
    def __init__(self):
        self.burger = Burger()

    def set_bread(self, bread):
        self.burger.bread = bread
        return self

    def set_meat(self, meat):
        self.burger.meat = meat
        return self

    def build(self):
        return self.burger
```

### prototype

```python
import copy

class Sheep:
    def clone(self):
        return copy.deepcopy(self)
```

### singleton

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
```

## oop - struct

### adapter

```python
class OldPrinter:
    def print_old(self):
        print("Old Printer")

class PrinterAdapter:
    def __init__(self):
        self.old_printer = OldPrinter()

    def print(self):
        self.old_printer.print_old()
```

### bridge

```python
class DrawAPI:
    def draw_circle(self):
        pass

class RedCircle(DrawAPI):
    def draw_circle(self):
        print("Red Circle")

class Circle:
    def __init__(self, draw_api):
        self.draw_api = draw_api

    def draw(self):
        self.draw_api.draw_circle()
```

### composite

Treats individual objects and groups of objects the same way.

```python
class Component:
    def operation(self):
        pass

class Leaf(Component):
    def __init__(self, name):
        self.name = name

    def operation(self):
        print(f"Leaf: {self.name}")

class Composite(Component):
    def __init__(self, name):
        self.name = name
        self.children = []

    def add(self, component):
        self.children.append(component)

    def operation(self):
        print(f"Composite: {self.name}")
        for child in self.children:
            child.operation()

# Usage
leaf1 = Leaf("A")
leaf2 = Leaf("B")
tree = Composite("Root")
tree.add(leaf1)
tree.add(leaf2)

sub_tree = Composite("Sub")
sub_tree.add(Leaf("C"))
tree.add(sub_tree)

tree.operation()
```

### decorator

Adds behavior to objects at runtime without changing their class.

```python
class Coffee:
    def cost(self):
        return 5

class MilkDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 2

class SugarDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 1

# Usage
coffee = Coffee()
coffee_with_milk = MilkDecorator(coffee)
coffee_with_milk_and_sugar = SugarDecorator(coffee_with_milk)

print("Total cost:", coffee_with_milk_and_sugar.cost())  # Output: 8
```

### facade

Simplifies access to a large system by providing a unified interface.

```python
class CPU:
    def freeze(self):
        print("CPU freeze")

    def execute(self):
        print("CPU executing")

class Memory:
    def load(self, position, data):
        print(f"Loading {data} into memory at {position}")

class HardDrive:
    def read(self, sector, size):
        return f"Data from sector {sector}"

class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()

    def start(self):
        self.cpu.freeze()
        data = self.hard_drive.read(100, 20)
        self.memory.load(0, data)
        self.cpu.execute()

# Usage
computer = ComputerFacade()
computer.start()
```

### flyweight

Minimizes memory usage by sharing data between similar objects.

```python
class TreeType:
    def __init__(self, name, color):
        self.name = name
        self.color = color

    def draw(self, x, y):
        print(f"Drawing {self.name} tree in {self.color} at ({x}, {y})")

class TreeFactory:
    _tree_types = {}

    @staticmethod
    def get_tree_type(name, color):
        key = (name, color)
        if key not in TreeFactory._tree_types:
            TreeFactory._tree_types[key] = TreeType(name, color)
        return TreeFactory._tree_types[key]

class Tree:
    def __init__(self, x, y, tree_type):
        self.x = x
        self.y = y
        self.tree_type = tree_type

    def draw(self):
        self.tree_type.draw(self.x, self.y)

# Usage
trees = []
for i in range(5):
    tree_type = TreeFactory.get_tree_type("Oak", "Green")
    trees.append(Tree(i, i*2, tree_type))

for tree in trees:
    tree.draw()
```

### proxy

Controls access to an object, adding a layer like logging or validation.

```python
class RealDatabase:
    def query(self):
        print("Querying the real database...")

class ProxyDatabase:
    def __init__(self):
        self._real_db = None

    def query(self):
        print("Logging: Attempt to access database")
        if self._real_db is None:
            self._real_db = RealDatabase()
        self._real_db.query()

# Usage
db = ProxyDatabase()
db.query()
db.query()
```

## oop - behavior

### chain of responsibility

Passes request along a chain of handlers.

```python
class Handler:
    def __init__(self, successor=None):
        self.successor = successor

    def handle(self, request):
        if self.successor:
            return self.successor.handle(request)

class ConcreteHandler1(Handler):
    def handle(self, request):
        if request < 10:
            return f"Handled by Handler1: {request}"
        return super().handle(request)

class ConcreteHandler2(Handler):
    def handle(self, request):
        if request < 20:
            return f"Handled by Handler2: {request}"
        return super().handle(request)

# Usage
handler = ConcreteHandler1(ConcreteHandler2())
print(handler.handle(5))
print(handler.handle(15))
```

### command

Encapsulates a request as an object.

```python
class Command:
    def execute(self):
        pass

class Light:
    def turn_on(self):
        print("Light is ON")

class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.turn_on()

class RemoteControl:
    def submit(self, command):
        command.execute()

# Usage
light = Light()
command = LightOnCommand(light)
remote = RemoteControl()
remote.submit(command)
```

### iterator

Provides a way to access elements of a collection without exposing the underlying structure.

```python
class MyIterator:
    def __init__(self, collection):
        self._collection = collection
        self._index = 0

    def __next__(self):
        if self._index < len(self._collection):
            value = self._collection[self._index]
            self._index += 1
            return value
        raise StopIteration

class MyCollection:
    def __init__(self):
        self.items = []

    def __iter__(self):
        return MyIterator(self.items)

# Usage
col = MyCollection()
col.items.extend([1, 2, 3])
for item in col:
    print(item)
```

### mediator

Centralizes complex communication between objects.

```python
class Mediator:
    def notify(self, sender, event):
        pass

class ConcreteMediator(Mediator):
    def __init__(self, comp1, comp2):
        self.comp1 = comp1
        self.comp2 = comp2
        self.comp1.set_mediator(self)
        self.comp2.set_mediator(self)

    def notify(self, sender, event):
        if event == "A":
            print("Mediator reacts to A and triggers B")
            self.comp2.do_b()

class Component:
    def set_mediator(self, mediator):
        self.mediator = mediator

class Component1(Component):
    def do_a(self):
        print("Component1 does A")
        self.mediator.notify(self, "A")

class Component2(Component):
    def do_b(self):
        print("Component2 does B")

# Usage
c1 = Component1()
c2 = Component2()
mediator = ConcreteMediator(c1, c2)
c1.do_a()

```

### memento

Captures and restores an object’s state.

```python
class Memento:
    def __init__(self, state):
        self._state = state

    def get_saved_state(self):
        return self._state

class Originator:
    def __init__(self):
        self._state = ""

    def set(self, state):
        print(f"Setting state to {state}")
        self._state = state

    def save(self):
        return Memento(self._state)

    def restore(self, memento):
        self._state = memento.get_saved_state()
        print(f"Restored to {self._state}")

# Usage
originator = Originator()
originator.set("State1")
memento = originator.save()
originator.set("State2")
originator.restore(memento)
```

### observer

Notifies dependents when an object changes.

```python
class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def notify(self, message):
        for obs in self._observers:
            obs.update(message)

class Observer:
    def update(self, message):
        print(f"Observer received: {message}")

# Usage
subject = Subject()
observer1 = Observer()
observer2 = Observer()
subject.attach(observer1)
subject.attach(observer2)
subject.notify("Event occurred!")
```

### state

Lets an object alter its behavior when its state changes.

```python
class State:
    def handle(self):
        pass

class StateA(State):
    def handle(self):
        print("State A behavior")

class StateB(State):
    def handle(self):
        print("State B behavior")

class Context:
    def __init__(self, state):
        self.state = state

    def request(self):
        self.state.handle()

# Usage
context = Context(StateA())
context.request()
context.state = StateB()
context.request()
```

### strategy

Lets a class change its behavior at runtime.

```python
class Strategy:
    def execute(self, a, b):
        pass

class Add(Strategy):
    def execute(self, a, b):
        return a + b

class Subtract(Strategy):
    def execute(self, a, b):
        return a - b

class Context:
    def __init__(self, strategy):
        self.strategy = strategy

    def do_operation(self, a, b):
        return self.strategy.execute(a, b)

# Usage
context = Context(Add())
print(context.do_operation(5, 3))
context = Context(Subtract())
print(context.do_operation(5, 3))
```

### template method

Defines the skeleton of an algorithm and lets subclasses override steps.

```python
class AbstractClass:
    def template_method(self):
        self.step1()
        self.step2()

    def step1(self):
        print("Step 1")

    def step2(self):
        raise NotImplementedError

class ConcreteClass(AbstractClass):
    def step2(self):
        print("Step 2 overridden")

# Usage
obj = ConcreteClass()
obj.template_method()
```

### visitor

Lets you add new operations to existing object structures.

```python
class Visitor:
    def visit_element_a(self, element):
        pass

    def visit_element_b(self, element):
        pass

class Element:
    def accept(self, visitor):
        pass

class ElementA(Element):
    def accept(self, visitor):
        visitor.visit_element_a(self)

class ElementB(Element):
    def accept(self, visitor):
        visitor.visit_element_b(self)

class ConcreteVisitor(Visitor):
    def visit_element_a(self, element):
        print("Processing Element A")

    def visit_element_b(self, element):
        print("Processing Element B")

# Usage
elements = [ElementA(), ElementB()]
visitor = ConcreteVisitor()
for elem in elements:
    elem.accept(visitor)
```
