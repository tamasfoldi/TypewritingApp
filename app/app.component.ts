import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {MapComponent} from "./map/map.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";


@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, TypewriterComponent],
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;
  @ViewChild(TypewriterComponent)
  typewriterComponent: TypewriterComponent;

  constructor() { }

  ngOnInit() { }
}