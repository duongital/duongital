#react 

# 100: context module functions

Ý tưởng là không nên gọi dispatch trong consumer component mà nên tách ra function riêng và được gọi là **context module function**

useReducer và useContext thường hay được đi chung với nhau, sau khi có state và dispatch từ component thì 2 biến này được gán vào value `value = [state, dispatch]`. Sau đó value được truyền vào UserContext.Provider để cho consumer dùng.

Nếu có nhiều dispatch types thì nên tách ra làm helper functions để không phải gọi nhiều lần, refactor lại với những param mới dễ dùng hơn.

# 103: compound component

Ví dụ như thẻ select và option dùng chung mới kết hợp được, dễ extends và edit. Vậy nên khi thiết kế dùng react component thì không nên chỉ dùng một thẻ cha duy nhất sau đó truyền props liên tục mà hãy tạo những wrapper components thực hiện nhiệm vụ riêng lẻ như giữ label, giữ toggle render...

Dùng React.Children.map(children, child => {}) để loop qua elements wrapped in parent component. Ví dụ:

```javascript
return React.Children.map(children, (child) => {
	const newChild = React.cloneElement(child, { on, toggle }); // not understand why all???
	return newChild;
});
```

Lưu ý nếu như add DOM thường như `span` thì phải check điều kiện trong hàm map xem có nên return hay không để tránh phát sinh lỗi.

# 106: flexible compound component

Vấn đề xảy ra khi nested child component không cùng cấp với lại cấp gần nhất, điều này làm cho cách lấy child react dom ở bên trên không còn đúng nữa.

Giải pháp:

- Sử dụng useContext với Provider gốc là component parent Toggle
- Viết thêm hook useToggle return về React.useContext(ToggleContext)
- Lúc truyền từ provider parent thì pass value là {on, toggle}
- Lúc dùng hook thì deconstruct var cần dùng: `const { on } = useToggle()`

**Thường thì flexible compound component được dùng nhiều hơn so với compound component vì tính linh hoạt. Tuy nhiên compound component sử dụng map thì đơn giản hơn, nếu như component con chỉ có một cấp thì nên dùng compound component**

Thoughts:

- Lúc này child trong compound component không còn gọi riêng lẻ được nữa vì gọi độc lập sẽ không có props từ context -> lỗi ko render được.
- Cách giải quyết là improve code ở useToggle hook bằng cách handle context is exist or not, if not just throw Error with message, otherwise return context as usual.

# 109: prop collection and getter

Prop collection: những props cần thiết thường được return về từ hook, sau đó nó sẽ được lấy từ trong component sử dụng bằng cách useHook đó, từ giá trị deconstruct từ hook sau đó nó được truyền tiếp vào trong component con để sử dụng `<Switch on={on} {...togglerProps} />`. Việc làm này hữu dụng khi pass tiếp cho component button `<button {...toggleProps}>click</button` vì cùng đang sử dụng chung ...toggleProps.

Prop getter: better pattern, vì cách làm trên nếu mình muốn đổi hàm onClick trong ...toggleProps của một trong hai thì sẽ không được. Cách làm:

- Thay vì truyền {...toggleProps}, thì ta truyền function:

```javascript
<button
	{...getTogglerProps({
		'aria-label': 'custom-button',
		onClick: () => console.log("clicked"),
		})
	}
	on or off
</button>
```

- Và hàm getTogglerProps ở trong hook được implement như sau:

```javascript
function getTogglerProps({ onClick, ...props } = {}) {
	return {
		"aria-pressed": on,
		onClick: () => {
			onClick && onClick();
			toggle();
		},
	};
}
```

# 112: state reducer

Ý tưởng dạng như override reducer trong local component, nếu như không pass thì sẽ dùng reducer mặc định, còn nếu như có pass vào thì sẽ dùng reducer mới pass vào.

# 114: context module function

???

Note actions should be enum to avoid typo

# 116: control props

???

# 119: controlled and uncontrolled components

???

util 122: I don't understand anything (*&^%$#@
