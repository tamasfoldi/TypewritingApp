import { Injectable } from "angular2/core";
import { AuthHttp, JwtHelper } from "angular2-jwt/angular2-jwt";

export interface User {
  username: string;
  email?: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private _authHttp: AuthHttp) { }

  login(user: User) {
    try{
    this._authHttp.post("http://localhost:3000/api/user/login", JSON.stringify(user))
      .map(response => response.json())
      .subscribe((data) => {
        localStorage.setItem("id_token", data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  register(user: User) {
    this.login(user);
  }

}