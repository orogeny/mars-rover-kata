import { createPlateau } from "./plateau";

describe("test plateau", () => {
  test("plateau created with correct dimensions", () => {
    const topRight = { x: 2, y: 3 };
    const plateau = createPlateau(topRight);

    expect(plateau.length).toBe(6);
    expect(plateau[0].length).toBe(5);
  });
});
