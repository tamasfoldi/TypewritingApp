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
  
  moveFigure(waypointId: number) {
    this.removeFigureFrom(waypointId);
    this.addFigureTo(waypointId + 1);
  }

  addFigureTo(waypointId: number) {
    this.waypoints[waypointId].hasFigure = true;
    console.log(this.waypoints);
  }

  removeFigureFrom(waypointId: number) {
    this.waypoints[waypointId].hasFigure = false;
  }
}