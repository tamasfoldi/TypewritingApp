import { Component, OnInit } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthHttp, tokenNotExpired } from "angular2-jwt/angular2-jwt";
import { UserService } from "./user/user.service";
import { UserComponent } from "./user/user.component";
import { Http } from "angular2/http";
import { IngameRouterComponent } from "./ingame-router/ingame-router.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/auth/...", as: "Auth", component: AuthComponent },
  { path: "/game/...", as: "Game", component: IngameRouterComponent, useAsDefault: true },
  { path: '/user', as: 'User', component: UserComponent }
])
export class AppComponent implements OnInit {
  constructor(
    private _http: Http,
    private _authHttp: AuthHttp,
    private _userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem("id_token") && tokenNotExpired()) {
      this.setCurrentUser();
    }
  }

  setCurrentUser() {
    let tokenInfo = {
      id_token: localStorage.getItem("id_token")
    };
    this._http.post("https://tamasfo.eu.auth0.com/tokeninfo", JSON.stringify(tokenInfo))
      .map(response => response.json())
      .subscribe(_result => {
        this._userService.setUser(_result.email);
      });
  }
}