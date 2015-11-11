// http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#backtothebasics read more here
/// <reference path="../../../references.ts" />
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var LessonResultDirective = (function () {
            function LessonResultDirective() {
                this.transclude = true;
                this.templateUrl = "/App/partials/lesson-result.html";
                this.scope = {};
                LessonResultDirective.prototype.link = function (scope, element, attrs) {
                };
            }
            LessonResultDirective.Factory = function () {
                var directive = function () {
                    return new LessonResultDirective();
                };
                directive.$inject = [];
                return directive;
            };
            return LessonResultDirective;
        })();
        Directives.LessonResultDirective = LessonResultDirective;
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=LessonResultDirective.js.map