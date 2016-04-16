import { Injectable, Inject } from "angular2/core";
import { Observable } from "rxjs/Rx";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { RequestOptions } from "angular2/http";


export interface Lesson {
  id: number;
  name: string;
  text: string;
}

@Injectable()
export class LessonService {

  private _$lessons: Observable<Lesson[]>;
  private _lessons: Lesson[];

  constructor(
    @Inject(AuthHttp) private _authHttp: AuthHttp,
    private _requestOptions: RequestOptions
  ) {
    this._$lessons = this._authHttp.get("/api/lessons", { headers: this._requestOptions.headers })
      .map(result => result.json());
    this._$lessons.subscribe((lessons) => {
      this._lessons = lessons;
    });
  }

  get lessons(): Observable<Lesson[]> {
    if (this._lessons) {
      return Observable.of(this._lessons);
    } else {
      return this._$lessons;
    }
  }

  get(id: number): Observable<Lesson> {
    if (this._lessons) {
      return Observable.of(this._lessons[id]);
    } else {
      return this._authHttp.get("/api/lessons/" + id, { headers: this._requestOptions.headers })
        .map(result => result.json());
    }
  }
}