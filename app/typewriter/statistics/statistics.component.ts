import { Component, Input } from "@angular/core";
import { Statistics } from "./statistics.service";

@Component({
  moduleId: module.id,
  selector: "tpw-lesson-statistics",
  templateUrl: "statistics.component.html",
  styleUrls: ["statistics.component.css"]
})
export class StatisticsComponent {
  @Input()
  statistics: Statistics;
}