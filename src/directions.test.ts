import { Direction, Rotation, isDirection, rotate } from "./directions";

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

describe("test rotate(rotation, from) function", () => {
  const goLeft = [
    ["L", "N", "W"],
    ["L", "E", "N"],
    ["L", "S", "E"],
    ["L", "W", "S"],
  ] as Array<[Rotation, Direction, Direction]>;

  const goRight = goLeft.map(([, from, to]) => ["R", to, from]) as Array<
    [Rotation, Direction, Direction]
  >;

  test.each([...goLeft, ...goRight])(
    "assert rotate('%s', '%s') returns '%s'",
    (rotation, from, expected) => expect(rotate(rotation, from)).toBe(expected),
  );
});
