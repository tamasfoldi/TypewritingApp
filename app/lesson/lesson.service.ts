import { Injectable } from "angular2/core";
import { Observable } from "rxjs/Rx";

export interface Lesson {
  id: number;
  name: string;
  text: string;
}

@Injectable()
export class LessonService {

  private _lessons: Lesson[];

  constructor() {
    this._lessons = [
      {
        "id": 0,
        "name": "Lesson 1",
        "text": "Lesson one text"
      },
      {
        "id": 1,
        "name": "Lesson 2",
        "text": "Lesson two text"
      },
      {
        "id": 2,
        "name": "Lesson 3",
        "text": "Lesson three text"
      },
      {
        "id": 3,
        "name": "Lesson 4",
        "text": "Lesson four text"
      },
      {
        "id": 4,
        "name": "Lesson 5",
        "text": "Lesson five text"
      },
      {
        "id": 5,
        "name": "Lesson 6",
        "text": "Lesson six text"
      },
      {
        "id": 6,
        "name": "Lesson 7",
        "text": "Lesson seven text"
      },
      {
        "id": 7,
        "name": "Lesson 8",
        "text": "Lesson eight text"
      },
      {
        "id": 8,
        "name": "Lesson 9",
        "text": "Lesson nine text"
      }
    ];
  }

  get lessons(): Observable<Lesson> {
    return Observable.fromArray(this._lessons);
  }

  get(id: number) {
    return this._lessons[id];
  } 
}