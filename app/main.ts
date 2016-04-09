import { bootstrap } from "angular2/platform/browser";
import { ComponentRef } from "angular2/core";
import { ROUTER_PROVIDERS } from "angular2/router";
import { AppComponent } from "./app.component";
import { WaypointService } from "./map/waypoint/waypoint.service";
import { LessonService } from "./lesson/lesson.service";
import { appInjector } from "./app-injector";

bootstrap(AppComponent, [
  LessonService,
  WaypointService,
  ROUTER_PROVIDERS
]).then((appRef: ComponentRef) => {
  appInjector(appRef.injector);
});
