import { Component, OnInit } from "angular2/core";
import { UserService, User } from "./user.service";
import { StatisticsService, Correctness } from "../typewriter/statistics/statistics.service";
import { CanActivate } from "angular2/router";
import { hasLoggedInUser } from "../util/can-activate";
import { Observable } from "rxjs/Rx";
import { PieChart } from "primeng/primeng";
import { Pipe, PipeTransform } from "angular2/core";

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
  selector: "tpw-user",
  templateUrl: "app/user/user.component.html",
  directives: [PieChart],
  pipes: [CorrectnessPipe]
})
@CanActivate((next, prev) => {
  return hasLoggedInUser(next, prev);
})
export class UserComponent implements OnInit {
  private data: any;
  constructor(
    private _userService: UserService,
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit() {
    this._statisticsService.getCorrectness(this._userService.user.id)
      .subscribe(data => {
        this.data = data
      });
  }
}


