import {Component, OnInit} from "angular2/core";
import {Drawable} from "../common/Drawable";

@Component({
  selector: "tpw-figure",
  templateUrl: "app/figure/figure.component.html"
})
export class FigureComponent extends Drawable implements OnInit {

  constructor() {
    super();
  }

  draw(canvas: HTMLCanvasElement): void { 
    console.log("Draw figure to(x, y): ", this.posX, this.posY);
  }

  ngOnInit(): void { }
}