import {Pipe, PipeTransform} from '@angular/core';

import {IProduct} from '../../models/product';

@Pipe( {
    name: 'productSelectedFilter',
    pure: false
} )
export class ProductSelectedFilterPipe implements PipeTransform {

    transform(value: IProduct[], all: boolean): IProduct[] {
        return all ?
            value.filter( (product: IProduct) => product.selected ) : value;
    }
}
