import { Injectable } from '@angular/core';
import {Product} from '../classes/product';

@Injectable()
export class ProductsService {
   getProducts() {
     return [
       new Product(1, 'Poma Gala', 'descripció de la poma gala', 1.2, 'kg', 0.1, ['eco']),
       new Product(2, 'Pera', 'descripció de la pera', 1.1, 'kg', 0.1, ['eco', 'comerç just']),
       new Product(3, 'Plàtan', 'descripció del plàtan', 1.5, 'kg', 0.1, ['eco', 'novetat']),
       new Product(4, 'Cirera', 'descripció de la cirera', 2.85, 'kg', 0.1, ['eco', 'novetat', 'comerç just']),
       new Product(5, 'Meló', 'descripció del meló', 2.2, 'kg', 1, ['eco']),
     ];

   }
}
