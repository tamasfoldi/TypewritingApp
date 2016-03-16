import {Component, OnInit, ViewChild} from "angular2/core";
import {MapComponent} from "./map/map.component";
import {WaypointComponent} from "./waypoint/waypoint.component";
import {FigureComponent} from "./figure/figure.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, FigureComponent, WaypointComponent]
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;
  @ViewChild(WaypointComponent)
  waypointComponent: WaypointComponent;
  @ViewChild(FigureComponent)
  figureComponent: FigureComponent;

  constructor() { }

  ngOnInit() { }
}