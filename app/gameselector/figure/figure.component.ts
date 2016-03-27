import {Component, OnInit, Input} from "angular2/core";

@Component({
  selector: "tpw-figure",
  templateUrl: "app/gameselector/figure/figure.component.html"
})
export class FigureComponent implements OnInit {
  @Input()
  posX: number;
  @Input()
  posY: number;

  constructor() { }

  ngOnInit(): void { }
}