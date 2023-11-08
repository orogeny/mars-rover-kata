import { Direction, isDirection, rotateLeft } from "./directions";

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

  test("not a direction", () => expect(isDirection("U")).toBe(false));
});

describe("test rotation functions", () => {
  const goLeft = [
    ["N", "W"],
    ["E", "N"],
    ["S", "E"],
    ["W", "S"],
  ] as Array<[Direction, Direction]>;

  test.each(goLeft)("assert rotateLeft('%s') returns '%s'", (from, to) =>
    expect(rotateLeft(from)).toBe(to),
  );
});
