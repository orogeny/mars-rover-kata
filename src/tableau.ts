import { Position } from "./poses";

type Pile = {
  position: Position;
  type: "empty" | "boundary";
};

function createPlateau(topRight: Position) {
  const boundary = Array.from({ length: topRight.x + 3 }).map((_, i) => ({
    position: { x: i - 1, y: topRight.y + 1 },
    type: "boundary",
  })) as Pile[];

  const plateau = [boundary] as Pile[][];

  for (let y = topRight.y; y >= 0; --y) {
    const row = boundary.map((t, i) => {
      if (i === 0) return { position: { x: -1, y }, type: "boundary" };
      if (i === topRight.x + 2)
        return { position: { x: topRight.x + 1, y }, type: "boundary" };
      return { position: { x: i - 1, y }, type: "empty" };
    }) as Pile[];
    plateau.push(row);
  }

  const bottomBoundary = boundary.map((t) => ({
    position: { x: t.position.x, y: -1 },
    type: "boundary",
  })) as Pile[];

  plateau.push(bottomBoundary);

  return plateau;
}

function displayPlateau(plateau: Pile[][]) {
  for (let y = 0; y < plateau.length; ++y) {
    let row = "";

    for (let x = 0; x < plateau[y].length; ++x) {
      const { type } = plateau[y][x] as Pile;
      row += type === "boundary" ? "b" : " ";
    }

    console.log(row);
  }
}

export { createPlateau, displayPlateau };
