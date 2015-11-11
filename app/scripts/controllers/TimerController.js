/// <reference path="../../../references.ts" />
var Controllers;
(function (Controllers) {
    var TimerCtrl = (function () {
        function TimerCtrl($interval) {
            this.totalElapsedMs = 0;
            this.elapsedMs = 0;
            this.interval = $interval;
        }
        TimerCtrl.prototype.start = function () {
            if (!this.timerPromise) {
                this.startTime = new Date();
                var starTime = this.startTime;
                var elapsedMs = 0;
                this.timerPromise = this.interval(function () {
                    var now = new Date();
                    elapsedMs = now.getTime() - starTime.getTime();
                }, 31);
            }
        };
        TimerCtrl.prototype.stop = function () {
            if (this.timerPromise) {
                this.interval.cancel(this.timerPromise);
                this.timerPromise = undefined;
                this.totalElapsedMs += this.elapsedMs;
                this.elapsedMs = 0;
            }
        };
        TimerCtrl.prototype.reset = function () {
            this.startTime = new Date();
            this.totalElapsedMs = this.elapsedMs = 0;
        };
        TimerCtrl.prototype.getElapsedMs = function () {
            return this.totalElapsedMs + this.elapsedMs;
        };
        return TimerCtrl;
    })();
    Controllers.TimerCtrl = TimerCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TimerController.js.map