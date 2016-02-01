import {MenuLesson} from "../../../DTO/MenuLesson";

export class MenuLessonService {
  query(): Array<MenuLesson> {
    return [{
      id: 1,
      name: "Lesson 1"
    },
    {
      id: 2,
      name: "Lesson 2"
    }];
  }
}
