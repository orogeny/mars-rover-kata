import { Direction } from "./directions";

type Position = { x: number; y: number };

type Pose = {
  position: Position;
  direction: Direction;
};

type Vehicle = {
  pose: Pose;
  tracker: string[];
};

function displayPose(pose: Pose) {
  const {
    position: { x, y },
    direction,
  } = pose;

  return `(${x}, ${y}) ${direction}`;
}

function prepareVehicle(start: Pose) {
  return {
    pose: start,
    tracker: [`start @ ${displayPose(start)}`],
  };
}

export { Position, Pose, Vehicle, prepareVehicle };
