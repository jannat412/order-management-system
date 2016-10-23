import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from './product';

@Pipe( {
    name: 'productFilter'
} )
export class ProductFilterPipe implements PipeTransform {
    /* TODO make filtering without being strict for accents */
    transform(value: IProduct[], key: string, args: any): IProduct[] {
        let filter: any = args ?
            (typeof args === 'boolean' ? args : args.toLocaleLowerCase()) : false;
        return filter ? value.filter(
            (product: IProduct) => {
                if(typeof product[key] === 'string') {
                    product[key].toLocaleLowerCase().indexOf( filter ) !== -1;
                } else if(typeof product[key] === 'boolean') {
                    product[key] === args;
                }
            }) : value;
    }

}
