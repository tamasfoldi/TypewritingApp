import { Component, OnInit, Injector, Input, Output, EventEmitter, ElementRef, ViewChild, ContentChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "angular2/core";
import { RouteParams, Router, CanActivate, ComponentInstruction } from "angular2/router";
import { Statistics, StatisticsService } from "./statistics/statistics.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { BlinkingCursorComponent } from "../util/blinking-cursor/blinking-cursor.component";
import {appInjector} from "../app-injector";

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
  providers: [StatisticsService],
  styleUrls: ["app/typewriter/typewriter.component.css"],
  pipes: [LessonTextCutPipe, SpaceToUnderscorePipe],
  directives: [StatisticsComponent, BlinkingCursorComponent]
})
@CanActivate((next: ComponentInstruction, prev: ComponentInstruction) => {
  let injector: Injector = appInjector();
  let _lessonService: LessonService = injector.get(LessonService);
  let _router: Router = injector.get(Router);

  return new Promise((resolve) => {
    if (_lessonService.getLastUnsolvedId() >= parseInt(next.params["id"])) {
      resolve(true);
    } else {
      _router.navigate(["Map"]);
      resolve(false);
    }
  });
})
export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild("focus")
  focus: ElementRef;
  @ViewChild(BlinkingCursorComponent)
  blinkingCursorComponent: BlinkingCursorComponent;
  @ViewChild(StatisticsComponent)
  statisticsComponent: StatisticsComponent;

  lesson: Lesson;
  typedText: string;
  correctPresses: number;
  incorrectPresses: number;
  timer: number;
  statistics: Statistics;

  constructor(
    private _lessonService: LessonService,
    private _statisticsService: StatisticsService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    this.lesson = this._lessonService.get(parseInt(this._routeParams.get("id")));
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
      this.timer = (Date.now() - this.timer) / 1000;
      this.statistics = this._statisticsService.calculateStatisticsForLesson(this.correctPresses, this.incorrectPresses, this.timer);
      this._lessonService.setAsSolved(this.lesson.id);
      setTimeout(() => {
        this._router.navigate(["Map"]);
      }, 1000);
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
