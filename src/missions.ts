import { Plateau, Tile, createPlateau, isBoundary } from "./plateau";
import { Instruction, Pose, Position, isInstruction, repose } from "./poses";

type Mission = {
  start: Pose;
  instructions: Instruction[];
};

type MissionStatus = { status: "abandoned" | "arrived" | "halted"; pose: Pose };

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
  ) as MissionStatus[];

  return results.map((m: MissionStatus) => m.pose);
}

function rover(start: Pose, instructions: Instruction[], chart: Plateau) {
  if (isBoundary(chart(start.position))) {
    return { status: "abandoned", start };
  }

  function manouvre(pose: Pose, instructions: Instruction[]) {
    if (instructions.length === 0) {
      return { status: "arrived", pose };
    }

    const [cmd, ...remaining] = instructions;

    if (!isInstruction(cmd)) {
      // discard invalid commands
      return manouvre(pose, remaining);
    }

    const next = repose(cmd, pose);

    if (isBoundary(chart(next.position))) return { status: "halted", pose };

    return manouvre(next, remaining);
  }

  return manouvre(start, instructions);
}

export { launch };
