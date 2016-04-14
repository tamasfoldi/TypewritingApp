import { bootstrap } from "angular2/platform/browser";
import { ComponentRef, provide, Injector } from "angular2/core";
import { HTTP_PROVIDERS, Http, BaseRequestOptions, Headers, RequestOptions } from "angular2/http";
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import { ROUTER_PROVIDERS } from "angular2/router";
import { AppComponent } from "./app.component";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";
import { WaypointService } from "./map/waypoint/waypoint.service";
import { LessonService } from "./lesson/lesson.service";
import { appInjector } from "./app-injector";

class MyHeader extends BaseRequestOptions {
  headers: Headers = new Headers();

  constructor() {
    super();
    this.headers.append('Content-Type', 'application/json');
  }
}

let injector = Injector.resolveAndCreate([
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        headerName: "Authorization",
        headerPrefix: "Bearer",
        tokenName: "id_token",
        tokenGetter: (() => localStorage.getItem("id_token")),
        noJwtError: true
      }), http);
    },
    deps: [Http]
  }),
  provide(RequestOptions, { useClass: MyHeader }),
  UserService
]);
let http = injector.get(Http);
let authHttp = injector.get(AuthHttp);
let userService: UserService = injector.get(UserService);
let tokenInfo = {
  "id_token": localStorage.getItem("id_token")
}
http.post("https://tamasfo.eu.auth0.com/tokeninfo", JSON.stringify(tokenInfo))
  .map(response => response.json())
  .subscribe(_result => {
    authHttp.get("/api/user/" + _result.email)
      .map(response => response.json())
      .subscribe((user: any) => {
        userService.user = user;
        bootstrap(AppComponent, [
          LessonService,
          provide(UserService, { useValue: userService }),
          AuthService,
          WaypointService,
          ROUTER_PROVIDERS,
          HTTP_PROVIDERS,
          provide(AuthHttp, {
            useFactory: (http) => {
              return new AuthHttp(new AuthConfig({
                headerName: "Authorization",
                headerPrefix: "Bearer",
                tokenName: "id_token",
                tokenGetter: (() => localStorage.getItem("id_token")),
                noJwtError: true
              }), http);
            },
            deps: [Http]
          }),
          provide(RequestOptions, { useClass: MyHeader })
        ]).then((appRef: ComponentRef) => {
          appInjector(appRef.injector);
        });
      });
  });


