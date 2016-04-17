import { Injectable, Inject } from "angular2/core";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { RequestOptions } from "angular2/http";
import {Statistics} from "../typewriter/statistics/statistics.service";

export interface AuthUser {
  email: string;
  username?: string;
  password: string;
}

export class User implements AuthUser {
  private _email: string;
  private _username: string;
  private _password: string;
  private _lastCompletedLessonId: number;
  private _statistics: Map<number, Statistics>;

  constructor(user: User) {
    this._email = user.email;
    this._username = user.username;
    this._password = user.password;
    this._lastCompletedLessonId = user.lastCompletedLessonId; 
    this._statistics = (user.statistics) ? this.setStatisticsFromArray(<any>user.statistics) : new Map<number, Statistics>();
    console.log(this.statistics);
  }

  get username(): string {
    return this._username;
  }


  get password(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }


  get lastCompletedLessonId(): number {
    return this._lastCompletedLessonId;
  }
  set lastCompletedLessonId(lessonId: number) {
    this._lastCompletedLessonId = lessonId;
  }

  get statistics(): Map<number, Statistics> {
    return this._statistics;
  }
  set statistics(statistics: Map<number, Statistics>) {
    this._statistics = statistics;
  }

  getLessonStatistic(id: number): Statistics {
    return this._statistics.get(id);
  }
  setLessonStatistic(id: number, statistic: Statistics) {
    this._statistics.set(id, statistic);
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
    private _requestOptions: RequestOptions
  ) { }

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = new User(user);
  }

  setUser(email: string) {
    if (!this._user) {
      this._authHttp.get("/api/users/" + email, { headers: this._requestOptions.headers })
        .map(response => response.json())
        .subscribe((user: any) => {
          this.user = user;
        });
    }

  }

  updateLastCompletedLesson(lessonId: number) {
    if (lessonId > this.user.lastCompletedLessonId) {
      this.user.lastCompletedLessonId = lessonId;
      this._authHttp.put("/api/users/" + this.user.email, JSON.stringify({ "lastCompletedLessonId": this.user.lastCompletedLessonId }), { headers: this._requestOptions.headers })
        .subscribe(data => { return; });
    }
  }

  saveLessonStatistic(lessonId: number, stat: Statistics) {
    this._authHttp.put("/api/users/" + this.user.email + "/stats/" + lessonId, JSON.stringify(stat), { headers: this._requestOptions.headers })
      .subscribe(() => {
        this.user.statistics.set(lessonId, stat);
      });
  }
}