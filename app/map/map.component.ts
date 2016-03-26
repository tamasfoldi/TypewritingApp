import {Component, OnInit, ContentChild, ViewChild, Input, ElementRef} from "angular2/core";
import {WaypointComponent} from "../waypoint/waypoint.component";
import {FigureComponent} from "../figure/figure.component";

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

  @Input()
  width: number;

  @Input()
  height: number; 

  constructor() { }
  
  ngOnInit() {}
}