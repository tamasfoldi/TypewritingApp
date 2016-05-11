import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, Routes } from "@angular/router";
import { AuthRouterComponent } from "./auth/auth-router.component";
import { AuthHttp, tokenNotExpired } from "angular2-jwt/angular2-jwt";
import { UserService } from "./user/user.service";
import { UserComponent } from "./user/user.component";
import { Http } from "@angular/http";
import { IngameRouterComponent } from "./ingame-router/ingame-router.component";


@Component({
  moduleId: module.id,
  selector: "tpw-app",
  templateUrl: "app.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  { path: "auth", component: AuthRouterComponent },
  { path: "game", component: IngameRouterComponent },
  { path: "user", component: UserComponent }
])
export class AppComponent {
  constructor(
    private _http: Http,
    private _authHttp: AuthHttp,
    private _router: Router
  ) {
  }

  hasLoggedInUser() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem("id_token");
    this._router.navigate(["Auth"]);
  }

}
