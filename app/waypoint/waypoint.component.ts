import {Component, OnInit, ContentChild} from "angular2/core";
import {Drawable} from "../common/Drawable";
import {FigureComponent} from "../figure/figure.component";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html",
  directives: [FigureComponent]
})
export class WaypointComponent extends Drawable implements OnInit {
  @ContentChild(FigureComponent)
  figureComponent: FigureComponent;

  constructor() {
    super();
  }

  draw(canvas: HTMLCanvasElement) {
    console.log("Draw waypoint to(x, y): ", this.posX, this.posY);
    this.figureComponent !== null ? console.log("Has figure") : console.log("Doesnt have figure");
  }

  popFigure(): FigureComponent {
    let retFigure = this.figureComponent;
    this.figureComponent = null;
    return retFigure;
  }

  ngOnInit() { }
}