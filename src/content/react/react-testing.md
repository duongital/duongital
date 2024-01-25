#react 

# clip 153: 

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

# clip 156: 

- Jest lúc runtime sẽ tự hiểu DOM là gì và mình có thể createElement hay làm các thứ liên quan đến DOM đều được.

# clip 158

- lưu ý việc xóa đi những gì mình điều chỉnh là rất quan trọng cho những test sau, vì nếu không chỉnh lại như trước đó thì có thể gây ra lỗi vì những test sau gọi lại element đó. Đó cũng là lý do tại sao mà sau khi mock function rồi thì mình phải trả lại nguyên bản trước đó. Thông thường thì mình dùng hàm `beforeEach()` để reset cái không cần thay đổi cho mỗi test.

# clip 159

- thông thường DOM.click() thì sẽ không đủ cho các events vậy nên ta cần phải dùng đến web api là `dispatchEvent()` với param nhận và là `MouseEvent` cho các sự kiện như mousehover...

# clip 161

- _react testing library_ có hàm `render` dùng để thay thế cho react_dom dùng kết hợp với jest để render vào DOM ảo ở trong Jest, lúc này hàm `render` của _react testing library_ sẽ tự động append vào body của DOM ảo của Jest, đồng thời sau mỗi hàm _test_ thì sẽ tự động unmount ra khỏi DOM ảo đó và mình cũng không cần tự handle bằng tay trong hook beforeEach

# clip 162

- `fireEvent` là hàm thuộc về testing library mô phỏng các sự kiện handle như: click, mousehover... 

- thường mình sẽ gán một component sau khi render bằng cách sau: `const {container} = render(<Counter/>)`

# clip 163

- để sử dụng được hàm `.toHaveTextContent` thì mình cần phải import thêm library `@testing-library/jest-dom/extend-expect`

# clip 164

- _test implementation detail free_ là khái niệm viết test để làm sao đó khi src code mình thay đổi thì các test case không cần phải viết lại, hoặc điều chỉnh ít thôi. Ví dụ use case của react là trước đó mình class component, sau đó chuyển sang functional component

# clip 165

- sử dụng hàm screen để lấy DOM chắn chắn hơn, xem trong acessability (xem lại clip)

# clip 166

- dùng object `userEvent` thay thế cho object `fireEvent` với nhiều sự kiện hơn, userEvent được build on top của fireEvent, mình nên sử dụng nó trước khi nghĩ tới fireEvent

---

screen.debug()
mock function: jest.fn()
169: toHaveBeenCalledWith, toHaveBeenCalledTimes
170: faker

# clip 174

call API

image.png

getting from: https://asciiflow.com/

```plain text
              ┌──────────────────────────────────────────────────┐
              │                                                  │
              │                                                  │
              │ ┌────────────────┐ ┌─────────────────┐           │
              │ │                │ │                 │           │
─────────────►│ │                │ │                 │           │
              │ │  this box is   │ │  and this box is│for those  │
              │ │                │ │                 │           │
              │ │                │ │                 │           │
              │ └────────────────┘ └─────────────────┘           │
              │                                                  │
              └──────────────────────────────────────────────────┘
```