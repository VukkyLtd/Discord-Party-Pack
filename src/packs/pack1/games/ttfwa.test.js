/* eslint-disable no-undef */
const { ttfwaValidate } = require("./ttfwa");
test("Returns false for something that isn't TTFWA", () => {
	expect(ttfwaValidate("123")).toBe(false);
});

test("Returns true for something that is TTFWA", () => {
	expect(ttfwaValidate("ttfwa")).toBe(true);
	expect(ttfwaValidate("trying to find who asked")).toBe(true);
});