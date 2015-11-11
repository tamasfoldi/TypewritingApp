/// <reference path="../../../references.ts" />
var Model;
(function (Model) {
    var Statistic = (function () {
        function Statistic() {
            this.nofMistakes = 0;
            this.typingSpeed = 0;
            this.time = 0;
            this.nofCorrectKeyPresses = 0;
            return this;
        }
        Statistic.prototype.getNofMistakes = function () {
            return this.nofMistakes;
        };
        Statistic.prototype.getNofKeyPresses = function () {
            return this.nofMistakes + this.nofCorrectKeyPresses;
        };
        Statistic.prototype.getTypingSpeed = function () {
            return this.typingSpeed;
        };
        Statistic.prototype.calculateTypingSpeed = function (time) {
            this.typingSpeed = (this.getNofKeyPresses() / (time / 1000)) * (60000 / time);
        };
        Statistic.prototype.getNofCorrectKeyPresses = function () {
            return this.nofCorrectKeyPresses;
        };
        Statistic.prototype.increaseNofCorrectKeyPresses = function () {
            this.nofCorrectKeyPresses++;
        };
        Statistic.prototype.increasNofMistakes = function () {
            this.nofMistakes++;
        };
        Statistic.prototype.getTime = function () {
            return this.time;
        };
        Statistic.prototype.getTimeInSeconds = function () {
            return this.time / 1000;
        };
        Statistic.prototype.setTime = function (time) {
            this.time = time;
        };
        Statistic.prototype.getAccuracy = function () {
            return this.nofCorrectKeyPresses / this.getNofKeyPresses() * 100;
        };
        return Statistic;
    })();
    Model.Statistic = Statistic;
})(Model || (Model = {}));
//# sourceMappingURL=Statistic.js.map