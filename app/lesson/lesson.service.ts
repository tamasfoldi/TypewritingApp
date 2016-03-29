import { Injectable } from "angular2/core";

export interface Lesson {
  id: number;
  name: string;
  text: string;
}

@Injectable()
export class LessonService {

  lessons: Lesson[];

  constructor() {
    this.lessons = [
      {
        "id": 1,
        "name": "Lesson 1",
        "text": "Lesson one text"
      },
      {
        "id": 2,
        "name": "Lesson 2",
        "text": "Lesson two text"
      },
      {
        "id": 3,
        "name": "Lesson 3",
        "text": "Lesson three text"
      },
      {
        "id": 4,
        "name": "Lesson 4",
        "text": "Lesson four text"
      },
      {
        "id": 5,
        "name": "Lesson 5",
        "text": "Lesson five text"
      },
      {
        "id": 6,
        "name": "Lesson 6",
        "text": "Lesson six text"
      },
      {
        "id": 7,
        "name": "Lesson 7",
        "text": "Lesson seven text"
      },
      {
        "id": 8,
        "name": "Lesson 8",
        "text": "Lesson eight text"
      },
      {
        "id": 9,
        "name": "Lesson 9",
        "text": "Lesson nine text"
      }
    ];
  }

  getAll(): Lesson[] {
    return this.lessons;
  }

  get(id: number) {
    return this.lessons[id];
  }

}