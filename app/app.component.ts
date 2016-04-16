import { Component, OnInit } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthHttp, tokenNotExpired } from "angular2-jwt/angular2-jwt";
import { UserService } from "./user/user.service";
import { Http } from "angular2/http";
import { IngameRouterComponent } from "./ingame-router/ingame-router.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/auth/...", as: "Auth", component: AuthComponent },
  { path: "/game/...", as: "Game", component: IngameRouterComponent, useAsDefault: true }
])
export class AppComponent implements OnInit {
  constructor(
    private _http: Http, 
    private _authHttp: AuthHttp, 
    private _userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem("id_token") && tokenNotExpired()) {
      let tokenInfo = {
        id_token: localStorage.getItem("id_token")
      };
      this._http.post("https://tamasfo.eu.auth0.com/tokeninfo", JSON.stringify(tokenInfo))
        .map(response => response.json())
        .subscribe(_result => {
          this._authHttp.get("/api/user/" + _result.email)
            .map(response => response.json())
            .subscribe((user: any) => {
              this._userService.user = user;
            });
        });
    }
  }
}