import { Injectable } from "angular2/core";

export interface Waypoint {
  id: number;
  posX: number;
  posY: number;
  hasFigure: boolean;
}

@Injectable()
export class WaypointService {
  waypoints = [{ id: 0, posX: 0, posY: 0, hasFigure: true }, { id: 1, posX: 10, posY: 10, hasFigure: false }];

  constructor() { }

  getAll(): Waypoint[] {
    return this.waypoints;
  }

  moveFigure(): Waypoint[] {
    let waypointIdWithFigure = this.waypoints.filter((w) => w.hasFigure)[0].id;
    if(waypointIdWithFigure + 1 < this.waypoints.length) {
      this.waypoints[waypointIdWithFigure].hasFigure = false;
      this.waypoints[waypointIdWithFigure + 1].hasFigure = true;
      return this.waypoints;
    }
  }

}