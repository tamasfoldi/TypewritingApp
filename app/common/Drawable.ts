import {Input} from "angular2/core";

export abstract class Drawable {
  @Input()
  posX: number;
  @Input()
  posY: number;
  abstract draw(): void;
}