/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var Statistic = Model.Statistic;
    var LessonCtrl = (function () {
        function LessonCtrl($location, $scope, LessonService) {
            this.location = $location;
            this.lesson = LessonService.get({ id: this.location.search().id });
            this.typedText = "";
            this.scope = $scope;
            this.statistic = new Statistic();
            this.resultIsHidden = true;
            this.textareaIsDisabled = false;
            this.scope.$on("timer-stopped", function (event, data) {
                var scope = event.currentScope;
                scope.LessonCtrl.statistic.calculateTypingSpeed(data.millis);
                scope.LessonCtrl.statistic.setTime(data.millis);
            });
        }
        LessonCtrl.prototype.keyPressHandler = function ($event) {
            var char = String.fromCharCode($event.which);
            var tempTyped = this.typedText + char;
            if (tempTyped !== this.lesson.text.substr(0, tempTyped.length)) {
                $event.preventDefault();
                this.statistic.increasNofMistakes();
            }
            else {
                this.statistic.increaseNofCorrectKeyPresses();
                this.textToBeType = this.lesson.text.substr(this.typedText.length + 1, this.lesson.text.length);
                if (tempTyped === this.lesson.text[0]) {
                    this.scope.$broadcast("timer-start");
                }
                if (tempTyped === this.lesson.text) {
                    this.resultIsHidden = false;
                    this.textareaIsDisabled = true;
                    this.typedText = tempTyped;
                    this.scope.$broadcast("timer-stop");
                }
            }
        };
        return LessonCtrl;
    })();
    Controllers.LessonCtrl = LessonCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=LessonController.js.map