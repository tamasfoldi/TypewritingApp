import {Component, OnInit, ContentChild, ViewChild, Input, Output, EventEmitter, ElementRef} from "angular2/core";
import {WaypointComponent} from "./waypoint/waypoint.component";
import {Waypoint, WaypointService} from "./waypoint/waypoint.service";
import {FigureComponent} from "./figure/figure.component";


@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent]
})

export class MapComponent implements OnInit {
  @ContentChild(WaypointComponent)
  waypointComponent: WaypointComponent;

  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @ViewChild("mapCanvas")
  canvas: ElementRef;

  waypoints: Waypoint[] = new Array<Waypoint>();

  constructor(private _waypointService: WaypointService) { }

  ngOnInit() { }

  ngAfterViewInit() {

  }

}