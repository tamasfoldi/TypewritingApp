import { Injectable } from "angular2/core";

export interface Figure {
  posX: number;
  posY: number;
}

@Injectable()
export class FigureService {

  constructor() { }

  move() { } 
}