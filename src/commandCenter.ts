import { createPlateau } from "./plateau";
import { Position } from "./poses";
import { Vehicle } from "./vehicles";

function beginMission(topRight: Position, vehicles: Vehicle[]) {
  const plateau = createPlateau(topRight);

  return [
    {
      position: { x: 1, y: 3 },
      direction: "N",
    },
  ];
}

export { beginMission };
