const COMPASS_POINTS = ["N", "E", "S", "W"] as const;

type Direction = (typeof COMPASS_POINTS)[number];

function isDirection(input: string): input is Direction {
  return (COMPASS_POINTS as ReadonlyArray<string>).includes(input);
}

export { isDirection };
