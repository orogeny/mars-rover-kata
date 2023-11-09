// Never Eat Shreaded Wheat!
// NB - future compass points must:
//      a) be in clockwise order, and
//      b) all angles must be equal.
const COMPASS_POINTS = ["N", "E", "S", "W"] as const;

type Direction = "N" | "E" | "S" | "W";

type Rotation = "L" | "R";

function isRotation(input: string): input is Rotation {
  return input === "L" || input === "R";
}

function isDirection(input: string): input is Direction {
  return (COMPASS_POINTS as ReadonlyArray<string>).includes(input);
}

function rotate(rotation: Rotation, from: Direction) {
  let rotated =
    rotation === "L"
      ? COMPASS_POINTS.indexOf(from) - 1
      : COMPASS_POINTS.indexOf(from) + 1;

  if (rotated === -1) rotated = COMPASS_POINTS.length - 1;
  else if (rotated === COMPASS_POINTS.length) rotated = 0;

  return COMPASS_POINTS[rotated];
}

export { Direction, Rotation, isDirection, isRotation, rotate };
