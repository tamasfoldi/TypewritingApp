import { Injectable, Inject } from "angular2/core";
import { Lesson, LessonService } from "../../lesson/lesson.service";
import { Observable } from "rxjs/Rx";

export interface Waypoint {
  id: number;
  posX: number;
  posY: number;
}

@Injectable()
export class WaypointService {
  private _waypoints: Waypoint[] = new Array<Waypoint>();

  constructor( @Inject(LessonService) private _lessonService: LessonService) {
    this._lessonService.lessons.subscribe(lesson => {
      let waypoint = this.createWaypointFromLesson(lesson);
      this._waypoints.push(waypoint);
    });
  }

  get waypoints(): Observable<Waypoint[]> {
    return Observable.of(this._waypoints);
  }

  private createWaypointFromLesson(lesson: Lesson): Waypoint {
    return {
      id: lesson.id,
      posX: lesson.id * 10,
      posY: lesson.id * 10
    };
  }
}