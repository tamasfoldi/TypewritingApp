import { Pipe, PipeTransform } from "@angular/core";
import { isString, isPresent } from "@angular/core/src/facade/lang";
import { BaseException } from "@angular/src/facade/exceptions";

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