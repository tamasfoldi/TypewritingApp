/// <reference path="../../../references.ts" />

module Model {

    export interface ILesson extends angular.resource.IResource<ILesson> {
        id: number;
        name: string;
        text: string;
        statistic: Statistic;
    }
}
