import { Pipe, PipeTransform } from "angular2/core";

@Pipe({
  name: "capitalizeFirst"
})

export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string) : string {
    value = value.charAt(0).toUpperCase() + value.substr(1);
    return value;
  }
}