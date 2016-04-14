import { Component, OnInit, ViewChild, ViewChildren } from "angular2/core";
import { Http, Headers } from "angular2/http";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { AuthComponent } from "./auth/auth.component";
import { UserService } from "./user/user.service";
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
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.loadUserIfHasToken();
  }

  loadUserIfHasToken() {
    if (localStorage.getItem("id_token")) {
      let tokenInfo = {
        "id_token": localStorage.getItem("id_token")
      }
      console.log("asdf");
      this._http.post("https://tamasfo.eu.auth0.com/tokeninfo", JSON.stringify(tokenInfo))
        .map(response => response.json())
        .subscribe(data => this._userService.setUser(data.email));
    }
  }
}