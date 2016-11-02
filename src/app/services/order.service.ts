import {Injectable, EventEmitter} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class OrderService {
    private totalAmount: number = 0;
    pushTotalAmount = new EventEmitter<number>();
    order = {};

    constructor(private af: AngularFire) {
    }

    addProductLine(productLine: any): void {
        if (productLine.quantity <= 0) {
            delete this.order[productLine.productKey];
        } else {
            this.order[productLine.productKey] = {
                quantity: productLine.quantity,
                total: productLine.total
            };
        }
        this.calculateTotalAmount();
    }

    getTotalAmount(): number {
        return this.totalAmount;
    }

    calculateTotalAmount(): void {
        this.totalAmount = Object.keys( this.order ).reduce( (sum, key) => {
            return sum + this.order[key].total;
        }, 0 );

        this.pushTotalAmount.emit(this.getTotalAmount());
    }

}
