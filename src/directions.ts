// Never Eat Shreaded Wheat!
// NB - future compass points must:
//      a) be in clockwise order, and
//      b) all angles must be equal.
const COMPASS_POINTS = ["N", "E", "S", "W"] as const;

type Direction = (typeof COMPASS_POINTS)[number];

type Rotation = "L" | "R";

function isRotation(input: string): input is Rotation {
  return input === "L" || input === "R";
}

function isDirection(input: string): input is Direction {
  return (COMPASS_POINTS as ReadonlyArray<string>).includes(input);
}

function rotate(rotation: Rotation, from: Direction) {
  const rotated =
    (COMPASS_POINTS.indexOf(from) +
      (rotation === "L" ? -1 : 1) +
      COMPASS_POINTS.length) %
    COMPASS_POINTS.length;

  return COMPASS_POINTS[rotated];
}

export { Direction, Rotation, isDirection, isRotation, rotate };
