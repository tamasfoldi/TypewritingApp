import { Component, OnInit, Input, ElementRef, ViewChild, ContentChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "angular2/core";
import { Statistics, StatisticsService } from "./statistics/statistics.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { BlinkingCursorComponent } from "../util/blinking-cursor/blinking-cursor.component";

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
  providers: [LessonService, StatisticsService],
  styleUrls: ["app/typewriter/typewriter.component.css"],
  pipes: [LessonTextCutPipe, SpaceToUnderscorePipe],
  directives: [StatisticsComponent, BlinkingCursorComponent]
})

export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild("focus")
  focus: ElementRef;
  @ViewChild(BlinkingCursorComponent)
  blinkingCursorComponent: BlinkingCursorComponent;
  @ViewChild(StatisticsComponent)
  statisticsComponent: StatisticsComponent;
  @Input()
  lessonId: number;
  lesson: Lesson;
  typedText: string;
  correctPresses: number;
  incorrectPresses: number;
  timer: number;
  canShowStats: boolean;
  statistics: Statistics;

  constructor(
    private lessonService: LessonService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit() {
    this.lesson = this.lessonService.get(this.lessonId);
    this.typedText = "";
    this.correctPresses = 0;
    this.incorrectPresses = 0;
    this.canShowStats = false;
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
      this.timer = (Date.now() - this.timer) / 1000;
      this.statistics = this.statisticsService.calculateStatisticsForLesson(this.correctPresses, this.incorrectPresses, this.timer);
      console.log(this.statistics);
      this.canShowStats = true;
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