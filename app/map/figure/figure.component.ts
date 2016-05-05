import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "tpw-figure",
  templateUrl: "figure.component.html"
})
export class FigureComponent {
  @Input()
  posX: number;
  @Input()
  posY: number;
}