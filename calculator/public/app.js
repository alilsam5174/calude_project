// Wires the Calculator engine to the DOM and keyboard.
import { Calculator } from "./calculator.js";

const calc = new Calculator();
const displayEl = document.getElementById("display");
const keysEl = document.querySelector(".keys");

function render() {
  displayEl.textContent = calc.display;
  // Highlight the active operator key, if any.
  document.querySelectorAll(".key--op").forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      calc.operator !== null && btn.dataset.op === calc.operator && calc.overwrite,
    );
  });
}

function handle({ digit, action, op }) {
  if (digit !== undefined) calc.inputDigit(digit);
  else if (action === "decimal") calc.inputDecimal();
  else if (action === "operator") calc.chooseOperator(op);
  else if (action === "equals") calc.equals();
  else if (action === "clear") calc.clear();
  else if (action === "sign") calc.toggleSign();
  else if (action === "percent") calc.percent();
  render();
}

keysEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  handle(btn.dataset);
});

// Keyboard support.
const KEY_OPS = { "+": "+", "-": "-", "*": "*", "/": "/" };
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") handle({ digit: e.key });
  else if (e.key === ".") handle({ action: "decimal" });
  else if (e.key in KEY_OPS) handle({ action: "operator", op: KEY_OPS[e.key] });
  else if (e.key === "Enter" || e.key === "=") handle({ action: "equals" });
  else if (e.key === "Escape") handle({ action: "clear" });
  else if (e.key === "Backspace") {
    calc.backspace();
    render();
  } else if (e.key === "%") handle({ action: "percent" });
});

render();
