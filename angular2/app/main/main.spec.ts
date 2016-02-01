import { describe, it, expect, inject,
injectAsync, beforeEach, TestComponentBuilder } from "angular2/testing";
import {MainComponent} from "./main.component";

describe("Typewriting main tests", function() {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], tcBuilder => {
    tcb = tcBuilder;
  }));

  it("should have one header", injectAsync([], () => {
    return tcb.createAsync(MainComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("tpw-header").length).toEqual(1);
      });
  }));

  it("should have one footer", injectAsync([], () => {
    return tcb.createAsync(MainComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("tpw-footer").length).toEqual(1);
      });
  }));

  it("should have one section", injectAsync([], () => {
    return tcb.createAsync(MainComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("section").length).toEqual(1);
      });
  }));

  it("should have one h1", injectAsync([], () => {
    return tcb.createAsync(MainComponent)
      .then(fixture => {

        fixture.detectChanges();

        let element = fixture.nativeElement;
        expect(element.querySelectorAll("h1").length).toEqual(1);
      });
  }));
});
