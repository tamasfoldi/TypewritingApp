import { bootstrap } from "angular2/platform/browser";
import { ComponentRef, provide } from "angular2/core";
import { HTTP_PROVIDERS, Http } from "angular2/http";
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import { ROUTER_PROVIDERS } from "angular2/router";
import { AppComponent } from "./app.component";
import { WaypointService } from "./map/waypoint/waypoint.service";
import { LessonService } from "./lesson/lesson.service";
import { appInjector } from "./app-injector";

bootstrap(AppComponent, [
  LessonService,
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
  })
]).then((appRef: ComponentRef) => {
  appInjector(appRef.injector);
});
