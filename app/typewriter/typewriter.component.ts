import { Component, OnInit, Input } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";

@Component({
  selector: "tpw-typewriter",
  templateUrl: "app/typewriter/typewriter.component.html"
})

export class TypewriterComponent implements OnInit {
  @Input()
  lessonId: number;

  lesson: Lesson;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.lesson = this.lessonService.get(this.lessonId);
  }

}