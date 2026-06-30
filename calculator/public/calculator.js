// Pure calculator engine — no DOM access, so it runs in the browser and under
// `node --test` alike.

/** Apply a single binary operation. Returns a number (may be NaN/Infinity). */
export function compute(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? NaN : a / b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * A classic 4-function calculator modeled as a small state machine.
 * `display` is always the string the UI should show.
 */
export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.display = "0";
    this.previous = null; // stored operand (number)
    this.operator = null; // pending operator
    this.overwrite = true; // next digit replaces the display
    return this;
  }

  inputDigit(digit) {
    if (this.overwrite) {
      this.display = digit === "0" ? "0" : digit;
      this.overwrite = false;
    } else {
      this.display = this.display === "0" ? digit : this.display + digit;
    }
    return this;
  }

  inputDecimal() {
    if (this.overwrite) {
      this.display = "0.";
      this.overwrite = false;
    } else if (!this.display.includes(".")) {
      this.display += ".";
    }
    return this;
  }

  backspace() {
    if (this.overwrite) return this;
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : "0";
    if (this.display === "0") this.overwrite = true;
    return this;
  }

  toggleSign() {
    if (this.display === "0") return this;
    this.display = this.display.startsWith("-")
      ? this.display.slice(1)
      : "-" + this.display;
    return this;
  }

  percent() {
    this.display = formatNumber(Number(this.display) / 100);
    this.overwrite = true;
    return this;
  }

  chooseOperator(operator) {
    if (this.operator !== null && !this.overwrite) {
      // Chain: finish the pending operation first.
      this.equals();
    }
    this.previous = Number(this.display);
    this.operator = operator;
    this.overwrite = true;
    return this;
  }

  equals() {
    if (this.operator === null || this.previous === null) return this;
    const result = compute(this.previous, this.operator, Number(this.display));
    this.display = formatNumber(result);
    this.previous = null;
    this.operator = null;
    this.overwrite = true;
    return this;
  }
}

/** Format a numeric result for display, handling errors and trailing noise. */
export function formatNumber(value) {
  if (!Number.isFinite(value)) return "Error";
  // Avoid floating-point noise like 0.1 + 0.2 = 0.30000000000000004.
  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}
