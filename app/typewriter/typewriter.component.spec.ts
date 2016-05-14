import {TypewriterComponent} from './typewriter.component';
import { LessonService } from "../lesson/lesson.service";
import { UserService } from "../user/user.service";
import { Location } from "@angular/common";
import { SpyLocation } from '@angular/common/testing';
import { RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, RouteParams } from "@angular/router-deprecated";
import {provide} from "@angular/core"
import {beforeEach, beforeEachProviders, inject} from "@angular/core/testing";
import { TestComponentBuilder } from '@angular/compiler/testing';
import * as Rx from 'rxjs/Rx'
import { Observable } from "rxjs/Rx";

class FakeLessonService {
  get(id: number) {
    return Observable.of({ id: 0, name: "Test Lesson", text: "Te" });
  }
}

class FakeUserService {
  updateLastCompletedLesson() {
    return;
  }

  saveLessonStatistic() {
    return;
  }
}

class FakeRouteParams {
  get(param: string) {
    return "0";
  }
}

describe('TypewriterComponent ', () => {
  let tcb: TestComponentBuilder,
    routeParams: RouteParams,
    lessonService: LessonService,
    userService: UserService;

  //setup
  beforeEachProviders(() => [
    provide(LessonService, { useClass: FakeLessonService }),
    provide(UserService, { useClass: FakeUserService }),
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useFactory: () => {}}),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: TypewriterComponent }),
    provide(RouteParams, { useClass: FakeRouteParams })
  ]);

  beforeEach(inject([TestComponentBuilder, LessonService, UserService], (_tcb, _lessonService, _userService) => {
    tcb = _tcb;
    lessonService = _lessonService,
    userService = _userService;
  }));

  // specs
  it('should set the lesson to init stats', done => {
    tcb.createAsync(TypewriterComponent).then(fixture => {
      spyOn(routeParams, "get").and.callThrough();
      spyOn(lessonService, "get").and.callThrough();
      let typewriterComponent: TypewriterComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection

      expect(element.querySelector("#inputElement").innerText).toEqual("|");
      expect(element.querySelector('h1').innerText).toEqual("Test Lesson");
      expect(element.querySelector('p').innerText).toEqual("Te");
      done();
    });
  });

  it('should handle the typedtext on key', done => {
    tcb.createAsync(TypewriterComponent).then(fixture => {
      let typewriterComponent: TypewriterComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      spyOn(routeParams, "get").and.callThrough();
      spyOn(lessonService, "get").and.callThrough();
      fixture.detectChanges(); //trigger change detection

      typewriterComponent.keypressEventHandler(<any>{ which: "50" });
      expect(typewriterComponent.typedText).toBe("");
      expect(typewriterComponent.statistics.numberOfCorrectKeypresses).toBe(0);
      expect(typewriterComponent.statistics.numberOfIncorrectKeypresses).toBe(0);

      typewriterComponent.keypressEventHandler(<any>{ which: "84" });
      expect(typewriterComponent.typedText).toBe("T");
      expect(typewriterComponent.statistics.numberOfCorrectKeypresses).toBe(1);
      expect(typewriterComponent.statistics.numberOfIncorrectKeypresses).toBe(0);

      typewriterComponent.keypressEventHandler(<any>{ which: "50" });
      expect(typewriterComponent.typedText).toBe("T");
      expect(typewriterComponent.statistics.numberOfCorrectKeypresses).toBe(1);
      expect(typewriterComponent.statistics.numberOfIncorrectKeypresses).toBe(1);

      done();
    });
  });

  it('should handle the lesson end', done => {
    tcb.createAsync(TypewriterComponent).then(fixture => {
      let typewriterComponent: TypewriterComponent = fixture.componentInstance;
      let element = fixture.nativeElement;
      spyOn(userService, "updateLastCompletedLesson").and.callFake(() => { });
      spyOn(typewriterComponent, "handleLessonEnd").and.callThrough();
      spyOn(userService, "saveLessonStatistic").and.callFake(() => { });
      fixture.detectChanges(); //trigger change detection

      typewriterComponent.keypressEventHandler(<any>{ which: "84" });
      expect(typewriterComponent.typedText).toBe("T");
      expect(typewriterComponent.statistics.numberOfCorrectKeypresses).toBe(1);
      expect(typewriterComponent.statistics.numberOfIncorrectKeypresses).toBe(0);

      typewriterComponent.keypressEventHandler(<any>{ which: "101" });
      expect(typewriterComponent.typedText).toBe("Te");
      expect(typewriterComponent.statistics.numberOfCorrectKeypresses).toBe(2);
      expect(typewriterComponent.statistics.numberOfIncorrectKeypresses).toBe(0);
      expect(typewriterComponent.handleLessonEnd).toHaveBeenCalled();
      done();
    });
  });

}); 