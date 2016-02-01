import {Component} from "angular2/core";
import {MenuLessonService} from "./menu_lesson.service";
import {MenuLesson} from "../../../DTO/MenuLesson";

@Component({
  bindings: [MenuLessonService],
  selector: "tpw-menu-lesson",
  templateUrl: "app/menu/menu_lesson/menu_lesson.html"
})
export class MenuLessonComponent {
  lessonMenuElems: Array<MenuLesson>;

  constructor(menuLessonService: MenuLessonService) {
    this.lessonMenuElems = menuLessonService.query();
  }

}
