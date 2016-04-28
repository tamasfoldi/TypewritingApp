import { Injectable, Inject } from "angular2/core";
import { Http, Headers, Response } from "angular2/http";
import { Observable } from "rxjs/Rx";
import { User, AuthUser, UserService } from "../user/user.service";
import {makeTypeError, BaseException} from 'angular2/src/facade/exceptions';

export class Auth0Response {
  id_token: string;
  access_token: string;
  token_type: string;
}

@Injectable()
export class AuthService {
  clientId = "nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T";
  connection = "mongodb";

  constructor(
    @Inject(UserService) private _userService: UserService,
    private _http: Http
  ) { }

  login(user: User): Observable<Response> {
    if (!user) {      
      throw new BaseException("user is required");
    }
    
    if (!(user instanceof User)) {     
      throw makeTypeError("user is not assignable to type User");
    }
    
    let loginBody = {
      "client_id": this.clientId,
      "username": user.email,
      "password": user.password,
      "connection": this.connection,
      "grant_type": "password",
      "scope": "openid"
    };
    return this._http.post("https://tamasfo.eu.auth0.com/oauth/ro", JSON.stringify(loginBody));
  }
  register(user: User): Observable<Response> {
    if (!user) {   
      throw new BaseException("user is required");
    }
    if (!(user instanceof User)) {      
      throw makeTypeError("user is not assignable to type User");
    }
    let loginBody = {
      "client_id": this.clientId,
      "username": user.username,
      "email": user.email,
      "password": user.password,
      "connection": this.connection
    };
    return this._http.post("https://tamasfo.eu.auth0.com/dbconnections/signup", JSON.stringify(loginBody))
  }

  handleSuccessLogin(data: any, loginWith: User): void {
    localStorage.setItem("id_token", data.id_token);
    this._userService.setUser(loginWith.email);
  }
}