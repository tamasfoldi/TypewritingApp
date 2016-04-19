import { Component, OnInit } from "angular2/core";
import { UserService, User } from "./user.service";
import { CanActivate } from "angular2/router";
import { hasLoggedInUser } from "../util/can-activate";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "tpw-user",
  templateUrl: "app/user/user.component.html"
})
@CanActivate((next, prev) => {
  return hasLoggedInUser(next, prev);
})
export class UserComponent implements OnInit {
  user: User;
  constructor(private _userService: UserService) { }

  ngOnInit() { } 
}