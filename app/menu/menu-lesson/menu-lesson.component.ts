import {Component} from "angular2/core";
import {MenuLessonService} from "./menu-lesson.service";
import {MenuLesson} from "../../../DTO/MenuLesson";

@Component({
  selector: "tpw-menu-lesson",
  templateUrl: "app/menu/menu-lesson/menu-lesson.html"
})
export class MenuLessonComponent {
  lessonMenuElems: Array<MenuLesson>;

  constructor(menuLessonService: MenuLessonService) {
    this.lessonMenuElems = menuLessonService.query();
  }

}
