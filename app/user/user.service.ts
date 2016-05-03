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
  private _id: string;
  private _email: string;
  private _username: string;
  private _password: string;
  private _lastCompletedLessonId: number;
  private _lessonStatistics: Map<number, Statistics>;

  constructor(user?: User) {
    console.log(user)
    if (user) {
      this.email = user.email;
      this.username = user.username;
      this.password = user.password;
      this.lastCompletedLessonId = user.lastCompletedLessonId;
      this.lessonStatistics = (user.lessonStatistics && user.lessonStatistics.size === 0) ? this.setStatisticsFromArray(<any>user.lessonStatistics) : new Map<number, Statistics>();
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

  setUser(email: string) {
    if (!this._user) {
      this._authHttp.get("/api/users/" + email, this._requestOptions)
        .map(response => response.json())
        .subscribe((user: any) => {
          console.log(user);
          user.id = user._id;
          this._user = new User(user);
        });
    }
  }

  updateLastCompletedLesson(lessonId: number) {
    if (lessonId > this.user.lastCompletedLessonId || !this.user.lastCompletedLessonId) {
      this.user.lastCompletedLessonId = lessonId;
      this._authHttp.put("/api/users/last-completed-lesson/" + this.user.email, JSON.stringify({ "lastCompletedLessonId": this.user.lastCompletedLessonId }), this._requestOptions)
        .subscribe();
    }
  }

  saveLessonStatistic(lessonId: number, stat: Statistics) {
    this._authHttp.put("/api/users/" + this.user.email + "/stats/" + lessonId, JSON.stringify(stat), this._requestOptions)
      .map(data => data.json())
      .subscribe((statWithStar) => {
        this.user.lessonStatistics.set(lessonId, statWithStar);
      });
  }
}