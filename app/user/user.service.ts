import { Injectable, Inject } from "angular2/core";
import { AuthHttp } from "angular2-jwt/angular2-jwt"
import { Headers } from "angular2/http";

export interface AuthUser {
  email: string;
  username?: string;
  password: string;
}

export class User {
  private _user: AuthUser;
  private _lastCompletedLessonId: number;

  constructor(user: AuthUser) {
    this._user = user;
  }

  get username(): string {
    return this._user.username;
  }

  get password(): string {
    return this._user.username;
  }

  get email(): string {
    return this._user.email;
  }

  get lastCompletedLessonId(): number {
    return this._lastCompletedLessonId;
  }
  set lastCompletedLessonId(lessonId: number) {
    this._lastCompletedLessonId = lessonId;
  }
}

@Injectable()
export class UserService {
  private _user: User;

  constructor(
    @Inject(AuthHttp) private _authHttp: AuthHttp
  ) { }

  get user(): User {
    return this._user;
  }
  
  set user(user: User) {
    this._user = user;
  }

  setUser(email: string) {
    if (!this._user) {
      this._authHttp.get("/api/user/" + email)
        .map(response => response.json())
        .subscribe((user: any) => { this._user = user });
    }
  }

  updateLastCompletedLesson(lessonId: number) {
    if (lessonId >= this.user.lastCompletedLessonId) {
      this.user.lastCompletedLessonId = lessonId;
      console.log(lessonId);
      this._authHttp.put("/api/user/" + this.user.email, JSON.stringify(this.user))
        .map(response => response.json())
        .subscribe(data => { });
    }
  }
}