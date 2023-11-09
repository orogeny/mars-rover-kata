import { Position, Pose, Vehicle, prepareVehicle } from "./vehicle";

describe("vehicle", () => {
  test("prepareVehicle", () => {
    const startPosition = { x: 0, y: 0 } as Position;
    const startDirection = "N";
    const startPose = {
      position: startPosition,
      direction: startDirection,
    } as Pose;

    const rover = { pose: startPose, tracker: ["start @ (0, 0) N"] } as Vehicle;

    expect(prepareVehicle(startPose)).toEqual(rover);
  });
});
