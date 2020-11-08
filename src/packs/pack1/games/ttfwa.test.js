/* eslint-disable no-undef */
const { ttfwaValidate, playerValidate } = require("./ttfwa");
test("Things that aren't TTFWA are not accepted", () => {
	expect(ttfwaValidate("123")).toBe(false);
	expect(ttfwaValidate("😂")).toBe(false);
	expect(ttfwaValidate("tftwa")).toBe(false);
});

test("Things that are TTFWA are accepted", () => {
	expect(ttfwaValidate("ttfwa")).toBe(true);
	expect(ttfwaValidate("trying to find who asked")).toBe(true);
});

test("A new player that tries joining can join", () => {
	expect(playerValidate("123", ["245"])).toBe(true);
});

test("A player who's already joined can't join again", () => {
	expect(playerValidate("123", ["123", "245"])).toBe(false);
});