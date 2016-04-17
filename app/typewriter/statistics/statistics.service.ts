import { Injectable } from "angular2/core";

export class Statistics {
  private _numberOfCorrectKeypresses: number;
  private _numberOfIncorrectKeypresses: number;
  private _startTime: number;
  private _stopTime: number;
   
  constructor(private _lessonId: number) { // later the star will be calculated based lesson properties
    this._numberOfCorrectKeypresses = 0;
    this._numberOfIncorrectKeypresses = 0;
    this._startTime = 0;
    this._stopTime = 0;
  }

  get numberOfCorrectKeypresses(): number {
    return this._numberOfCorrectKeypresses;
  }
  set numberOfCorrectKeypresses(val: number) {
    this._numberOfCorrectKeypresses = val;
  }

  get numberOfIncorrectKeypresses(): number {
    return this._numberOfIncorrectKeypresses;
  }
  set numberOfIncorrectKeypresses(val: number) {
    this._numberOfIncorrectKeypresses = val;
  }

  get startTime(): number {
    return this._startTime;
  }
  set startTime(val: number) {
    this._startTime = val;
  }
  
  get stopTime(): number {
    return this._stopTime;
  }
  set stopTime(val: number) {
    this._stopTime = val;
  }
  
  get secondsToCompleteLesson(): number {
    return (this.stopTime - this.startTime) / 1000;
  }

  get pressedKeysPerSec(): number {
    return this.numberOfCorrectKeypresses / this.secondsToCompleteLesson;
  }

  get numberOfTotalKeypresses(): number {
    return this.numberOfCorrectKeypresses + this.numberOfIncorrectKeypresses;
  }

  get accuracy(): number {
    return this.numberOfCorrectKeypresses / this.numberOfTotalKeypresses;
  }
  
  get star(): number {
    let i = Math.random() * 5;
    return Math.round(i);
  }

}