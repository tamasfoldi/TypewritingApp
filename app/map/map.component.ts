import {Component, OnInit, ContentChild, ViewChild, Input, ElementRef} from "angular2/core";
import {WaypointComponent} from "./waypoint/waypoint.component";
import {Waypoint, WaypointService} from "./waypoint/waypoint.service";
import {FigureComponent} from "./figure/figure.component";

@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent],
  providers: [WaypointService]
})
export class MapComponent implements OnInit {
  @ContentChild(WaypointComponent)
  waypointComponent: WaypointComponent;

  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @ViewChild("mapCanvas")
  canvas: ElementRef;

  @Input()
  width: number;

  @Input()
  height: number;

  waypoints: Waypoint[]

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