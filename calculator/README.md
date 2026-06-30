# Calculator

A simple web calculator built with vanilla HTML/CSS/JS and served by a
zero-dependency Node.js HTTP server.

## Features

- Classic 4-function calculator (`+`, `−`, `×`, `÷`) with chaining
- Decimal input, sign toggle (`±`), percent (`%`), all-clear (`AC`)
- Full keyboard support (digits, operators, `Enter`/`=`, `Esc`, `Backspace`)
- Floating-point noise handled (e.g. `0.1 + 0.2 = 0.3`)
- No npm dependencies — runs on Node 18+

## Run

```bash
npm start
# then open http://localhost:3000
```

Set a custom port with `PORT=8080 npm start`.

## Test

The calculator engine has unit tests using Node's built-in test runner:

```bash
npm test
```

## Layout

```
calculator/
├─ server.js              # static file server (Node http)
├─ package.json
├─ public/
│  ├─ index.html
│  ├─ style.css
│  ├─ app.js             # DOM + keyboard wiring
│  └─ calculator.js      # pure engine (shared by browser + tests)
└─ test/
   └─ calculator.test.js
```
