import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {MapComponent} from "./gameselector/map/map.component";
import {WaypointComponent} from "./gameselector/waypoint/waypoint.component";
import {Waypoint, WaypointService} from "./gameselector/waypoint/waypoint.service";
import {FigureComponent} from "./gameselector/figure/figure.component";


@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, WaypointComponent, FigureComponent],
  providers: [WaypointService]
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  @ViewChildren(WaypointComponent)
  waypointComponents: WaypointComponent[];

  @ViewChild(FigureComponent)
  figureComponent: FigureComponent;

  waypoints: Waypoint[];

  constructor(private waypointService: WaypointService) { }

  ngOnInit() {
    this.waypoints = this.waypointService.getAll();
  }


  gameFinished($event: number) {
    if ($event + 1 < this.waypoints.length) {
      this.waypoints[$event + 1].hasFigure = true;
    } else {
      console.log("END OF GAME");
    }
  }
}