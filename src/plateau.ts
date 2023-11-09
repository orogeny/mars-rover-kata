import { Position } from "./poses";

type Tile = {
  position: Position;
  type: "empty" | "boundary";
};

function createPlateau(topRight: Position) {
  const boundary = Array.from({ length: topRight.x + 3 }).map((_, i) => ({
    position: { x: i - 1, y: topRight.y + 1 },
    type: "boundary",
  })) as Tile[];

  const plateau = [boundary] as Tile[][];

  for (let y = topRight.y; y >= 0; --y) {
    const row = boundary.map((t, i) => {
      if (i === 0) return { position: { x: -1, y }, type: "boundary" };
      if (i === topRight.x + 2)
        return { position: { x: topRight.x + 1, y }, type: "boundary" };
      return { position: { x: i - 1, y }, type: "empty" };
    }) as Tile[];
    plateau.push(row);
  }

  const bottomBoundary = boundary.map((t) => ({
    position: { x: t.position.x, y: -1 },
    type: "boundary",
  })) as Tile[];

  plateau.push(bottomBoundary);

  return plateau;
}

function displayPlateau(plateau: Tile[][]) {
  for (let y = 0; y < plateau.length; ++y) {
    let row = "";

    for (let x = 0; x < plateau[y].length; ++x) {
      const { position, type } = plateau[y][x] as Tile;
      row += `${type === "boundary" ? "b" : "e"}:(${position.x}, ${
        position.y
      })`;
    }

    console.log(row);
  }
}

export { createPlateau, displayPlateau };
