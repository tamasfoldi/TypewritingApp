import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { RequestOptions } from "@angular/http";

export interface Lesson {
  id: number;
  name: string;
  text: string;
}

@Injectable()
export class LessonService {

  private _lessons:  Observable<Lesson[]>;

  constructor(
    @Inject(AuthHttp) private _authHttp: AuthHttp,
    private _requestOptions: RequestOptions
  ) {
  }

  get lessons(): Observable<Lesson[]> {
    if (!this._lessons) {
      this._lessons = this._authHttp.get("/api/lessons", this._requestOptions)
      .map(result => result.json())
      .publishReplay(1)
      .refCount();
    } 
    return this._lessons;
  }

  get(id: number): Observable<Lesson> {
    if (this._lessons) {
      return this._lessons.map( lessons => {
        return lessons[id];
      });
    } else {
      return this._authHttp.get("/api/lessons/" + id, this._requestOptions)
        .map(result => result.json());
    }
  }
}