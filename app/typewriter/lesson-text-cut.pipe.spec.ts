import {beforeEachProviders, inject, beforeEach} from "angular2/testing";
import {LessonTextCutPipe} from "./lesson-text-cut.pipe";
import {BaseException} from 'angular2/src/facade/exceptions';

describe('Pipe: LessonTextCutPipe', () => {
  let pipe: LessonTextCutPipe;

  //setup
  beforeEachProviders(() => [
    LessonTextCutPipe
  ]);

  beforeEach(inject([LessonTextCutPipe], (p: LessonTextCutPipe) => {
    pipe = p;
  }));

  it('should throw if not used with a string', () => {
    expect(() => pipe.transform(<any>3, <any>3)).toThrow();
    expect(() => pipe.transform(<any>3, <any>3)).toThrowError("BaseText must be a string");
    expect(() => pipe.transform(<any>3, <any>3)).toThrowError(BaseException);
    expect(() => pipe.transform(<any>3, <any>3)).toThrowError(BaseException, "BaseText must be a string");

    expect(() => pipe.transform("3", <any>3)).toThrow();
    expect(() => pipe.transform("3", <any>3)).toThrowError("TextToBeCut must be a string");
    expect(() => pipe.transform("3", <any>3)).toThrowError(BaseException);
    expect(() => pipe.transform("3", <any>3)).toThrowError(BaseException, "TextToBeCut must be a string");
  });

  it('should work with null and undefined', () => {
    expect(pipe.transform(null, null)).toBeNull();
    expect(pipe.transform(undefined, undefined)).toBeUndefined();
  });

  it('should cut off the second parameter from the first', () => {
    expect(pipe.transform('wow', 'w')).toEqual('ow');
  });

  it('should work with empty strings', () => {
    expect(pipe.transform('', '')).toEqual('');
  });
}) 