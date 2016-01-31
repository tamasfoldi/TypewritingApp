import { describe, it, expect, inject,
injectAsync, beforeEach, TestComponentBuilder } from "angular2/testing";
import {HeaderComponent} from "./header.component";

describe("Typewriting header tests", function() {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], tcBuilder => {
    tcb = tcBuilder;
  }));

  it("should have one h1", injectAsync([], () => {
    return tcb.createAsync(HeaderComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("h1").length).toEqual(1);
      });
  }));

  it("should have a title", injectAsync([], () => {
    return tcb.createAsync(HeaderComponent)
      .then(fixture => {

        let headerCmp = fixture.componentInstance;
        headerCmp.title = "Test title";


        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelector("h1")).toHaveText("Test title");
      });
  }));
});
