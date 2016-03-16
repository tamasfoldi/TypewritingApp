import {Component, OnInit, ViewChild, Input} from "angular2/core";
import {Drawable} from "../common/Drawable";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html"
})
export class WaypointComponent extends Drawable implements OnInit {
  constructor() {
    super();
  }

  draw(canvas: HTMLCanvasElement) {
    console.log("Draw waypoint to(x, y): ", this.posX, this.posY);
  }

  ngOnInit() { }
}