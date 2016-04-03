import {Component, OnInit, ViewChild, ViewChildren} from "angular2/core";
import {MapComponent} from "./map/map.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";
import {WaypointService} from "./map/waypoint/waypoint.service";

@Component({
  selector: "tpw-app",
  templateUrl: "app/app.component.html",
  directives: [MapComponent, TypewriterComponent]
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;
  @ViewChild(TypewriterComponent)
  typewriterComponent: TypewriterComponent;

  selectedLesson: number;

  constructor(private waypointService: WaypointService) { }

  ngOnInit() {
    this.selectedLesson = -1;
  }

  handleLessonSelect($event: number) {
    this.selectedLesson = $event;
  }

  handleLessonResult($event: string) {
    if ($event === "done") {
      if (this.waypointService.getNumberOfWaypoints() === this.waypointService.getFigureWaypointId() + 1) {
        console.log("END");
        return;
      }
      this.waypointService.moveFigure(this.selectedLesson);
    }
    this.selectedLesson = -1;
  }
}