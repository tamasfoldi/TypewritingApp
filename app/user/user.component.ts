import { Component, OnInit } from "@angular/core";
import { UserService, User } from "./user.service";
import { StatisticsService, Correctness } from "../typewriter/statistics/statistics.service";
import {  } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { PieChart } from "primeng/primeng";
<<<<<<< HEAD
import { ProgressBar } from 'primeng/primeng';
import { Pipe, PipeTransform } from "angular2/core";
=======
import { Pipe, PipeTransform } from "@angular/core";
>>>>>>> angular2-rc

@Pipe({
  name: "correctnessPie"
})
export class CorrectnessPipe implements PipeTransform {
  transform(value: Correctness): any {
    if (value) {
      return [{
        value: value.numberOfCorrectKeypresses,
        color: '#00FF00',
        label: "Correct"
      },
        {
          value: value.numberOfIncorrectKeypresses,
          color: '#FF0000',
          label: "Incorrect"
        }]
    }
  }
}

@Component({
  moduleId: module.id,
  selector: "tpw-user",
  templateUrl: "user.component.html",
  directives: [PieChart, ProgressBar],
  pipes: [CorrectnessPipe]
})
export class UserComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit() { }
}


