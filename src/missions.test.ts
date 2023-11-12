import { launch } from "./missions";
import { Instruction, Pose } from "./poses";

describe("launch test missions", () => {
  test("top right plateau must be (0, 0) or greater", () => {
    expect(() => {
      launch({ x: -1, y: 0 }, []);
    }).toThrow("Top right plateau must be (0, 0) or greater");

    expect(() => {
      launch({ x: 0, y: -1 }, []);
    }).toThrow("Top right plateau must be (0, 0) or greater");
  });

  test("launch mission with invalid instruction", () => {
    const topRight = { x: 5, y: 5 };

    // Mission with invalid initial instruction, should be ignored
    const start = { direction: "E", position: { x: 3, y: 3 } } as Pose;
    const instructions = "KMMRMMRMRRM".split("") as Instruction[];
    const mission = { start: start, instructions: instructions };

    const destination = { position: { x: 5, y: 1 }, direction: "E" };

    expect(launch(topRight, [], [mission])).toEqual([destination]);
  });

  test("launch multiple mission", () => {
    const topRight = { x: 5, y: 5 };

    // Mission 1
    const start1 = { direction: "N", position: { x: 1, y: 2 } } as Pose;
    const instructions1 = "LMLMLMLMM".split("") as Instruction[];

    const mission1 = { start: start1, instructions: instructions1 };

    const destination1 = { position: { x: 1, y: 3 }, direction: "N" } as Pose;

    // Mission 2
    const start2 = { direction: "E", position: { x: 3, y: 3 } } as Pose;
    const instructions2 = "MMRMMRMRRM".split("") as Instruction[];
    const mission2 = { start: start2, instructions: instructions2 };

    const destination2 = { position: { x: 5, y: 1 }, direction: "E" };

    expect(launch(topRight, [], [mission1, mission2])).toEqual([
      destination1,
      destination2,
    ]);
  });
});
