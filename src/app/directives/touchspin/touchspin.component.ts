import { Component, Input } from '@angular/core';

@Component({
  selector: 'touchspin',
  templateUrl: './touchspin.component.html',
  styleUrls: ['./touchspin.component.scss']
})
export class TouchspinComponent {
  value: number = 0;
  displayValue: string = '0';
  minimum: number = 0;
  maximum: number = 100;
  @Input() step: number = 0;

  decrement() {
    if(this.value > this.minimum) {
      this.updateValue(this.value - this.step);
    }
  }
  increment() {
    if(this.value < this.maximum) {
      this.updateValue(this.value + this.step);
    }
  }
   updateValue(calc: number) {
    this.value = Math.round(calc * 100)/100;
    this.displayValue = this.value.toFixed(1);
  }

  decimalPlaces() {

  }

}
