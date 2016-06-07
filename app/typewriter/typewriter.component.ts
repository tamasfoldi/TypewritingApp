import { Component, OnInit, Injector, Input, Output, EventEmitter, ElementRef, ViewChild, ContentChild, AfterViewInit } from "@angular/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "@angular/core";
import { Routes, Router, OnActivate, RouteSegment } from "@angular/router";
import { Statistics, StatisticSnapshot } from "./statistics/statistics.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { BlinkingCursorComponent } from "../util/blinking-cursor/blinking-cursor.component";
import { appInjector } from "../app-injector";
import { UserService } from "../user/user.service";
import { UIChart } from "primeng/primeng";
import { LessonTextCutPipe } from "./lesson-text-cut.pipe";
import { SpaceToUnderscorePipe } from "./space-to-underscore.pipe";

@Component({
  moduleId: module.id,
  selector: "tpw-typewriter",
  templateUrl: "typewriter.component.html",
  styleUrls: ["typewriter.component.css"],
  pipes: [LessonTextCutPipe, SpaceToUnderscorePipe],
  directives: [StatisticsComponent, BlinkingCursorComponent, UIChart]
})
export class TypewriterComponent implements OnActivate, OnInit, AfterViewInit {
  @ViewChild("focus")
  private focus: ElementRef;

  private lesson: Lesson;
  private _typedText: string;
  private _statistics: Statistics;

  private snapshots: StatisticSnapshot[] = new Array<StatisticSnapshot>();
  private lineChartData: any;
  private snaphotCreater: NodeJS.Timer;

  constructor(
    private _lessonService: LessonService,
    private _userService: UserService,
    private _router: Router 
  ) { }

  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this._lessonService.get(id).subscribe((lesson) => {
      this.lesson = lesson;
      this._statistics = new Statistics(this.lesson.id);
    });
  }

  ngOnInit() {
    
    this._typedText = "";

  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  keypressEventHandler($event: KeyboardEvent) {
    if (!this.hasReachedTheEnd()) {
      let intputChar = String.fromCharCode($event.which);
      this.handleInputChar(intputChar);
    }
    if (this.hasReachedTheEnd()) {
      this.handleLessonEnd();
    }
  }

  private handleInputChar(char: string) {
    if (this.wasItCorrectChar(char)) {
      if (this.wasTheFirstPress(char)) {
        this.snaphotCreater = setInterval(() => {
          let snapshot: StatisticSnapshot = {
            createdAt: Date.now(),
            numberOfCorrectKeypresses: this._statistics.numberOfCorrectKeypresses,
            numberOfIncorrectKeypresses: this._statistics.numberOfIncorrectKeypresses,
            typingSeed: this._statistics.numberOfCorrectKeypresses / ((Date.now() - this._statistics.startTime) / 1000),
            accuracy: this._statistics.accuracy
          }
          this.snapshots.push(snapshot);
        }, 100);
        this._statistics.startTime = Date.now();
      }
      this._typedText = this._typedText + char;
      this._statistics.numberOfCorrectKeypresses++;
    } else {
      if (!this.wasTheFirstPress(char)) {
        this._statistics.numberOfIncorrectKeypresses++;
      }
    }
  }

  private handleLessonEnd() {
    clearInterval(this.snaphotCreater);
    this.setLineChartDatas();
    this.focus.nativeElement.blur();
    this._statistics.stopTime = Date.now();
    this._userService.updateLastCompletedLesson(this.lesson.id);
    this._userService.saveLessonStatistic(this.lesson.id, this._statistics);
    setTimeout(() => {
      this._router.navigate(["Map"]);
    }, 10000);
  }

  private setLineChartDatas() {
    let labels = new Array<number>();
    let speeds = new Array<number>();
    let accuracys = new Array<number>();
    this.snapshots.forEach((snapshot, index) => {
      labels.push(index * 100);
      speeds.push(snapshot.typingSeed);
      accuracys.push(snapshot.accuracy * 100);
    });
    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          label: "Typing speed",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: speeds
        },
        {
          label: "Typing accuarcy",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: accuracys
        },
      ]
    };
  }

  private wasItCorrectChar(c: string): boolean {
    return this._typedText + c === this.lesson.text.substr(0, this._typedText.length + 1);
  }

  private hasReachedTheEnd(): boolean {
    return (this.lesson && this._typedText === this.lesson.text);
  }

  private wasTheFirstPress(c: string): boolean {
    return this._typedText.length === 0;
  }

  get typedText() {
    return this._typedText;
  }

  get statistics() {
    return this._statistics;
  }

}
