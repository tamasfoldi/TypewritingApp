import {Component, OnInit, ViewChild, AfterViewInit, AfterContentInit, Input} from "angular2/core";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html"
})

export class WaypointComponent implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild(HTMLCanvasElement)
  canvas: HTMLCanvasElement;

  @Input()
  radius: number;
  @Input()
  posX: number;
  @Input()
  posY: number;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementsByTagName("canvas")[0];
    this.draw();
  }

  draw() {
    let ctx = this.canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    //ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngAfterContentInit() {
  }
}