import {Component, OnInit, ViewChild} from "angular2/core";
import {MapComponent} from "./map/map.component";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent]
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  constructor() { }

  ngOnInit() { }
}