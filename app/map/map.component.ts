import {Component, OnInit, ContentChild, Input} from "angular2/core";
import {WaypointComponent} from "../waypoint/waypoint.component";
import {FigureComponent} from "../figure/figure.component";
import {Drawable} from "../common/Drawable";

@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent extends Drawable implements OnInit {
  @ContentChild(WaypointComponent)
  waypointComponent: WaypointComponent;

  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @Input()
  width: number;

  @Input()
  height: number;


  constructor() {
    super();
  }

  draw() {
    console.log("Draw map");
  }

  ngOnInit() {
    this.draw();
  }
}