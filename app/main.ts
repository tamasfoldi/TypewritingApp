/// <reference path="../node_modules/angular2/typings/browser.d.ts" /> 

import {bootstrap} from "angular2/platform/browser";
import { AppComponent } from "./app.component";
import { WaypointService } from "./map/waypoint/waypoint.service";
bootstrap(AppComponent, [WaypointService]);
