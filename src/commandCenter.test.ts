import { beginMission } from "./commandCenter";
import { Vehicle } from "./vehicles";

describe("commandCenter", () => {
  test("assert first test cases provided supplied values", () => {
    const topRight = { x: 5, y: 5 };

    const rover1 = {
      name: "rover1",
      start: { position: { x: 1, y: 3 }, direction: "N" },
      instructions: "LMLMLMLMM".split(""),
    } as Vehicle;

    expect(beginMission(topRight, [rover1])[0]).toEqual({
      position: { x: 1, y: 3 },
      direction: "N",
    });
  });
});
