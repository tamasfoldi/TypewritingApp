import { Injectable } from "angular2/core";

export interface Waypoint {
  id: number;
  posX: number;
  posY: number;
  hasFigure: boolean;
}

@Injectable()
export class WaypointService {
  private waypoints = [{ id: 0, posX: 0, posY: 0, hasFigure: false }, { id: 1, posX: 10, posY: 10, hasFigure: true }];

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
  }

  removeFigureFrom(waypointId: number) {
    this.waypoints[waypointId].hasFigure = false;
  }

  getNumberOfWaypoints(): number {
    return this.waypoints.length;
  }

  getFigureWaypointId(): number {
    return this.waypoints.filter((w) => { return w.hasFigure === true; })[0].id;
  }
}