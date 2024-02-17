#react

# 47: lazy init in useState

- _lazyInit_ init param nếu như là value thì sẽ là giá trị khởi tạo và được tạo đi tạo lại cho mỗi lần render, nếu như là arrow function return value thì chỉ được gọi duy nhất một lần khởi tạo. Cái này giống như cơ chế chống re-render ở bên useEffect??

```javascript
const [state, setState] = React.useState(
	() => window.localStorage.getItem(key) || defaultValue
);
```

# 48: render on condition of a specific variable

- chỉ render khi có biến xác định nào đó thay đổi, ko phụ thuộc vào parent render dẫn đến child render. Bằng cách truyền param biến đó vào mảng sau cái effect

```javascript
React.useEffect(() => {
	window.localStorage.setItem("name", name);
}, [name]);
```

# 49: custom hook là gì

- customized hook được tạo ra để dùng tái sử dụng logic code trong React, nó giống như các hàm utils của lodash mà khác chỗ là có thể connect với kiến trúc hòa hợp với React codes

# 50: ref

- optional options trong react hook được khai báo như sau:

```javascript
function useSomething(
	key,
	defaultValue = "",
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {}
```

- dành cho expensive param (param có thể là hàm hoặc value) để trả về đúng giá trị:

```javascript
return typeof defaultValue == "function" ? defaultValue() : defaultValue;
```

- customized hook: bên trong còn có thể sử dụng ref để đọc giá trị trước đó của param. Ví dụ: `const preKeyRef = React.useRef(key)` và sau đó vào useEffect để kiểm tra sự khác biệt xem trước sau có thay đổi hay không: `if (prevKey !== key)`

- useRef hook không chỉ được sử trong DOM gắn key mà còn được dùng trong React.FC để đọc param, lấy param là ref sau đó dùng như previous state của param đó (event sourcing)

- ref còn dùng trong trường hợp wrapper component dùng các param là hàm mà mình không access được. khi đó mình có thể gắn ref vào tromg DOM ở phần return rồi gọi đến nó thông qua `useEffect()`

# 51: khi nào thì component rerender

[https://github.com/donavon/hook-flow](https://github.com/donavon/hook-flow)

component render lại khi: parent re-render, state thay đổi, context thay đổi

lazy initializers được khởi tạo là function param pass vào useState hoặc useReducer

useEffect được gọi sau khi component render xong, trước khi component unmount thì nó sẽ gọi function param được return trong useEffect

child component sẽ được gọi effect trước, rồi sau đó parent component mới gọi effect

# 52: tip to share state

sharing state betwwen two sibling components with lift the state

# 53: share function to parent component

share state by passing to those parent components, not only variable but also function

`onAnimalChange={event => setAnimal(event.target.value)}`: this is written from parent and passing to child via prop onAnimalChange, and then in the input of child component we pass something like this: `<input onChange={onAnimalChange}/>` this will pass event from child to parent and parent will control

refactor code in clip 53, nếu như có field nào không cần share lên parent nữa thì mình gom biến đó lại để vào nội bộ của component con thôi, việc làm này sẽ giúp việc re-render ở parent component giảm đi và làm tăng performance

# 55: note on JSON methods

lưu ý lúc setItem vào localStorage thì phải dùng JSON.stringify còn khi lấy ra xài thì phải JSON parse mới dùng được

nếu muốn get items ở trong localStorage lần đầu tiên thì khi useState viết trong đó một arrow function, để những lần sau khi state thay đổi nó không get nhiều lần nữa thì không cần thiết phải làm như vậy

# 58

refactor với hook useLocalStorage

# 59: strategy to design tic tac toe history

để tạo nên history of the game thì mình tạo ra 2 mảng, mảng đầu tiên là giữ current state của game là mảng 9 phần tử, mảng thứ hai là mảng của mảng ứng với mỗi index là lưu nhớ người chơi tại vị trí đó.

tip: để cope array dùng Array.slice(0, n)

# 60

convert class component to functional component

# 61 62 63

hiệu ứng hover 3D, lib used: vanilla-tilt

dùng `ref` để get DOM trong react tree sau đó áp dụng thư viện để tạo hiệu ứng

```javascript
React.useEffect(() => {
	const tiltNode = tiltRef.current;
	VanillaTilt.init(tiltNode, {
		max: 25,
		speed: 400,
	});

	// remember to destroy if component unmounted
	return () => {
		tiltNode.vanillaTilt.destroy();
	};
}, []); // [] important: render and destroy 1 time only
```

# 65 66 67 68 69 70: ErrorBoundary

trước khi fetch api thì reset data ở kết quả trước về null để có loading state

check xem error lúc gọi api có nằm trong function của mình không: `fetch.then(success, error)`

khi dùng nhiều state lẻ riêng biệt sẽ sinh ra hiện tượng cái nào render trước cái nào render sau rất phức tạp, mặc dù nhìn dễ đọc nhưng chúng ta nên gom lại thành một state lớn để khi setState sẽ không xảy ra hiện tượng bất đồng bộ, giải pháp:

- dùng cách là setState pass vào đó một function với param là prevState
- dùng useReducer

`ErrorBoundary` là class đặc biệt dùng để handle error api nếu như wrapped component xảy ra lỗi:

- chỉ viết được bằng class
- return về child là component con
- có thêm `static getDerivedStateFromError() {}`
- thường được dùng với FallbackComponent để flexible error message component
- lưu ý đặt key={id} để reset class khi id thay đổi

library `react-error-boundary` has same behavior but has props that not easy to understand

# 71-75

need to see again and again...

# 76-82: useReducer

useReducer nhận vào hai param

- param 1: là function reducer dùng để mutate state
- param 2: là initital state

const [count, dispatch] = useReducer(reducerFunction, initialCount)


# 83-85: useCallback

Thông thường vào mỗi lần rerender lại, những hàm sẽ được khởi tạo lại một lần nữa => để tránh trường hợp đó ta dùng useCallback. Nhưng không phải lúc nào cũng dùng, vì không ảnh hưởng tới performance lắm. Thường ta dùng cho các trường hợp sau:

- function component wrapped inside React.memo
- function object is a dependency of other hook `useEffect(..., [callback])`
- when funtion is debounced of throttled

Thường ít ai sẽ gọi api thẳng trong useEffect mà sau đó sẽ refactor bằng cách viết riêng ra thành hook sử dụng useEffect useReducer và useCallback,

Refactor code lại sử dụng useReducer để tách 4 status: idle, fetching, success, error ra riêng để dễ quản lý

Thêm vào đó là viết một customed hook: useCallback để gọn code hơn và generic cho mọi trường hợp

# 86: refactor useAsync hook

Refactoring useAsync hook bằng cách deconstruct statuses và hàm fetch ra ngoài để dùng:

- const {data: pokemon, status, error, run } = useAsync({...})

# 87: unmounting event

Be careful with unmounting event, it leads to error on console. Bởi vì hàm dispatching vẫn được gọi, lúc này mình viết thêm hàm để check mounted và unmounted bằng một cái useEffect mới. Sau đó kiểm tra mounted là true thì mới cho dispatch, còn không thì trả null để dispatch không bị lỗi.

# 88-91: useContext

Kết hợp useContext và useReducer = Redux

# 92: useLayoutEffect

useLayoutEffect => painting => useEffect

Use case: khi tin nhắn chat cuối xuất hiện mình muốn nó scoll đến cuối trang trước khi chữ hiện, nếu dùng useEffect bình thường thì UI sẽ bị giựt.

# 93-95: useImperativeHandle, forwardRef, useRef

Mục đích dùng để parent component gọi method của child component.

Kết hợp với forwardRef là 2nd param bỏ vào child component và sau đó useImerativeHandle để pass methods mong muốn cho parent gọi.

```javascript
const { forwardRef, useRef, useImperativeHandle } = React;

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const Child = forwardRef((props, ref) => {

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    }

  }));

  return <h1>Hi</h1>;
});

const Parent = () => {
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
```

Reference: [URL](https://stackoverflow.com/questions/37949981/call-child-method-from-parent)

# 96: useDebugValue for custom hooks

Dùng để đặt tên hook cho dễ debug