const COMPASS_POINTS = ["N", "E", "S", "W"] as const;

type Direction = (typeof COMPASS_POINTS)[number];

function isDirection(input: string): input is Direction {
  return (COMPASS_POINTS as ReadonlyArray<string>).includes(input);
}

function rotateLeft(from: Direction) {
  return COMPASS_POINTS.at(COMPASS_POINTS.indexOf(from) - 1);
}

export { Direction, isDirection, rotateLeft };
