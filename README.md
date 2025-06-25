# @faulkj/toaster

**Toaster** is a dependency-free, TypeScript-native toast notification library for modern web apps.
Fast, minimal, fully customizable, and easy to drop into any frontend project.

---

## Features

- ⚡ **Zero dependencies:** Lightweight, vanilla JS/TS - no external libraries required.
- 🔷 **TypeScript-native:** Fully typed for safety and autocomplete.
- 🎨 **SCSS-based styles:** Import or customize easily to match your app.
- 🚀 **Smooth transitions:** Hardware-accelerated CSS animation for snappy feels.
- 🔁 **Auto queueing:** Toasts display one at a time, in order.
- 🧩 **Highly customizable:** Control timeout, class, animation duration, anchor, icon, and click behavior.
- 🖱️ **Clickable toasts:** Add a click callback - toast dismisses after your code runs.
- ⏸️ **Persistent/sticky toasts:** Set `timeout: null` for toasts that stay until dismissed.
- 🏷️ **Lifecycle events:** Hook into all toast transitions (`bake`, `baked`, `served`, `eat`, `eaten`).
- 🎭 **Easy theming & positioning:** Style and position toasts any way you want via CSS.

---

## Installation

```bash
npm install @faulkj/toaster
```

### Import the SCSS (Required for Styling)

```scss
@import "~@faulkj/toaster/src/scss/toaster.scss";
```
or

```typescript
import "@faulkj/toaster/src/scss/toaster.scss";
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@faulkj/toaster/dist/css/toaster.min.css">
<script src="https://unpkg.com/@faulkj/toaster/dist/js/toaster.min.js"></script>
<script>
  new Toaster("Plain JS toast!")

  new Toaster("Sticky, clickable!", {
    timeout: null,
    click: () => alert("Toast clicked!")
  })
</script>
```

---

## Basic Usage (ESM/TypeScript)

```typescript
import Toaster from "@faulkj/toaster"
// (SCSS must be imported in your global styles)

new Toaster("Hello, World!") // Bottom right by default
```

---

## Options
All options are optional. Defaults are shown in comments.
- **timeout** `number | null` –
  ms before dismissal (default: `2500`)`null` = stays until dismissed.
- **class** `string` –
  Any additional CSS classes
- **duration** `number` –
  Animation duration in ms (default: `1000`)
- **anchor** `"bottom"` | `"top"` –
  Stack from bottom or top (default: `"bottom"`)
- **icon** `string | null` –
  Icon class for `<i>` (e.g. `"bi bi-info-circle-fill"`)
- **click** `((e: MouseEvent) => void) | null` –
  Click handler (dismisses the toast)

---

## Events

All toast instances emit:

- **bake** – Toast created and added to the queue
- **baked** – Toast added to the DOM, ready for animation
- **served** – Display animation started
- **eat** – Hide animation completed
- **eaten** – Removed from DOM

**Example:**
```typescript
const toast = new Toaster("Watch me!")
toast.el.addEventListener("eaten", () => {
  // Toast removed from DOM
})
```

---

## Methods

- `eat()`  -  Instantly dismisses the toast

---

## Persistent / Clickable Toast

Set `timeout: null` to keep a toast until user dismisses it (by click or code):

```typescript
new Toaster("Click to acknowledge.", {
  timeout: null,
  icon: "fa fa-bolt",
  click: () => alert("You clicked the toast!")
})
// Clicking dismisses the toast after callback execution.
```

---

## Queueing

Toasts stack in the order that they are created.

---

## Positioning

- Use the `anchor` option (`"top"` or `"bottom"`) to control vertical stacking.
- Horizontal position (left, right, center) and stack direction are fully controlled by your CSS.
- Example for top-right:
  ```scss
  .toaster {
    top: 0;
    right: 0;
    left: auto;
    bottom: auto;
  }
  ```

---

## Custom Styling

Add a custom class for full theme control:

```typescript
new Toaster("Dark mode", { class: "toast-dark" })
```
```scss
toaster.toast-dark {
  background: #222;
  color: #eee;
}
```
