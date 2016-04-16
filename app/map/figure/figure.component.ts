import { Component, Input } from "angular2/core";

@Component({
  selector: "tpw-figure",
  templateUrl: "app/map/figure/figure.component.html"
})
export class FigureComponent {
  @Input()
  posX: number;
  @Input()
  posY: number;
}