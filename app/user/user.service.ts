import { Injectable, Inject } from "@angular/core";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { RequestOptions } from "@angular/http";
import {Statistics} from "../typewriter/statistics/statistics.service";
import { isNumber, isType } from "angular2/src/facade/lang";


export interface AuthUser {
  email: string;
  username?: string;
  password: string;
}

export class User implements AuthUser {
  private _id: string;
  private _email: string;
  private _username: string;
  private _password: string;
  private _lastCompletedLessonId: number;
  private _level: number;
  private _xp: number;
  private _lessonStatistics: Map<number, Statistics>;

  constructor(user?: User) {
    if (user) {
      this.email = user.email;
      this.username = user.username;
      this.password = user.password;
      this.level = user.level;
      this.xp = user.xp;
      this.lastCompletedLessonId = user.lastCompletedLessonId;
      this.lessonStatistics = (user.lessonStatistics) ? this.setStatisticsFromArray(<any>user.lessonStatistics) : new Map<number, Statistics>();
      this._id = user.id;
    }
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
  set username(username: string) {
    this._username = username;
  }

  get password(): string {
    return this._password;
  }
  set password(password: string) {
    this._password = password;
  }
  
  get level(): number {
    return this._level;
  }
  set level(level: number) {
    this._level = level;
  }

  get xp(): number {
    return this._xp;
  }
  set xp(xp: number) {
    this._xp = xp;
  }
  
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }


  get lastCompletedLessonId(): number {
    return this._lastCompletedLessonId;
  }
  set lastCompletedLessonId(lessonId: number) {
    this._lastCompletedLessonId = lessonId;
  }

  get lessonStatistics(): Map<number, Statistics> {
    return this._lessonStatistics;
  }
  set lessonStatistics(statistics: Map<number, Statistics>) {
    this._lessonStatistics = statistics;
  }

  setStatisticsFromArray(statistics: Array<Statistics>): Map<number, Statistics> {
    let stats = new Map<number, Statistics>();
    statistics.forEach((statistic, i) => {
      stats.set(i, statistic);
    });
    return stats;
  }
}

@Injectable()
export class UserService {
  private _user: User;

  constructor(
    @Inject(AuthHttp) private _authHttp: AuthHttp,
    @Inject(RequestOptions) private _requestOptions: RequestOptions
  ) { }

  get user(): User {
    return this._user;
  }

  setUser(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => { 
      if (!this._user) { 
        this._authHttp.get("/api/users/" + email, this._requestOptions)
          .map(response => response.json())
          .subscribe((user: any) => { 
            user.id = user._id;
            this._user = new User(user);
            resolve(); 
          });
      }
    });
  }

  saveLessonStatistic(lessonId: number, stat: Statistics) {
    this._authHttp.put("/api/users/" + this.user.email + "/stats/" + lessonId, JSON.stringify(stat), { headers: this._requestOptions.headers })
      .map(data => data.json())
      .subscribe((statWithStar) => {
        if (isNumber(parseInt(statWithStar.lastCompletedLessonId))) {
          this.user.lastCompletedLessonId = statWithStar.lastCompletedLessonId;
        }
        this.user.xp = statWithStar.xp;
        this.user.level = statWithStar.level;
        this.user.lessonStatistics.set(lessonId, statWithStar);
      });
  }
}