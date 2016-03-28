import { Injectable } from "angular2/core";

export interface Statistics {
  numberOfTotalKeypresses: number;
  numberOfCorrectKeypresses: number;
  numberOfIncorrectKeypresses: number;
  pressedKeysPerSec: number;
  timeToCompleteLesson?: number;
}

@Injectable()
export class StatisticsService {

  constructor() { }

  calculateStatisticsForLesson(correctKeypresses: number, incorrectKeypresses: number, timeToComplete: number): Statistics {
    let calculatedStatistics: Statistics = {
     numberOfTotalKeypresses: 0,
     numberOfCorrectKeypresses: 0,
     numberOfIncorrectKeypresses: 0,
     pressedKeysPerSec: 0,
     timeToCompleteLesson: 0
    };
    calculatedStatistics.numberOfTotalKeypresses = correctKeypresses + incorrectKeypresses;
    calculatedStatistics.numberOfCorrectKeypresses = correctKeypresses;
    calculatedStatistics.numberOfIncorrectKeypresses = incorrectKeypresses;
    calculatedStatistics.timeToCompleteLesson = timeToComplete;
    calculatedStatistics.pressedKeysPerSec = calculatedStatistics.numberOfTotalKeypresses / calculatedStatistics.timeToCompleteLesson;
    return calculatedStatistics;
  }

}