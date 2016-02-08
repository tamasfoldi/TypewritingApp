import {Component, Inject, OnInit} from "angular2/core";
import {MenuLessonService} from "./menu-lesson.service";
import {MenuLesson} from "../../../DTO/MenuLesson";

@Component({
  providers: [MenuLessonService],
  selector: "tpw-menu-lesson",
  templateUrl: "app/menu/menu-lesson/menu-lesson.html"
})
export class MenuLessonComponent {
  lessonMenuElems: Array<MenuLesson>;

  private menuLessonService: MenuLessonService;
  constructor( @Inject(MenuLessonService) menuLessonService: MenuLessonService) {
    this.menuLessonService = menuLessonService;

    this.getMenuItems();
  }

  getMenuItems() {
    this.lessonMenuElems = this.menuLessonService.query();
  }

}
