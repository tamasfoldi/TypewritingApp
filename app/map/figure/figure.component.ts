import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "tpw-figure",
  styleUrls: ["figure.component.css"],
  templateUrl: "figure.component.html"
})
export class FigureComponent {
  @Input()
  posX: number;
  @Input()
  posY: number;
}