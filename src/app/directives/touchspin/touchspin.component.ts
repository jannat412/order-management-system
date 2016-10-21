import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component( {
    selector: 'touchspin',
    templateUrl: './touchspin.component.html',
    styleUrls: ['./touchspin.component.scss']
} )
export class TouchspinComponent {
    private value: number = 0;
    @Output() private touchspinChange: EventEmitter<number> = new EventEmitter<number>();
    private minimum: number = 0;
    private maximum: number = 100;
    @Input() private step: number = 1;

    decrement = (): void => {
        if (this.value > this.minimum) {
            this.updateValue( this.value - this.step );
        }
    };

    increment = (): void => {
        if (this.value < this.maximum) {
            this.updateValue( this.value + this.step );
        }
    };

    updateValue = (calc: number): void => {
        this.value = Math.round( calc * 100 ) / 100;
        this.touchspinChange.emit( this.value );
    };

}
