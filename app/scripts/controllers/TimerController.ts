/// <reference path="../../../references.ts" />

module Controllers {
    export class TimerCtrl {

        private interval: angular.IIntervalService;
        private totalElapsedMs: number;
        private startTime: Date;
        private timerPromise: angular.IPromise<any>;
        private elapsedMs: number;

        constructor($interval: angular.IIntervalService) {
            this.totalElapsedMs = 0;
            this.elapsedMs = 0;
            this.interval = $interval;
        }

        start() {
            if (!this.timerPromise) {
                this.startTime = new Date();
                var starTime: Date = this.startTime;
                var elapsedMs = 0;
                this.timerPromise = this.interval(function () {
                    var now: Date = new Date();
                    elapsedMs = now.getTime() - starTime.getTime();
                }, 31);
            }
        }

        stop() {
            if (this.timerPromise) {
                this.interval.cancel(this.timerPromise);
                this.timerPromise = undefined;
                this.totalElapsedMs += this.elapsedMs;
                this.elapsedMs = 0;
            }
        }

        reset() {
            this.startTime = new Date();
            this.totalElapsedMs = this.elapsedMs = 0;
        }

        getElapsedMs() {
            return this.totalElapsedMs + this.elapsedMs;
        }
    }
}
