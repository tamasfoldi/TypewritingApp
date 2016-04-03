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

  @Input()
  width: number;

  @Input()
  height: number;
  
  @Output()
  lessonSelected: EventEmitter<number> = new EventEmitter();

  waypoints: Waypoint[];

  constructor(private waypointService: WaypointService) { }

  ngOnInit() {
    this.waypoints = this.waypointService.getAll();
    console.log("init");
  }

  gameFinished($event: number) { 
      this.lessonSelected.emit($event);
  }
}