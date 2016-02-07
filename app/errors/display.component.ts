import {Component, Input, OnInit, Host} from "angular2/core";
import {NgFormModel, AbstractControl} from "angular2/common";


@Component({
  selector: "display-error",
  template: "<div *ngIf='isDisplayed()'><ng-content></ng-content></div>"
})
export class DisplayErrorComponent implements OnInit {
  @Input("control")
  controlName: string;
  @Input()
  error: string;
  control: AbstractControl;

  constructor( @Host() private formModel: NgFormModel) {
  }

  ngOnInit() {
    this.control = this.formModel.form.find(this.controlName);
  }

  isDisplayed() {
    return this.control.hasError(this.error);
  }
}
