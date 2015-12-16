/// <reference path="../../../references.ts" />

module Controllers {
  import ILesson = Model.ILesson;
  import Statistic = Model.Statistic;

  export class LessonCtrl {
    location: angular.ILocationService;
    lesson: ILesson;
    typedText: string;
    textToBeType: string;
    scope: angular.IScope;
    statistic: Statistic;
    resultIsHidden: boolean;
    textareaIsDisabled: boolean;
    interval: angular.IIntervalService;

    constructor($location: angular.ILocationService, $scope, LessonService: Services.ILessonService) {
      this.location = $location;
      this.lesson = LessonService.get({ id: this.location.search().id });
      this.lesson.$promise.then((data) => {
        this.textToBeType = this.lesson.text;
      });
      this.textToBeType = this.lesson.text;
      this.typedText = "";
      this.scope = $scope;
      this.statistic = new Statistic();
      this.resultIsHidden = true;
      this.textareaIsDisabled = false;
      this.scope.$on("timer-stopped", (event, data) => {
        this.statistic.calculateTypingSpeed(data.millis);
        this.statistic.setTime(data.millis);
      });
    }

    public keyPressHandler($event) {
      var char: string = String.fromCharCode($event.which);
      var tempTyped = this.typedText + char;
      if (tempTyped !== this.lesson.text.substr(0, tempTyped.length)) {
        $event.preventDefault();
        this.statistic.increaseNofMistakes();
      } else {
        this.statistic.increaseNofCorrectKeyPresses();
        this.textToBeType = this.lesson.text.substr(this.typedText.length + 1, this.lesson.text.length);
        if (tempTyped === this.lesson.text[0]) { // at the first character the timer starts
          this.scope.$broadcast("timer-start");
        }
        if (tempTyped === this.lesson.text) { // at the last character the timer stops and the textarea sets to disabled
          this.resultIsHidden = false;
          this.textareaIsDisabled = true;
          this.typedText = tempTyped;
          this.scope.$broadcast("timer-stop");
        }
      }
    }
  }
}
