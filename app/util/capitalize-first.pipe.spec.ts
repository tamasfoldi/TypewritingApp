import {beforeEachProviders, inject, beforeEach} from "angular2/testing";
import {CapitalizeFirstPipe} from "./capitalize-first.pipe";
import {BaseException} from 'angular2/src/facade/exceptions';

describe('Pipe: CapitaliseFirstPipe', () => {
  let pipe: CapitalizeFirstPipe;

  //setup
  beforeEachProviders(() => [
    CapitalizeFirstPipe
  ]);

  beforeEach(inject([CapitalizeFirstPipe], (p: CapitalizeFirstPipe) => {
    pipe = p;
  }));

  it('should throw if not used with a string', () => {
    expect(() => pipe.transform(null)).toThrow();
    expect(() => pipe.transform(undefined)).toThrow();
    expect(() => pipe.transform(<any>3)).toThrow();
    expect(() => pipe.transform(<any>3)).toThrowError('Requires a String as input');
    expect(() => pipe.transform(<any>3)).toThrowError(BaseException);
    expect(() => pipe.transform(<any>3)).toThrowError(BaseException, 'Requires a String as input');
  });

  it('should work with empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should capitalise the first letter', () => {
    expect(pipe.transform('wow')).toEqual('Wow');
  });

  it('should leave the first letter if already capital', () => {
    expect(pipe.transform('Wow')).toEqual('Wow');
  });
}) 