/// <reference path="../../../references.ts" />

module Services {
  export interface IUserService extends angular.resource.IResourceClass<Model.IUser> {
    update(any: any) : Model.IUser;
  }
}
