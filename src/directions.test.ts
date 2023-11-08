import { isDirection } from "./directions";

describe("test directions", () => {
  const compassPoints = [
    ["N", true],
    ["S", true],
    ["E", true],
    ["W", true],
  ] as Array<[string, boolean]>;

  test.each(compassPoints)(
    "assert '%s' is a Direction is %b",
    (point, expected) => expect(isDirection(point)).toBe(expected),
  );
});
