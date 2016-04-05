import { Injectable, Inject } from "angular2/core";
import { Lesson, LessonService } from "../../lesson/lesson.service";
import { Observable } from "rxjs/Rx";

export interface Waypoint {
  id: number;
  posX: number;
  posY: number;
  hasFigure: boolean;
}

@Injectable()
export class WaypointService {
  private waypoints: Waypoint[] = new Array<Waypoint>();

  constructor( @Inject(LessonService) private _lessonService: LessonService) {
    this._lessonService.getAll().subscribe(lesson => {
      let waypoint = this.createWaypointFromLesson(lesson);
      if (this._lessonService.getLastUnsolvedId() === lesson.id) {
        waypoint.hasFigure = true;
      }
      this.waypoints.push(waypoint);
    });
  }

  getAll(): Observable<Waypoint> {
    while (this.getFigureWaypointId() !== this._lessonService.getLastUnsolvedId()) {
      this.moveFigure(this.getFigureWaypointId());
    }
    return Observable.fromArray(this.waypoints);
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
    return this.waypoints.findIndex(w => { return w.hasFigure === true; });
  }

  private createWaypointFromLesson(lesson: Lesson): Waypoint {
    return {
      id: lesson.id,
      posX: lesson.id * 10,
      posY: lesson.id * 10,
      hasFigure: false
    };
  }
}