import {beforeEachProviders, inject, beforeEach} from "angular2/testing";
import {SpaceToUnderscorePipe} from "./space-to-underscore.pipe";
import {BaseException} from 'angular2/src/facade/exceptions';

describe('Pipe: LessonTextCutPipe', () => {
  let pipe: SpaceToUnderscorePipe;

  //setup
  beforeEachProviders(() => [
    SpaceToUnderscorePipe
  ]);

  beforeEach(inject([SpaceToUnderscorePipe], (p: SpaceToUnderscorePipe) => {
    pipe = p;
  }));

  it('should throw if not used with a string', () => {
    expect(() => pipe.transform(<any>3)).toThrow();
    expect(() => pipe.transform(<any>3)).toThrowError("BaseText must be a string!");
    expect(() => pipe.transform(<any>3)).toThrowError(BaseException);
    expect(() => pipe.transform(<any>3)).toThrowError(BaseException, "BaseText must be a string!");
  });

  it('should work with null and undefined', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should not do anything if there is no space', () => {
    expect(pipe.transform('wow')).toEqual('wow');
  });

  it('should transform spaces into _', () => {
    expect(pipe.transform(' test_t st')).toEqual('_test_t_st');
  });
}) 