import { Direction, Rotation, rotate } from "./directions";

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

function instruct(instruction: Instruction, previous: Pose) {
  switch (instruction) {
    case "M":
      return moveForward(previous);
    case "L":
      return rotatePort(previous);
    case "R":
      return rotateStarboard(previous);
  }
}

function moveForward(pose: Pose) {
  const {
    direction,
    position: { x, y },
  } = pose;

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

function rotatePort(pose: Pose) {
  const { direction, position } = pose;

  return { direction: rotate("L", direction), position };
}

function rotateStarboard(pose: Pose) {
  const { direction, position } = pose;

  return { direction: rotate("R", direction), position };
}

export { Instruction, Position, Pose, displayPose, instruct };
