import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from './product';

@Pipe( {
    name: 'productCategoryFilter'
} )
export class ProductCategoryFilterPipe implements PipeTransform {

    transform(value: IProduct[], category: string): IProduct[] {
        if (!category) {
            return value;
        }
        return value.filter(
            (product: IProduct) => product.category === category );
    }

}
