import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from './product';

@Pipe( {
    name: 'productFilter'
} )
export class ProductFilterPipe implements PipeTransform {

    transform(value: IProduct[], args: string): IProduct[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter(
            (product: IProduct) => product.name
                .toLocaleLowerCase()
                .indexOf(filter) !== -1 ) : value;
    }

}
