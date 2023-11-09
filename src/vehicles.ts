import { Instruction, Pose } from "./poses";

type Vehicle = {
  name: string;
  start: Pose;
  instructions: Instruction[];
};

function prepareVehicle(name: string, start: Pose, instructions: string) {
  return {
    name,
    start,
    instructions: instructions.split(""),
  };
}

export { Vehicle, prepareVehicle };
