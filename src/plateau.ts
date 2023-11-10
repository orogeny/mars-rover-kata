import { Position } from "./poses";

type Feature = {
  position: Position;
  content: string;
};

function createPlateau(topRight: Position, features: Feature[]) {
  const longitude = { min: 0, max: topRight.x };
  const latituted = { min: 0, max: topRight.y };

  return function (position: Position) {
    if (
      position.x < longitude.min ||
      position.x > longitude.max ||
      position.y < latituted.min ||
      position.y > latituted.max
    ) {
      return { position, content: "boundary" };
    }

    const content = features
      .filter(({ position: { x, y } }) => x === position.x && y === position.y)
      .map((f) => f.content)
      .join(", ");

    return { position, content };
  };
}

export { Feature, createPlateau };
