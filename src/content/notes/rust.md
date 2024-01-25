learn rust with notes

# useful links

installation steps

[intersting read of rust language](https://stackoverflow.blog/2021/03/15/getting-started-with-rust/)

can't run rust in windows with git error, just to remove global config of https over ssh: [ref](https://github.com/rust-lang/cargo/issues/3381)

# basic concepts

## life time

A borrow checker used to compares scope to determine whether all borrows are valid.

## ownership

there's can be multiple borrowers as immutable at a time but only 1 mutable borrower. **must check the code before and after that, is the borrower used valid or not?**

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2);
    // r1 and r2 are no longer used after this point

    let r3 = &mut s; // no problem
    println!("{}", r3);
}

```

Borrow must be passed back (or used) for not causing error by other `mut` borrowers. This mean we must clear on every borrow, borrow then used, to avoid complex situations. Example above if `r3` init before print `r1 r2`, the error will show in compiler.

Slice data type does not have ownership, it helps refer to sequences of elements in a collection. String literals are slice `let s = "string literals"`. 

## borrowing

nếu nhiều biến trỏ về kiểu dữ liệu primatives thì sẽ được clone lên làm một biến khác có giá trị tương tự

nếu nhiều biến trỏ về kiểu dữ liệu reference thì sẽ được clone là làm nhiều pointer cũng trỏ đến một vùng nhớ heap duy nhất

trong cùng một scope nếu ai cũng lấy biến đó xài thì gọi là borrowing

## move

biến sẽ bị move nếu như nếu như không phải là primitives, lúc này giải pháp đưa ra là dùng con trỏ để lấy biến đó qua function scope mới xài - khi scope mất đi thì chỉ có con trỏ bị mất

```rust
fn main() {
  let s1 = String::from("hello");
  let len = calculate_length(&s1); // nếu là i32 thì sẽ được Copy khi move qua function khác
  println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
  s.len() // bình thường read thôi thì ko cần dereference
}
```

dereference pointer cho trường hợp mutate biến

```rust
fn main() {
    let mut s1 = String::from("hello");
    let len = calculate_length(&mut s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &mut String) -> usize {
    *s = String::from("hello world");
    s.len()
}
```

## closure

tại sao trong ví dụ của sách rust thì việc khai báo closure khác gì so với việc khai báo bằng function?

```rust
fn main() {
    generate_workout(3,3);
}

fn generate_workout(intensity: u32, random_number: u32) {
    // let expensive_closure = |num| {
    //     println!("calculating slowly...");
    //     num
    // };

    fn expensive_closure(num: u32)-> u32 { // any different?
        println!("calculating slowly...");
        num
    };

    if intensity < 25 {
        println!("Today, do {} pushups!", expensive_closure(intensity));
        println!("Next, do {} situps!", expensive_closure(intensity));
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                expensive_closure(intensity)
            );
        }
    }
}
```

khai báo function và gán vào trong một biến, biến đó được gọi như là function

để tránh việc thực thi closure đó trong lần khai báo vào trong biến ta có thể gán nó vào trong một struct để tránh thực thi hàm lúc khai báo. để bỏ closure vào struct thì ta phải khai báo kiểu cho nó

trong rust ta không thể access variable outside function (trong js sẽ tạo ra closure), muốn access như vậy thì phải dùng closure || trực tiếp để instand biến bên ngoài vào trong closure để dùng, lúc này biến đó giống như được clone ra để dùng thoải mái, nếu như muốn mang biến đó vào trong scope của closure luôn thì dùng keyword `move`



## function return function (HOF)

```rust
fn main() {
  let x = two();
  x(); //two()()
}

fn one() {
  println!("this is function one");
}

fn two() -> fn() {
  println!("this is function two");
  one
}
```

## function as parameter

```rust
fn main() {
  callback(999, one);
}

fn one() {
  println!("this is function one");
}

fn callback(number: i32, function: fn()) {
  println!("this is the number: {}", number);
  function();
}
```

## function in function (has closure scope)

```rust
fn main() {
  fn one() {
      println!("this is function one");
  }

  one();
}
```

## module file structure

If the file name `config.rs` is same level of `main.rs`, it's a module. To use function in same level module, just declare `mod config;` in `main.rs`.

If it is a folder, then there is must be a file name `mod.rs` to define a new module with folder name. Other files: health_route.rs or user_route.rs are different modules, and we must defind in mod.rs.

All `mod` and `fn` should be public to be called in `main.rs`

## sample code in main.rs:

```rust
mod config;
mod routes;
mod model;

fn main() {
	println!("Hello, world!");
	config::show();
	routes::health_route::print_health_route();
  routes::user_route::print_user_route();
}

```

If files are same mod, call super to access to other functions have same module.


