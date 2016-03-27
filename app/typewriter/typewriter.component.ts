import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";

@Component({
  selector: "tpw-typewriter",
  templateUrl: "app/typewriter/typewriter.component.html",
  providers: [LessonService],
  styleUrls: ["app/typewriter/typewriter.component.css"]
})

export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild("focus")
  focus: ElementRef;
  @Input()
  lessonId: number;
  lesson: Lesson;
  typedText: string;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.lesson = this.lessonService.get(this.lessonId);
    this.typedText = "";
  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  keypress($event: KeyboardEvent) {
    let char = String.fromCharCode($event.which);
    let tempTyped = this.typedText + char;
    if (tempTyped === this.lesson.text.substr(0, tempTyped.length)) {
      this.typedText = tempTyped;
    }
  }

}