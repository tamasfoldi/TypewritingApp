import {Component, OnInit, ViewChild, Input} from "angular2/core";

@Component({
  selector: "tpw-waypoint",
  templateUrl: "app/waypoint/waypoint.component.html"
})

export class WaypointComponent implements OnInit {
 @Input()
  radius: number;
  @Input()
  posX: number;
  @Input()
  posY: number;
  constructor() { }

  ngOnInit() { }
}