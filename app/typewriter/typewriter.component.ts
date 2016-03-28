import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "angular2/core";

@Pipe({ name: "lessonTextCut" })
export class LessonTextCutPipe implements PipeTransform {
  transform(baseText: string, [textToBeCut]): string {
    return baseText.substr(textToBeCut.length, baseText.length);
  }
}

@Pipe({ name: "spaceToUnderscore" })
export class SpaceToUnderscorePipe implements PipeTransform {
  transform(baseText: string): string {
    return baseText.replace(/( )/g, "_");
  }
}

@Component({
  selector: "tpw-typewriter",
  templateUrl: "app/typewriter/typewriter.component.html",
  providers: [LessonService],
  styleUrls: ["app/typewriter/typewriter.component.css"],
  pipes: [LessonTextCutPipe, SpaceToUnderscorePipe]
})

export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild("focus")
  focus: ElementRef;
  @Input()
  lessonId: number;
  lesson: Lesson;
  typedText: string;
  correctPresses: number;
  incorrectPresses: number;
  timer: number;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.lesson = this.lessonService.get(this.lessonId);
    this.typedText = "";
    this.correctPresses = 0;
    this.incorrectPresses = 0;
  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  keypress($event: KeyboardEvent) {
    let char = String.fromCharCode($event.which); 
    if (!this.hasReachedTheEnd()) {
      if (this.wasItCorrectChar(char)) {
        this.typedText = this.typedText + char;
        this.correctPresses++;
        if (this.wasTheFirstPress(char)) {
          this.timer = Date.now();
        }
      } else {
        this.incorrectPresses++;
      }
    }
    if (this.hasReachedTheEnd()) {
      this.focus.nativeElement.blur();
      this.timer = Date.now() - this.timer;
      // TODO generate statistics
      console.log(this.correctPresses, this.incorrectPresses, this.timer);
    }
  }

  wasItCorrectChar(c: string): boolean {
    return this.typedText + c === this.lesson.text.substr(0, this.typedText.length + 1);
  }

  hasReachedTheEnd(): boolean {
    return this.typedText === this.lesson.text;
  }

  wasTheFirstPress(c: string): boolean {
    return this.typedText.length === 1;
  }

}