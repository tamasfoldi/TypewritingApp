import { Component, Input, OnInit } from "angular2/core";
import { Statistics } from "./statistics.service";

@Component({
  selector: "tpw-lesson-statistics",
  templateUrl: "app/typewriter/statistics/statistics.component.html",
  styleUrls: ["app/typewriter/statistics/statistics.component.css"]
})
export class StatisticsComponent implements OnInit {
  @Input()
  statistics: Statistics;

  constructor() { }

  ngOnInit() { }

}