import {Pipe, PipeTransform} from '@angular/core';

import {IProduct} from '../../models/item';

@Pipe( {
    name: 'productCategoryFilter'
} )
export class ProductCategoryFilterPipe implements PipeTransform {

    transform(value: IProduct[], categoryKey: string): IProduct[] {
        if (!categoryKey) {
            return value;
        }
        return value.filter(
            (product: IProduct) => product.categoryKey === categoryKey );
    }

}
