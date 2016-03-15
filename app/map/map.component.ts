import {Component, OnInit, ViewChild, QueryList} from "angular2/core";
import {WaypointComponent} from "../waypoint/waypoint.component";
import {FigureComponent} from "../figure/figure.component";

@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent]
})

export class MapComponent implements OnInit {
  @ViewChild(WaypointComponent)
  waypointComponent: WaypointComponent;
  @ViewChild(FigureComponent)
  figureComponent: FigureComponent;

  constructor() { }

  ngOnInit() { }
}