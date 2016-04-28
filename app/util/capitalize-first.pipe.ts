import { Pipe, PipeTransform } from "angular2/core";
import { isString, isType } from "angular2/src/facade/lang";
import {BaseException} from 'angular2/src/facade/exceptions';

@Pipe({
  name: "capitalizeFirst"
})

export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string): string {
    if (isString(value)) {
      return value.charAt(0).toUpperCase() + value.substr(1);
    }
    throw new BaseException("Requires a String as input");
  }
}