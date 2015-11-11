// http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#backtothebasics read more here
/// <reference path="../../../references.ts" />

module App.Directives {
    export class LessonResultDirective implements angular.IDirective {
        public link: (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;
        public transclude = true;
        public templateUrl = "/App/partials/lesson-result.html";
        public scope = {};

        constructor(/*list of dependencies*/) {
            // it"s important to add `link` to the prototype or you will end up with state issues.
            // see http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            LessonResultDirective.prototype.link = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
                /*handle all your linking requirements here*/
            };
        }

        public static Factory(): angular.IDirectiveFactory {
            var directive : angular.IDirectiveFactory = () => {
                return new LessonResultDirective();
            };

            directive.$inject = [];

            return directive;
        }
    }
}
