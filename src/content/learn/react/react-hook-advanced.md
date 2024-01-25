#react 

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

useLayoutEffect >> painting >> useEffect

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

# 96: useDebugValue for customed hooks

Dùng để đặt tên hook cho dễ debug
