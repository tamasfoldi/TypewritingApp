import {Component, OnInit, AfterViewInit, ContentChild, ViewChild, Input, ElementRef} from "angular2/core";
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

  @ViewChild("mapCanvas")
  canvas: ElementRef;

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
    console.log(this.waypointComponent.popFigure());
    this.waypointComponent.draw(canvas);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.draw(this.canvas.nativeElement);
  }
}