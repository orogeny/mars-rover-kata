import { launch } from "./missions";

describe("launch test missions", () => {
  test("top right plateau must be (0, 0) or greater", () => {
    expect(() => {
      launch({ x: -1, y: 0 }, []);
    }).toThrow("Top right plateau must be (0, 0) or greater");

    expect(() => {
      launch({ x: 0, y: -1 }, []);
    }).toThrow("Top right plateau must be (0, 0) or greater");
  });
});
