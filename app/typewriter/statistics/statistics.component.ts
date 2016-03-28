import { Component, OnInit } from "angular2/core";
import { Statistics, StatisticsService } from "./statistics.service";

@Component({
  selector: "tpw-lesson-statistics",
  templateUrl: "app/typewriter/statistics/statistics.component.html",
  providers: [StatisticsService]
})
export class StatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) { }

  statistics: Statistics;

  ngOnInit() {
    this.statistics = {
      numberOfTotalKeypresses: 0,
      numberOfCorrectKeypresses: 0,
      numberOfIncorrectKeypresses: 0,
      pressedKeysPerSec: 0,
      timeToCompleteLesson: 0
    };
  }

  setStatisticsFromLessonStat(correctKeypresses: number, incorrectKeypresses: number, timeToComplete: number): void {
    this.statistics = this.statisticsService.calculateStatisticsForLesson(correctKeypresses, incorrectKeypresses, timeToComplete);
  }

}