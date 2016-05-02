import { Component, OnInit, Injector, Input, Output, EventEmitter, ElementRef, ViewChild, ContentChild, AfterViewInit } from "angular2/core";
import { LessonService, Lesson } from "../lesson/lesson.service";
import { Pipe, PipeTransform } from "angular2/core";
import { RouteParams, Router, CanActivate, ComponentInstruction } from "angular2/router";
import { Statistics, StatisticSnapshot } from "./statistics/statistics.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { BlinkingCursorComponent } from "../util/blinking-cursor/blinking-cursor.component";
import { appInjector } from "../app-injector";
import { UserService } from "../user/user.service";
import { LineChart } from "primeng/primeng";
import {isString, isPresent, isBlank} from "angular2/src/facade/lang";
import {BaseException} from "angular2/src/facade/exceptions";

@Pipe({ name: "lessonTextCut" })
export class LessonTextCutPipe implements PipeTransform {
  transform(baseText: string, textToBeCut: string): string {
    if (isPresent(baseText) && !isString(baseText)) {
      throw new BaseException("BaseText must be a string");
    }
    if (isPresent(textToBeCut) && !isString(textToBeCut)) {
      throw new BaseException("TextToBeCut must be a string");
    }
    if (!isBlank(textToBeCut) && baseText && textToBeCut) {
      return baseText.substr(textToBeCut.length, baseText.length);
    } else {
      return baseText;
    }
  }
}

@Pipe({ name: "spaceToUnderscore" })
export class SpaceToUnderscorePipe implements PipeTransform {
  transform(baseText: string): string {
    if (isPresent(baseText) && !isString(baseText)) {
      throw new BaseException("BaseText must be a string!");
    }
    if (baseText) {
      return baseText.replace(/( )/g, "_");
    }
  }
}

@Component({
  selector: "tpw-typewriter",
  templateUrl: "app/typewriter/typewriter.component.html",
  styleUrls: ["app/typewriter/typewriter.component.css"],
  pipes: [LessonTextCutPipe, SpaceToUnderscorePipe],
  directives: [StatisticsComponent, BlinkingCursorComponent, LineChart]
})
@CanActivate((next: ComponentInstruction, prev: ComponentInstruction) => {
  let injector: Injector = appInjector();
  let _router: Router = appInjector().get(Router);  
  let _userService: UserService = appInjector().get(UserService);

  return new Promise((resolve) => {
    if (_userService.user && _userService.user.lastCompletedLessonId + 1 >= parseInt(next.params["id"])) { //
      resolve(true);
    } else {
      _router.navigate(["Game"]);
      resolve(false);
    }
  });
})
export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild("focus")
  private focus: ElementRef;

  private lesson: Lesson;
  private typedText: string;
  private statistics: Statistics;

  private snapshots: StatisticSnapshot[] = new Array<StatisticSnapshot>();
  private lineChartData: any;
  private snaphotCreater: NodeJS.Timer;

  constructor(
    private _lessonService: LessonService,
    private _userService: UserService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    this._lessonService.get(parseInt(this._routeParams.get("id"))).subscribe((lesson) => {
      this.lesson = lesson;
      this.statistics = new Statistics(this.lesson.id);
    });
    this.typedText = "";

  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  keypressEventHendler($event: KeyboardEvent) {
    if (!this.hasReachedTheEnd()) {
      let intputChar = String.fromCharCode($event.which);
      this.handleInputChar(intputChar);
    }
    if (this.hasReachedTheEnd()) {
      this.handleLessonEnd();
    }
  }

  handleInputChar(char: string) {
    if (this.wasItCorrectChar(char)) {
      if (this.wasTheFirstPress(char)) {
        this.snaphotCreater = setInterval(() => {
          let snapshot: StatisticSnapshot = {
            createdAt: Date.now(),
            numberOfCorrectKeypresses: this.statistics.numberOfCorrectKeypresses,
            numberOfIncorrectKeypresses: this.statistics.numberOfIncorrectKeypresses,
            typingSeed: this.statistics.numberOfCorrectKeypresses / ((Date.now() - this.statistics.startTime) / 1000),
            accuracy: this.statistics.accuracy
          }
          this.snapshots.push(snapshot);
        }, 100);
        this.statistics.startTime = Date.now();
      }
      this.typedText = this.typedText + char;
      this.statistics.numberOfCorrectKeypresses++;
    } else {
      this.statistics.numberOfIncorrectKeypresses++;
    }
  }

  handleLessonEnd() {
    clearInterval(this.snaphotCreater);
    this.setLineChartDatas();
    this.focus.nativeElement.blur();
    this.statistics.stopTime = Date.now();
    this._userService.updateLastCompletedLesson(this.lesson.id);
    this._userService.saveLessonStatistic(this.lesson.id, this.statistics);
    setTimeout(() => {
      this._router.navigate(["Map"]);
    }, 10000);
  }

  setLineChartDatas() {
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

  wasItCorrectChar(c: string): boolean {
    return this.typedText + c === this.lesson.text.substr(0, this.typedText.length + 1);
  }

  hasReachedTheEnd(): boolean {
    return (this.lesson && this.typedText === this.lesson.text);
  }

  wasTheFirstPress(c: string): boolean {
    return this.typedText.length === 0;
  }

}
