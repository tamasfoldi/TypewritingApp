import { Injectable } from "angular2/core";
import { Observable } from "rxjs/Rx";

export interface Lesson {
  id: number;
  name: string;
  text: string;
  solved: boolean;
}

@Injectable()
export class LessonService {

  lessons: Lesson[];

  constructor() {
    this.lessons = [
      {
        "id": 0,
        "name": "Lesson 1",
        "text": "Lesson one text",
        "solved": false
      },
      {
        "id": 1,
        "name": "Lesson 2",
        "text": "Lesson two text",
        "solved": false
      },
      {
        "id": 2,
        "name": "Lesson 3",
        "text": "Lesson three text",
        "solved": false
      },
      {
        "id": 3,
        "name": "Lesson 4",
        "text": "Lesson four text",
        "solved": false
      },
      {
        "id": 4,
        "name": "Lesson 5",
        "text": "Lesson five text",
        "solved": false
      },
      {
        "id": 5,
        "name": "Lesson 6",
        "text": "Lesson six text",
        "solved": false
      },
      {
        "id": 6,
        "name": "Lesson 7",
        "text": "Lesson seven text",
        "solved": false
      },
      {
        "id": 7,
        "name": "Lesson 8",
        "text": "Lesson eight text",
        "solved": false
      },
      {
        "id": 8,
        "name": "Lesson 9",
        "text": "Lesson nine text",
        "solved": false
      }
    ];
  }

  getAll(): Observable<Lesson> {
    return Observable.fromArray(this.lessons);
  }

  get(id: number) {
    return this.lessons[id];
  }

  getLastUnsolvedId(): number {
    return this.lessons.findIndex(l => { return l.solved === false; });
  }

  setAsSolved(lessonId: number): void {
    this.lessons[lessonId].solved = true;
  }

}