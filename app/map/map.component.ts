import {Component, OnInit, AfterViewInit, ContentChild, ViewChild, Input} from "angular2/core";
import {WaypointComponent} from "../waypoint/waypoint.component";
import {FigureComponent} from "../figure/figure.component";
import {Drawable} from "../common/Drawable";

@Component({
  selector: "tpw-map",
  templateUrl: "app/map/map.component.html",
  directives: [WaypointComponent, FigureComponent]
})
export class MapComponent extends Drawable implements OnInit, AfterViewInit {
  @ContentChild(WaypointComponent)
  waypointComponent: WaypointComponent;

  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  @ViewChild(HTMLCanvasElement)
  canvas: HTMLCanvasElement;

  @Input()
  width: number;

  @Input()
  height: number;


  constructor() {
    super();
  }

  draw(canvas: HTMLCanvasElement) {
    console.log("Draw map with height", this.height, "with width", this.width);
    this.waypointComponent.draw(canvas);
    this.figureComponent.draw(canvas);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.draw(this.canvas);
  }
}