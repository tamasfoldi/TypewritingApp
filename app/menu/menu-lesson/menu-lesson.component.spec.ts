import { describe, it, expect, inject,
injectAsync, beforeEach, beforeEachProviders, TestComponentBuilder } from "angular2/testing";
import {MenuLessonComponent} from "./menu-lesson.component";
import {MenuLessonService} from "./menu-lesson.service";

describe("Typewriting menu lesson", () => {
  let tcb: TestComponentBuilder;

  beforeEachProviders(() => [
    MenuLessonService
  ]);

  beforeEach(inject([TestComponentBuilder, MenuLessonService], (tcBuilder, menuLessonService) => {
    tcb = tcBuilder;
    spyOn(menuLessonService, "query").and.returnValue([{ id: 1, name: "lesson 1" }]);
  }));

  it("should have one menuLessonElem with name 'lesson 1'", injectAsync([], () => {
    return tcb.createAsync(MenuLessonComponent)
      .then(fixture => {
        let cmp = fixture.componentInstance;

        expect(cmp.lessonMenuElems.length).toEqual(1);
        expect(cmp.lessonMenuElems[0].name).toBe("lesson 1");
      });
  }));


  it("should have one li with text 'lesson 1'", injectAsync([], () => {
    return tcb.createAsync(MenuLessonComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("li").length).toEqual(1);
        expect(element.querySelector("li")).toHaveText("lesson 1");
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
