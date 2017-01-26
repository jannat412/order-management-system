import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component( {
    selector: 'app-touchspin',
    templateUrl: './touchspin.component.html',
    styleUrls: ['./touchspin.component.scss']
} )
export class TouchspinComponent {
    @Input() private value: number = 0;
    @Input() private step: number = 1;
    @Output() private touchspinChange: EventEmitter<number> = new EventEmitter<number>();
    private minimum: number = 0;
    private maximum: number = 100;

    private decrement = (): void => {
        if (this.value > this.minimum) {
            this.updateValue( this.value - this.step );
        }
    };

    private increment = (): void => {
        if (this.value < this.maximum) {
            this.updateValue( this.value + this.step );
        }
    };

    private updateValue = (calc: number): void => {
        this.value = Math.round( calc * 100 ) / 100;
        this.touchspinChange.emit( this.value );
    };

    onChange = (): void => {
        // TODO detect invalid value
        // TODO unify with updateValue
        this.touchspinChange.emit( this.value );
    };

}
