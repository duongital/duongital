#react 

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
- Main: stacks trace of javascript steps, top >> down: sequence

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

perf death by thousands cut: means there is a change in context value, that leads to subcribed components using this as prop >> render also >> low perf bottle neck

There is solution to wrapper every component to React.memo, useMemo and useEffect >> but this leads to so many dependencies and arrays to handle.

Strategy: move global state to child component as much as possible, when state change within child component, it won't trigger re-render like it was in parent.

But above strategy sometimes not right, because we must have that variable stay on global state to share with other components. >> New stragetry: separate reducer and context out of previous one, create new context and reducer with expensive variable.

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


