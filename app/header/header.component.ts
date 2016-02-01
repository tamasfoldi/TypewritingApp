import {Component, Input} from "angular2/core";

@Component({
  selector: "tpw-header",
  template: "<h1>{{title}}</h1>"
})
export class HeaderComponent {
  @Input() title: string;
}
