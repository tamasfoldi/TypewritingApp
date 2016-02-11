import { describe, it, expect, inject,
injectAsync, beforeEach, beforeEachProviders, TestComponentBuilder } from "angular2/testing";
import {MenuLessonService} from "./menu-lesson.service";

describe("Typewriting menu lesson", () => {
  let menuLessonService: MenuLessonService;

  beforeAll(() => {
    menuLessonService = new MenuLessonService();
  });

  beforeEachProviders(() => [
    MenuLessonService
  ]);

  it("should should return with 2 MenuLesson", () => {
    menuLessonService.query().then(menuLessons => {
      expect(menuLessons.length).toEqual(2);
    });
  });

  it("should have the first element id: 1 name: Lesson 1", () => {
    menuLessonService.query().then(menuLessons => {
      expect(menuLessons[0].name).toBe("Lesson 1");
    });

  });

});
