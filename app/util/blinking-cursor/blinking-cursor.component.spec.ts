import {BlinkingCursorComponent} from './blinking-cursor.component';
import {beforeEach, beforeEachProviders, inject} from "@angular/core/testing";
import { TestComponentBuilder } from '@angular/compiler/testing';

describe('BlinkingCursorComponent specs', () => {
  let tcb: TestComponentBuilder;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    BlinkingCursorComponent
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb
  }));

  //specs
  it('should render `|`', done => {
    tcb.createAsync(BlinkingCursorComponent).then(fixture => {
      let blinkingCurson = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelector('span').innerText).toBe('|');
      done();
    });
  });

  it('should has one `blinking-cursor` class', done => {
    tcb.createAsync(BlinkingCursorComponent).then(fixture => {
      let blinkingCurson = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelectorAll('.blinking-cursor').length).toBe(1);
      done();
    });
  });
}) 