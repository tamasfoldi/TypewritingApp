import { Injector } from "angular2/core";
import { Router, ComponentInstruction } from "angular2/router";
import { appInjector } from "../app-injector";
import { JwtHelper, tokenNotExpired } from "angular2-jwt/angular2-jwt";

export function hasLoggedInUser(next: ComponentInstruction, prev: ComponentInstruction): Promise<boolean> {
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