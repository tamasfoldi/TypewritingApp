/// <reference path="../../../references.ts" />

module Services {
  export interface IUserService extends angular.resource.IResourceClass<Model.IUser> {
    update(user: Model.IUser) : Model.IUser;
  }
}
