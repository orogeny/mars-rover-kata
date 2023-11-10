import { Plateau, Tile, createPlateau, isBoundary } from "./plateau";
import { Instruction, Pose, Position, repose } from "./poses";

type Mission = {
  start: Pose;
  instructions: Instruction[];
};

function launch(
  topRightCoordinates: Position,
  plateauFeatures: Tile[],
  missions: Mission[] = [],
) {
  if (topRightCoordinates.x < 0 || topRightCoordinates.y < 0) {
    throw new Error("Top right plateau must be (0, 0) or greater");
  }

  const plateau = createPlateau(topRightCoordinates, plateauFeatures);

  const results = missions.map(({ start, instructions }) =>
    rover(start, instructions, plateau),
  );

  return results.map((r) => r.tracker[r.tracker.length - 1]);
}

function rover(start: Pose, instructions: Instruction[], chart: Plateau) {
  if (isBoundary(chart(start.position))) {
    return { status: "abandoned", tracker: [] };
  }

  function manouvre(
    previous: Pose,
    instructions: Instruction[],
    tracker: Pose[] = [],
  ) {
    if (instructions.length === 0) {
      return { status: "arrived", tracker };
    }

    const [instruction, ...remaining] = instructions;

    const next = repose(instruction, previous);

    if (isBoundary(chart(next.position))) return { status: "halted", tracker };

    return manouvre(next, remaining, tracker.concat(next));
  }

  return manouvre(start, instructions, [start]);
}

export { launch };
