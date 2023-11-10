import { Direction, Rotation, isRotation, rotate } from "./directions";

type Instruction = Rotation | "M";

type Position = { x: number; y: number };

type Pose = {
  position: Position;
  direction: Direction;
};

function displayPose(pose: Pose) {
  const {
    position: { x, y },
    direction,
  } = pose;

  return `(${x}, ${y}) ${direction}`;
}

function repose(instruction: Instruction, from: Pose) {
  if (isRotation(instruction)) {
    return {
      position: from.position,
      direction: rotate(instruction, from.direction),
    };
  }

  return moveForward(from);
}

function moveForward(from: Pose) {
  const {
    direction,
    position: { x, y },
  } = from;

  switch (direction) {
    case "N":
      return { direction, position: { x, y: y + 1 } };
    case "S":
      return { direction, position: { x, y: y - 1 } };
    case "E":
      return { direction, position: { x: x + 1, y } };
    case "W":
      return { direction, position: { x: x - 1, y } };
  }
}

export { Instruction, Position, Pose, displayPose, repose };
