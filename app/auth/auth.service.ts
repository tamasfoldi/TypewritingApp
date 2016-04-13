import { Injectable } from "angular2/core";
import { Http, Headers, Response } from "angular2/http";
import { AuthHttp, JwtHelper} from "angular2-jwt/angular2-jwt";
import { Observable } from "rxjs/Rx";

declare let Auth0Lock;

export interface User {
  username: string;
  email?: string;
  password: string;
}

export class Auth0Response {
  id_token: string;
  access_token: string;
  token_type: string;
}

@Injectable()
export class AuthService {
  clientId = "nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T";
  connection = "mongodb";
  lock = new Auth0Lock(this.clientId, 'tamasfo.eu.auth0.com');
  headers = new Headers();

  constructor(
    private _http: Http,
    private _authHttp: AuthHttp
  ) {
    this.headers.append('Content-Type', 'application/json');
  }

  login(user: User): Observable<Response> {
    let loginBody = {
      "client_id": this.clientId,
      "username": user.username,
      "password": user.password,
      "connection": this.connection,
      "grant_type": "passwrod",
      "scope": "openid"
    }
    return this._http.post("https://tamasfo.eu.auth0.com/oauth/ro", JSON.stringify(loginBody), { headers: this.headers })
      .map(response => response.json())
  }

  register(user: User): Observable<Response> {
    let loginBody = {
      "client_id": this.clientId,
      "username": user.username,
      "email": user.email,
      "password": user.password,
      "connection": this.connection
    }
    return this._http.post("https://tamasfo.eu.auth0.com/dbconnections/signup", JSON.stringify(loginBody), { headers: this.headers })
      .map(response => response.json());
  }

}