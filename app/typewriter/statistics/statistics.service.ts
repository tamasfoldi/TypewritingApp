import { Injectable, Inject } from "angular2/core";
import { UserService } from "../../user/user.service";
import { RequestOptions } from "angular2/http";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { Observable } from "rxjs/Rx"

export class Statistics {
  private _numberOfCorrectKeypresses: number = 0;
  private _numberOfIncorrectKeypresses: number = 0;
  private _startTime: number = 0;
  private _stopTime: number = 0;
  private _star: number = 0;

  constructor(private _lessonId?: number) { // later the star will be calculated based lesson properties
  }

  get numberOfCorrectKeypresses(): number {
    return this._numberOfCorrectKeypresses;
  }
  set numberOfCorrectKeypresses(val: number) {
    this._numberOfCorrectKeypresses = val;
  }

  get numberOfIncorrectKeypresses(): number {
    return this._numberOfIncorrectKeypresses;
  }
  set numberOfIncorrectKeypresses(val: number) {
    this._numberOfIncorrectKeypresses = val;
  }

  get startTime(): number {
    return this._startTime;
  }
  set startTime(val: number) {
    this._startTime = val;
  }

  get stopTime(): number {
    return this._stopTime;
  }
  set stopTime(val: number) {
    this._stopTime = val;
  }

  get secondsToCompleteLesson(): number {
    return (this.stopTime - this.startTime) / 1000;
  }

  get pressedKeysPerSec(): number {
    return this.numberOfCorrectKeypresses / this.secondsToCompleteLesson;
  }

  get numberOfTotalKeypresses(): number {
    return this.numberOfCorrectKeypresses + this.numberOfIncorrectKeypresses;
  }

  get accuracy(): number {
    return this.numberOfCorrectKeypresses / this.numberOfTotalKeypresses;
  }

  get star(): number {
    return this._star;
  }

}

export type Correctness = {
  id: string,
  numberOfCorrectKeypresses: number,
  numberOfIncorrectKeypresses: number
};

@Injectable()
export class StatisticsService {

  private userId: string;
  private _correctness: Observable<Correctness>;

  constructor(
    @Inject(UserService) private _userService: UserService,
    @Inject(AuthHttp) private _authHttp: AuthHttp,
    private _requestOptions: RequestOptions

  ) { }

  getCorrectness(userId: string): Observable<Correctness> {
      return this._authHttp.get("/api/statistics/" + userId, { headers: this._requestOptions.headers })
        .map(result => result.json());
  }

}