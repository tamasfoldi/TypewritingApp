import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { appInjector } from "../app-injector";
import { tokenNotExpired } from "angular2-jwt/angular2-jwt";

export function hasLoggedInUser(next: any, prev: any): Promise<boolean> {
  let injector: Injector = appInjector();
  let _router: Router = injector.get(Router);

  return new Promise((resolve) => {
    if (tokenNotExpired()) {
      resolve(true);
    } else {
      _router.navigate(["Auth"]);
      resolve(false);
    }
  });
}