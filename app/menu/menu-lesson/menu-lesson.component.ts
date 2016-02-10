import {Component, Inject, OnInit} from "angular2/core";
import {MenuLessonService} from "./menu-lesson.service";
import {MenuLesson} from "../../../DTO/MenuLesson";

@Component({
  providers: [MenuLessonService],
  selector: "tpw-menu-lesson",
  templateUrl: "app/menu/menu-lesson/menu-lesson.html"
})
export class MenuLessonComponent implements OnInit {
  lessonMenuElems: Array<MenuLesson>;

  private menuLessonService: MenuLessonService;
  constructor( @Inject(MenuLessonService) private _menuLessonService: MenuLessonService) {
  }

  getMenuItems() {
    this.lessonMenuElems = this._menuLessonService.query();
  }

  ngOnInit() {
    this.getMenuItems();
  }

}
