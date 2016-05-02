import { Pipe, PipeTransform } from "angular2/core";
import {isString, isPresent, isBlank} from "angular2/src/facade/lang";
import {BaseException} from "angular2/src/facade/exceptions";


@Pipe({ name: "lessonTextCut" })
export class LessonTextCutPipe implements PipeTransform {
  transform(baseText: string, textToBeCut: string): string {
    if (isPresent(baseText) && !isString(baseText)) {
      throw new BaseException("BaseText must be a string");
    }
    if (isPresent(textToBeCut) && !isString(textToBeCut)) {
      throw new BaseException("TextToBeCut must be a string");
    }
    if (!isBlank(textToBeCut) && baseText && textToBeCut) {
      return baseText.substr(textToBeCut.length, baseText.length);
    } else {
      return baseText;
    }
  }
}