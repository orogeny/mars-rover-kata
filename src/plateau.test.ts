import { Tile, createPlateau } from "./plateau";
import { Position } from "./poses";

describe("plateau", () => {
  const plateau = createPlateau({ x: 5, y: 5 }, [
    { position: { x: 5, y: 5 }, content: "rover_1" },
  ]);

  const boundaries = [
    ["top", { x: 6, y: 3 }, { position: { x: 6, y: 3 }, content: "boundary" }],
    ["left", { x: 3, y: 6 }, { position: { x: 3, y: 6 }, content: "boundary" }],
    [
      "bottom",
      { x: 3, y: -1 },
      { position: { x: 3, y: -1 }, content: "boundary" },
    ],
    [
      "right",
      { x: -1, y: 5 },
      { position: { x: -1, y: 5 }, content: "boundary" },
    ],
  ] as Array<[string, Position, Tile]>;

  test.each(boundaries)(
    "%s should return boundary",
    (boundary, position, expected) =>
      expect(plateau(position)).toEqual(expected),
  );

  test("empty tile returns empty", () => {
    const middle = { x: 3, y: 3 };

    expect(plateau(middle)).toEqual({ position: middle, content: "" });
  });

  test("should find rover_1 at (5,5)", () => {
    const vehicleLocation = { x: 5, y: 5 };

    expect(plateau(vehicleLocation)).toEqual({
      position: { x: 5, y: 5 },
      content: "rover_1",
    });
  });

  test("assert have multiple content in one tile", () => {
    const top = { x: 5, y: 5 };
    const mountains = { position: top, content: "mountains" };
    const rover_1 = { position: top, content: "rover_1" };

    const interestingPlateau = createPlateau(top, [mountains, rover_1]);

    const tile = interestingPlateau(top);

    expect(tile.content).toBe("mountains, rover_1");
  });
});
