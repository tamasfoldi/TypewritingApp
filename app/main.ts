import { bootstrap } from "angular2/platform/browser";
import { ROUTER_PROVIDERS } from "angular2/router";
import { AppComponent } from "./app.component";
import { WaypointService } from "./map/waypoint/waypoint.service";
import { LessonService } from "./lesson/lesson.service";
bootstrap(AppComponent, [
  LessonService,
  WaypointService,
  ROUTER_PROVIDERS
]);
