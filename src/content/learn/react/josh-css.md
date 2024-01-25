# html

[tips for html](https://markodenic.com/html-tips/)

![joy of react](./attachments/20240125-joy-of-react.png)

# bootstrap vs tailwind 

## bootstrap 3 css

something goes here

row rule: `d-flex ??-wrap` >> `col-12 col-md-1/2`

## tailwind 2 css

row rule: `flex flex-wrap` >> `w-full md:w-1/2`

---

# Josh CSS Course

## fundamentals

letter-spacing vs line-height

shouldn't set line height in px, if we change font size >> must change line hieght for the second time

`::before` and `::after` are really just secret spans, nothing more. It's syntactic sugar

rem em pixel percent and hsl:

- for typography: use `rem`
- for picture, box: use `pixel`
- for size relative to parent: use `percent`
- for color: use `hsl`
- avoid to use `em`

Please note, you shouldn't actually set a px font size on the html tag. This will override a user's chosen default font size. The only reason we're doing it here is to demonstrate how the rem unit works, and to simulate a user changing their default font size. Should change default html to 16px, it'll override default font size. better with 1.2em for e.g 

## rendering logic

- some html inherrit css by default (em in p: color red and em become red), but not of `a` in `p`. To take `a` getting color from `p` we use: `color: inherrit`
- the way styles in css working the same as javascript protoype, it'll be looking for most recent parent prop
- cascade css rules:
```javascript
const appliedStyles = {
  ...inheritedStyles,
  ...tagStyles,
  ...classStyles,
  ...idStyles,
  ...inlineStyles,
  ...importantStyles
}
```

- default direction behavior: render elements vertically on blocks, and left-to-right for words (inline-block)

- logical properties: are props that cover LTR (left-to-right) or RTL cases (padding-block-start)

- box model: padding, border, magin (should go with box sizing boder box)

- layout modes: flex, grid, flow. In flow we have: block, inline, inline-block
    - display: inline >> we can't change height, padding/margin will be larger  and calculated from inside
    - inline but special: button, img, canvas, video (imagine that they are inside span, props passed to foreign object)
    - inline image treats as text, this leads to magic space below image. To fix: line height 0, display: block
    - inline elements can't be changed height or width because its shape should be decided by situation. for example, text can be wrapped or border box of strong tag can be wrapped with unknowned future shape
    - inline-block desn't line wrapped
    - margin means increasing distance between sibling margin elements, not parent (just for padding)
    - to avoid: add padding bottom, border bottom in parent element

- position layouts: relative, absolute, sticky
    - if position absolute is set, display not have any affect
    - absolute position will ignore padding of parent relative element

- width: default is set auto, use fit-content. min-width will find the shortest word and wrapped content all the time. Tips: use min-content in tag `<figure>` to have nice effect with `<img>` and `<figcaption>` inside

- footer at bottom example:

```css
html, body {
  height: 100%;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
footer {
  border: solid hotpink;
  padding: 8px;
  margin-top: auto;
}
```

- margin collapse rules:
    - margin collapse to top `&` bottom, not left & right (applied for flow layout only: block, inline, inline-block)
    - only adjacent elements collapsed, if adding `<br>` in between will not affect
    - the bigger margin wins
    - nesting doesn't prevent collapsing

- position: relative, absolute rules:
    - flow not designed with overlap in mind, negative margin >> overlap and which one render later to be on top of the previous one
    - Flow, Flexbox, Grid.. rendered firsted, then positioned elements rendered on top. By default all pisitioned elements will be placed over flow-flex-grid elements at z-index 0
    - default of positioned index is 0 (or auto)
    - **stacking context** decided which z-index is higher, A sibling to B - it will compare z-index of A over B, if a child inside A with index 9999, it's still below B because of index A less than B. Note that, index of A is not set, it will compare child index with B >> stacking context
    - if z-index not specified, orders will be decided by DOM paint (later painted first). But shouldn't change order of DOM elements >> this change interactive element with tab context: links, inputs...
    - to avoid collision in z-index, use stacking context properly or we can use ` isolation: isolate` (as I understand that I will create isolated area with z-index parent at 0). This action will create stacking context and which DOM is rendered later >> go to top. In library ReachUI (modal, tooltip...), it will bring DOM out of root React section and append at last DOM position to avoid stacking z-index conflict. If the root still have z-index higher, use `isolation: isolate` to flatten render position and those components will go on top.

- position: fixed
    - will be broken if parent use  properties: willChange or transform
    - there is a snippets of code to loop through parent DOMs and find the culprit (module2/fixed positioning)

- overflow
    - overflow auto is better overflow scroll
    - should add comments when use this prop (future will thank you)
    - images is inline elements, to have them inline without line break, use: white-space: nowrap
    - absolute lives inside relative element, overflow hidden to be cropped those shapes

- position: sticky
    - *must* have at least one edge to stick (top, right, left, bottom)
    - always stay in the parent box
    - sticky element is in flow 
    - we can use -16px with the edges
    - sticky lives inside parent element, so be careful with parent element height (better with full body)



## modern component architecture

really excited to start this module

## css flexbox

## media queries

## typography and image

## css grid

## animation 

## advanced stuff

text goes here

---
