
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
<!--SR:!2024-02-01,1,230!2000-01-01,1,250-->
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

Note actions should be enum to avoid typo

# 123: React.lazy 

Dùng để load khi cần thiết, lưu ý nhớ dùng React.Suspend để handle loading failed

Tip: kiểm tra user nếu gần như muốn bấm vào button to load thì mình load trước cho người dùng luôn `onMouseHover` `onFocus`

Magic comment in webpack to indicate that it will imported and load things on free time: `const PageOnlineBuyingForm = Loadable({ loader: () => import(/* webpackChunkName: "PageOnlineBuyingForm" */ '../pages/nonOrganized/PageOnlineBuyingForm'), loading: () => null });`

Magic comment tương đương với `<link rel='prefetch' as='script' href='' />`

Put React.Suspend on the right place to avoid UI loading with strange styles

React.Suspense and fallback are in concurrent mode, be careful with loading

Use Coverage in Chrome dev tool to analyze performance before and after splitting code

Coverage to see JS and CSS files only, show used and un-used codes

# 130: use dev tool Performance tab to record rendering

Tab performance in chrome dev tool: has 6x lower to simulate slow machine.

Including:

- Frame:
- Timing: 
- Main: stacks trace of javascript steps, top => down: sequence

Should have a force re-render to do recording.

Should focus on stack trace that has component name and crazy chart below it, check the time it's rendering in pie chart.

Best render machine: 16ms/frame = 1000ms/60frame (best that normal eye can't see anything)

So that each task should be below or equal 16ms/frame

Move things to web worker `import {} from 'workerize!./filter-cities'` : to resolve cases that take much time to render.

# 134: use React.memo or PureComponent to avoid unnecessary re-render if parent re-render

# 135: use dev tool - Profiler for counting render time on every component

Profiler has recording button and is same Performance behavior but for Component.

Method .memo() has second param to check prevProps and nextProps, if it's false then no render. `React.memo(ListItem, (prevProps, nextProps) => {})`. We do this because there's something changes in one of props passing in, adding more conditions to check on every prop. **This is on top of default memo method behavior, and we do this because there changing props by calcations from child component**.

Strategy for above solution: moves calculated props from child component to parent component. And then memo method has its right to handle checking changes from all props that passing in.

# 138: react-virtual library

This is used for long list that rerender takes time to load. React.memo doesn't help and we must use 3rd party library to handle.

# 140: optimize context value

Every context value changes, it triggers rerender. The easy solution for this is using React.useMemo to memoize value of context.

Sometimes you passing 2 vars in context and they're changing the props of child component at the same time. While only 1 context changes, the other one is related and then component rerender. To avoid this, we should separate those two contextes into two different Provider and passing corresponding value.

# 143: perf death by thousands cut

perf death by thousands cut: means there is a change in context value, that leads to subcribed components using this as prop => render also => low perf bottle neck

There is solution to wrapper every component to React.memo, useMemo and useEffect => but this leads to so many dependencies and arrays to handle.

Strategy: move global state to child component as much as possible, when state change within child component, it won't trigger re-render like it was in parent.

But above strategy sometimes not right, because we must have that variable stay on global state to share with other components. => New stragetry: separate reducer and context out of previous one, create new context and reducer with expensive variable.

Another strategy is to divide component into 2 ones. The benefit is that we will know which props rendering and exactly use React.memo for that specific prop. ** we can use HOC for this case instead of separate component**

_watch clip 147 again and again_

# 149: React.Profiler component to track perf

 `<React.Profiler id='counter' onRender={reportProfile}> ... </React.Profiler>`

reportProfile: is a function to handle calling api, add body json to queue

Key indexes:

- timeDuration: the time component renders
- timestamp: the starting time 
- baseDuration: estimated time to render without memoization
- commitTime: time that after comparing diff and then rerender

But the problem of above info is that we don't know what the behaviour of user doing. To have this we use another library api from `scheduler/tracing`


#react 

# 153: 

## tìm hiểu testing là gì: 

[https://kentcdodds.com/blog/but-really-what-is-a-javascript-test](https://kentcdodds.com/blog/but-really-what-is-a-javascript-test)

  - assertion là dạng check result và expect, thường thì hai cái này phải bằng nhau, nếu khác đi thì phải throw Error. Mình cũng có thể viết tay cái này, nodejs có module assertion, hoặc các thư viện có assertion sẵn như Jest giúp việc nhìn log errors tường minh hơn.
  - hàm expect dùng để quăng ra lỗi, nhưng để biết lỗi đó sinh ra từ hàm nào thì nó phải để trong hàm `test` sao đó callback về hàm `expect` để mình có thể hiểu code bị lỗi ở đâu. 

  ```javascript
  function test(title, callback) {
    try {
      callback()
      console.log(`✓ ${title}`)
    } catch (error) {
      console.error(`✕ ${title}`)
      console.error(error)
    }
  }
  function expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(`${actual} is not equal to ${expected}`)
        }
      },
    }
  }
  ```

  - mặc định create-react-app đã cài sẵn Jest nên mình có thể gọi describe, test, expect... đồng thời dùng ES6 được luôn vì đã có sẵn Babel trong người. Nếu init một dự án đơn giản chỉ có node và jest module không thôi thì phải module các hàm của mình bằng RequireJS

## tìm hiểu mock testing là gì: 

[https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

- thông thường khi test mình hay gọi đến các function khác trong utils, nếu k mocks được function đó thì mình chỉ test được dạng kết quả thôi. để cho xác đáng hơn thì thường sẽ tùy chỉnh hàm đó một chút rồi expect một số điều bảo đảm rằng hàm đó đã được gọi đúng (gọi bao nhiêu lần...), và thường khi override lại một hàm nào đó thì cuối file mình sẽ phải trả lại hàm như nguyên bản ban đầu

```javascript
// kỹ thuật này gọi là monkey patching
jest.spyOn(utils, 'getWinner') // override lại hàm getWinner của object utils
utils.getWinner.mockImplementation((p1, p2) => p2) // mock để giả sử rằng người chiến thắng là p2
const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
expect(winner).toBe('Kent C. Dodds')
utils.getWinner.mockRestore() // trả về nguyên bản như cũ
```

- có thể để các function mock nằm trong folder `__mock__` sau đó import vào jest dễ dàng hơn

```javascript
// __mocks__/utils.js
export const getWinner = jest.fn((p1, p2) => p2)


// __tests__/thumb-war.js
import thumbWar from '../thumb-war'
import * as utilsMock from '../utils'
jest.mock('../utils')
```

# 156: 

- Jest lúc runtime sẽ tự hiểu DOM là gì và mình có thể createElement hay làm các thứ liên quan đến DOM đều được.

# 158

- lưu ý việc xóa đi những gì mình điều chỉnh là rất quan trọng cho những test sau, vì nếu không chỉnh lại như trước đó thì có thể gây ra lỗi vì những test sau gọi lại element đó. Đó cũng là lý do tại sao mà sau khi mock function rồi thì mình phải trả lại nguyên bản trước đó. Thông thường thì mình dùng hàm `beforeEach()` để reset cái không cần thay đổi cho mỗi test.

# 159

- thông thường DOM.click() thì sẽ không đủ cho các events vậy nên ta cần phải dùng đến web api là `dispatchEvent()` với param nhận và là `MouseEvent` cho các sự kiện như mousehover...

# 161

- _react testing library_ có hàm `render` dùng để thay thế cho react_dom dùng kết hợp với jest để render vào DOM ảo ở trong Jest, lúc này hàm `render` của _react testing library_ sẽ tự động append vào body của DOM ảo của Jest, đồng thời sau mỗi hàm _test_ thì sẽ tự động unmount ra khỏi DOM ảo đó và mình cũng không cần tự handle bằng tay trong hook beforeEach

# 162

- `fireEvent` là hàm thuộc về testing library mô phỏng các sự kiện handle như: click, mousehover... 

- thường mình sẽ gán một component sau khi render bằng cách sau: `const {container} = render(<Counter/>)`

# 163

- để sử dụng được hàm `.toHaveTextContent` thì mình cần phải import thêm library `@testing-library/jest-dom/extend-expect`

# 164

- _test implementation detail free_ là khái niệm viết test để làm sao đó khi src code mình thay đổi thì các test case không cần phải viết lại, hoặc điều chỉnh ít thôi. Ví dụ use case của react là trước đó mình class component, sau đó chuyển sang functional component

# 165

- sử dụng hàm screen để lấy DOM chắn chắn hơn, xem trong acessability (xem lại clip)

# clip 166

- dùng object `userEvent` thay thế cho object `fireEvent` với nhiều sự kiện hơn, userEvent được build on top của fireEvent, mình nên sử dụng nó trước khi nghĩ tới fireEvent
