import { Component, Input } from "angular2/core";

@Component({
  selector: "tpw-figure",
  styles: [
    `.figure {
        width: 100px;
        height: 100px;
        background: blue;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        position: absolute;
        border-radius: 50px;
    }`
  ],
  templateUrl: "app/map/figure/figure.component.html"
})
export class FigureComponent {
  @Input()
  posX: number;
  @Input()
  posY: number;
}