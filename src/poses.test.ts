import { instruct, Instruction, Pose } from "./poses";

describe("poses", () => {
  const x = 3;
  const y = 3;
  const position = { x, y };

  test("moving North increases y", () => {
    expect(instruct("M", { position, direction: "N" })).toEqual({
      position: { x, y: y + 1 },
      direction: "N",
    });
  });

  test("moving South decreases y", () => {
    expect(instruct("M", { position, direction: "S" })).toEqual({
      position: { x, y: y - 1 },
      direction: "S",
    });
  });

  test("moving East increases x", () => {
    expect(instruct("M", { position, direction: "E" })).toEqual({
      position: { x: x + 1, y },
      direction: "E",
    });
  });

  test("moving West decreases x", () => {
    expect(instruct("M", { position, direction: "W" })).toEqual({
      position: { x: x - 1, y },
      direction: "W",
    });
  });

  test("assert test case: rover1", () => {
    const start = { position: { x: 1, y: 2 }, direction: "N" } as Pose;
    const instructions = "LMLMLMLMM".split("") as Instruction[];
    const expected = { position: { x: 1, y: 3 }, direction: "N" };

    expect(
      instructions.reduce(
        (current, instruction) => instruct(instruction, current),
        start,
      ),
    ).toEqual(expected);
  });

  test("assert test case: rover2", () => {
    const start = { position: { x: 3, y: 3 }, direction: "E" } as Pose;
    const instructions = "MMRMMRMRRM".split("") as Instruction[];
    const expected = { position: { x: 5, y: 1 }, direction: "E" };

    expect(
      instructions.reduce(
        (current, instruction) => instruct(instruction, current),
        start,
      ),
    ).toEqual(expected);
  });
});
