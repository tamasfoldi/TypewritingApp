import { Pipe, PipeTransform } from "angular2/core";
import {isString, isPresent} from "angular2/src/facade/lang";
import {BaseException} from "angular2/src/facade/exceptions";

@Pipe({ name: "spaceToUnderscore" })
export class SpaceToUnderscorePipe implements PipeTransform {
  transform(baseText: string): string {
    if (isPresent(baseText) && !isString(baseText)) {
      throw new BaseException("BaseText must be a string!");
    }
    if (baseText) {
      return baseText.replace(/( )/g, "_");
    } else {
      return baseText;
    }
  }
}