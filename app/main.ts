// import { bootstrap } from "@angular/platform-browser-dynamic";
// import { ComponentRef, provide, ReflectiveInjector } from "@angular/core";
// import { HTTP_PROVIDERS, Http, BaseRequestOptions, Headers, RequestOptions } from "@angular/http";
// import { AuthHttp, AuthConfig, tokenNotExpired } from "angular2-jwt/angular2-jwt";
// import { ROUTER_PROVIDERS } from "@angular/router";
// import { AppComponent } from "./app.component";
// import { UserService } from "./user/user.service";
// import { StatisticsService } from "./typewriter/statistics/statistics.service";
// import { AuthService } from "./auth/auth.service";
// import { WaypointService } from "./map/waypoint/waypoint.service";
// import { LessonService } from "./lesson/lesson.service";
// import { appInjector } from "./app-injector";
// import 'rxjs/Rx';

// class MyHeader extends BaseRequestOptions {
//   headers: Headers = new Headers();

//   constructor() {
//     super();
//     this.headers.append("Content-Type", "application/json");
//   }
// }

// let injector = ReflectiveInjector.resolveAndCreate([
//   HTTP_PROVIDERS,
//   provide(AuthHttp, {
//     useFactory: (http) => {
//       return new AuthHttp(new AuthConfig({
//         headerName: "Authorization",
//         headerPrefix: "Bearer",
//         tokenName: "id_token",
//         tokenGetter: (() => localStorage.getItem("id_token")),
//         noJwtError: true
//       }), http);
//     },
//     deps: [Http]
//   }),
//   provide(RequestOptions, { useClass: MyHeader }),
//   UserService
// ]);
// let http: Http = injector.get(Http);
// let userService: UserService = injector.get(UserService);
// let authHttp: AuthHttp = injector.get(AuthHttp);
// let requestOptions = injector.get(RequestOptions);
// let tokenInfo = {
//   id_token: localStorage.getItem("id_token")
// };
// http.post("https://tamasfo.eu.auth0.com/tokeninfo", JSON.stringify(tokenInfo))
//   .map(response => response.json())
//   .subscribe(_result => {
//     authHttp.get("/api/users/" + _result.email, { headers: requestOptions.headers })
//       .map(_response => _response.json())
//       .subscribe((user: any) => {
//         user.id = user._id;
//         userService.setUser(user.email);
//         bootstrap(AppComponent, [
//           LessonService,
//           AuthService,
//           WaypointService,
//           ROUTER_PROVIDERS,
//           HTTP_PROVIDERS,
//           provide(AuthHttp, {
//             useFactory: (http) => {
//               return new AuthHttp(new AuthConfig({
//                 headerName: "Authorization",
//                 headerPrefix: "Bearer",
//                 tokenName: "id_token",
//                 tokenGetter: (() => localStorage.getItem("id_token")),
//                 noJwtError: true
//               }), http);
//             },
//             deps: [Http]
//           }),
//           provide(UserService, { useValue: userService }),
//           StatisticsService,
//           provide(RequestOptions, { useClass: MyHeader })
//         ]).then((appRef: ComponentRef) => {
//           appInjector(appRef.injector);
//         });
//       });
//   }, () => {
//     bootstrap(AppComponent, [
//       LessonService,
//       AuthService,
//       WaypointService,
//       ROUTER_PROVIDERS,
//       HTTP_PROVIDERS,
//       provide(AuthHttp, {
//         useFactory: (http) => {
//           return new AuthHttp(new AuthConfig({
//             headerName: "Authorization",
//             headerPrefix: "Bearer",
//             tokenName: "id_token",
//             tokenGetter: (() => localStorage.getItem("id_token")),
//             noJwtError: true
//           }), http);
//         },
//         deps: [Http]
//       }),
//       UserService,
//       StatisticsService,
//       provide(RequestOptions, { useClass: MyHeader })
//     ]).then((appRef: ComponentRef) => {
//       appInjector(appRef.injector);
//     });
//   });

import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

bootstrap(AppComponent);



