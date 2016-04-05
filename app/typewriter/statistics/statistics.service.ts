import { Injectable } from "angular2/core";

export interface Statistics {
  numberOfTotalKeypresses: number;
  numberOfCorrectKeypresses: number;
  numberOfIncorrectKeypresses: number;
  pressedKeysPerSec: number;
  accuracy: number;
  secondsToCompleteLesson?: number;
}

@Injectable()
export class StatisticsService {

  constructor() { }

  calculateStatisticsForLesson(correctKeypresses: number, incorrectKeypresses: number, secondsToCompleteLesson: number): Statistics {
    let calculatedStatistics: Statistics = {
     numberOfTotalKeypresses: 0,
     numberOfCorrectKeypresses: 0,
     numberOfIncorrectKeypresses: 0,
     pressedKeysPerSec: 0,
     secondsToCompleteLesson: 0,
     accuracy: 0
    };
    calculatedStatistics.numberOfTotalKeypresses = correctKeypresses + incorrectKeypresses;
    calculatedStatistics.numberOfCorrectKeypresses = correctKeypresses;
    calculatedStatistics.numberOfIncorrectKeypresses = incorrectKeypresses;
    calculatedStatistics.secondsToCompleteLesson = secondsToCompleteLesson;
    calculatedStatistics.pressedKeysPerSec = calculatedStatistics.numberOfCorrectKeypresses / calculatedStatistics.secondsToCompleteLesson;
    calculatedStatistics.accuracy = correctKeypresses / calculatedStatistics.numberOfTotalKeypresses;
    return calculatedStatistics;
  }

}