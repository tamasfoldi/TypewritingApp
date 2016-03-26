import {Component, OnInit, ViewChild, ViewChildren, ChangeDetectionStrategy} from "angular2/core";
import {MapComponent} from "./map/map.component";
import {WaypointComponent} from "./waypoint/waypoint.component";
import {Waypoint, WaypointService} from "./waypoint/waypoint.service";
import {FigureComponent} from "./figure/figure.component";


@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, WaypointComponent, FigureComponent],
  providers: [WaypointService]
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  waypoints: Waypoint[];

  constructor(private waypointService: WaypointService) { }

  ngOnInit() {
    this.waypoints = this.waypointService.getAll();
  }

  gameFinished($event) {
    this.waypoints = this.waypointService.moveFigure();
  }
}