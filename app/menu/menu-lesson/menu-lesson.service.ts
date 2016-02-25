import {Injectable} from "angular2/core";
import {MenuLesson} from "../../../DTO/MenuLesson";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MenuLessonService {
  constructor() { }
  query(): Observable<MenuLesson[]> {
    return Observable.of([{id: 1, name: "Lesson 1"}, {id: 2, name: "Lesson 2"}]);
  }
}
