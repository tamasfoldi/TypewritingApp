import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "angular2/core";

@Pipe({name: "lessonTextCut"})
export class LessonTextCutPipe implements PipeTransform {
  transform(baseText: string, [textToBeCut]) : string {
    return baseText.substr(textToBeCut.length, baseText.length);
  }
}

@Pipe({name: "spaceToUnderscore"})
export class SpaceToUnderscorePipe implements PipeTransform {
  transform(baseText: string) : string {
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