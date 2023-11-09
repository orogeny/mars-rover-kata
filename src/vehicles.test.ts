import { prepareVehicle } from "./vehicles";

describe("vehicles", () => {
  test("can prepare a rover", () => {
    const rover1 = {
      name: "rover1",
      start: { position: { x: 1, y: 3 }, direction: "N" },
      instructions: "LMLMLMLMM".split(""),
    };

    expect(
      prepareVehicle(
        "rover1",
        { position: { x: 1, y: 3 }, direction: "N" },
        "LMLMLMLMM",
      ),
    ).toEqual(rover1);
  });
});
