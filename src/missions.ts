import { Feature, createPlateau } from "./plateau";
import { Instruction, Position } from "./poses";

type Mission = {
  start: Position;
  instructions: Instruction[];
};

function launch(
  topRightTile: Position,
  plateauFeatures: Feature[],
  missions: Mission[] = [],
) {
  if (topRightTile.x < 0 || topRightTile.y < 0) {
    throw new Error("Top right plateau must be (0, 0) or greater");
  }

  const plateau = createPlateau(topRightTile, plateauFeatures);
}

export { launch };
