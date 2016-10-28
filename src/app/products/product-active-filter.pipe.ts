import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from './product';

@Pipe( {
    name: 'productActiveFilter'
} )
export class ProductActiveFilterPipe implements PipeTransform {

    transform(value: IProduct[], all: boolean): IProduct[] {
        console.log(all);
        return all ? value : value.filter(
            (product: IProduct) => {
                return product.active;
            } );
    }

}
