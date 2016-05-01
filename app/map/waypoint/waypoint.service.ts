import { Injectable, Inject } from "angular2/core";
import { Lesson, LessonService } from "../../lesson/lesson.service";
import { Observable } from "rxjs/Rx";
import {BaseException} from 'angular2/src/facade/exceptions';

export interface Waypoint {
  id: number;
  posX: number;
  posY: number;
}

@Injectable()
export class WaypointService {
  private _waypoints: Observable<Waypoint[]>;

  constructor( @Inject(LessonService) private _lessonService: LessonService) { }

  get waypoints(): Observable<Waypoint[]> {
    if (!this._waypoints) {
      this._waypoints = this._lessonService.lessons.map((lessons) => {
        let waypoints = new Array<Waypoint>();
        lessons.forEach((lesson) => {
          let waypoint = this.createWaypointFromLesson(lesson);
          waypoints.push(waypoint);
        });
        return waypoints;
      });
    }
    return this._waypoints;
  }

  private createWaypointFromLesson(lesson: Lesson): Waypoint {
    return {
      id: lesson.id,
      posX: lesson.id * 10,
      posY: lesson.id * 10
    };
  }
}