import { Component, OnInit } from "angular2/core";
import { UserService, User } from "./user.service";
import { CanActivate } from "angular2/router";
import { hasLoggedInUser } from "../util/can-activate";
import { Observable } from "rxjs/Rx";
import { LineChart } from "primeng/primeng";

@Component({
  selector: "tpw-user",
  templateUrl: "app/user/user.component.html",
  directives: [LineChart]
})
@CanActivate((next, prev) => {
  return hasLoggedInUser(next, prev);
})
export class UserComponent implements OnInit {
  private data: any;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }
}