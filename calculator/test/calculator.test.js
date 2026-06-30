import { test } from "node:test";
import assert from "node:assert/strict";
import { Calculator, compute, formatNumber } from "../public/calculator.js";

test("compute handles the four operations", () => {
  assert.equal(compute(2, "+", 3), 5);
  assert.equal(compute(10, "-", 4), 6);
  assert.equal(compute(6, "*", 7), 42);
  assert.equal(compute(8, "/", 2), 4);
});

test("division by zero is not finite", () => {
  assert.ok(Number.isNaN(compute(5, "/", 0)));
  assert.equal(formatNumber(compute(5, "/", 0)), "Error");
});

test("formatNumber removes floating-point noise", () => {
  assert.equal(formatNumber(0.1 + 0.2), "0.3");
});

test("Calculator: 2 + 3 = 5", () => {
  const c = new Calculator();
  c.inputDigit("2").chooseOperator("+").inputDigit("3").equals();
  assert.equal(c.display, "5");
});

test("Calculator: chained operations 2 + 3 * 4 = 20", () => {
  const c = new Calculator();
  c.inputDigit("2")
    .chooseOperator("+")
    .inputDigit("3")
    .chooseOperator("*")
    .inputDigit("4")
    .equals();
  assert.equal(c.display, "20");
});

test("Calculator: decimals and clear", () => {
  const c = new Calculator();
  c.inputDigit("1").inputDecimal().inputDigit("5");
  assert.equal(c.display, "1.5");
  c.clear();
  assert.equal(c.display, "0");
});

test("Calculator: backspace and sign toggle", () => {
  const c = new Calculator();
  c.inputDigit("1").inputDigit("2").inputDigit("3").backspace();
  assert.equal(c.display, "12");
  c.toggleSign();
  assert.equal(c.display, "-12");
});
