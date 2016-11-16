import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class OrderService {
    private totalAmount: number = 0;
    pushTotalAmount = new EventEmitter<number>();
    order = {};
    emittedOrder = new EventEmitter<any>();

    addProductLine(productLine: any): void {
        if (productLine.quantity <= 0) {
            delete this.order[productLine.productKey];
        } else {
            this.order[productLine.productKey] = {
                name: productLine.name,
                unity: productLine.unity,
                quantity: productLine.quantity,
                total: productLine.total
            };
        }
        this.calculateTotalAmount();
    }

    orderListToArray() {
        let keys = [];
        for (let key in this.order) {
            keys.push( {key: key, value: this.order[key]} );
        }
        return keys;
    }

    getTotalAmount(): number {
        return this.totalAmount;
    }

    calculateTotalAmount(): void {
        this.totalAmount = Object.keys( this.order ).reduce( (sum, key) => {
            return sum + this.order[key].total;
        }, 0 );

        this.emittedOrder.emit(this.orderListToArray());
        this.pushTotalAmount.emit(this.getTotalAmount());
    }

    getLineData(key: string): any {
        return this.order[key] || null;
    }

}
