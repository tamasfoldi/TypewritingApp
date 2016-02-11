import { describe, it, expect, inject,
injectAsync, beforeEach, beforeEachProviders, TestComponentBuilder } from "angular2/testing";
import {provide} from "angular2/core";
import {MenuLessonComponent} from "./menu-lesson.component";
import {MenuLessonService} from "./menu-lesson.service";

describe("Typewriting menu lesson", () => {
  let tcb: TestComponentBuilder;
  let menuLessonService: any;

  beforeEachProviders(() => [
    MenuLessonService
  ]);

  beforeEach(inject([TestComponentBuilder], (tcBuilder) => {
    menuLessonService = new MenuLessonService();
    tcb = tcBuilder;
    spyOn(menuLessonService, "query").and.returnValue(Promise.resolve([{ id: 1, name: "lesson 1" }]));

    tcb.overrideProviders(MenuLessonComponent, [
      provide(MenuLessonService, { useValue: menuLessonService })
    ])
      .createAsync(MenuLessonComponent);
  }));

  it("should have one menuLessonElem with name 'lesson 1'", injectAsync([], () => {
    return tcb.createAsync(MenuLessonComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;
        spyOn(cmp, "ngOnInit").and.callThrough();
        spyOn(cmp, "queryMenuItems").and.callThrough();

        Promise.resolve(cmp.ngOnInit()).then(() => {
          fixture.detectChanges();
          let element = fixture.nativeElement;

          expect(cmp.lessonMenuElems.length).toEqual(1);
          expect(cmp.lessonMenuElems[0].name).toBe("lesson 1");
          expect(element.querySelectorAll("li").length).toEqual(1);
          expect(element.querySelector("li")).toHaveText("lesson 1");
        });

      });
  }));

  it("should have one ul", injectAsync([], () => {
    return tcb.createAsync(MenuLessonComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("ul").length).toEqual(1);
      });
  }));
});
