/// <reference path="../../../references.ts" />

module Model {
  export class Statistic {
    private nofMistakes: number = 0;
    private typingSpeed: number = 0;
    private time: number = 0;
    private nofCorrectKeyPresses: number = 0;

    constructor() {
      return this;
    }

    getNofMistakes(): number {
      return this.nofMistakes;
    }

    getNofKeyPresses(): number {
      return this.nofMistakes + this.nofCorrectKeyPresses;
    }

    getTypingSpeed(): number {
      return this.typingSpeed;
    }

    calculateTypingSpeed(time: number) {
      this.typingSpeed = (this.getNofKeyPresses() / (time / 1000)) * (60000 / time);
    }

    getNofCorrectKeyPresses(): number {
      return this.nofCorrectKeyPresses;
    }

    increaseNofCorrectKeyPresses() {
      this.nofCorrectKeyPresses++;
    }

    increasNofMistakes() {
      this.nofMistakes++;
    }

    getTime(): number {
      return this.time;
    }

    getTimeInSeconds(): number {
      return this.time / 1000;
    }

    setTime(time: number) {
      this.time = time;
    }

    getAccuracy(): number {
      return this.nofCorrectKeyPresses / this.getNofKeyPresses() * 100;
    }
  }
}
