/// <reference path="../../../references.ts" />

module Model {
    export interface ISession extends angular.resource.IResource<ISession> {
      provider: string;
      email: string;
      password: string;
      rememberMe: boolean;
    }
}
