import {IOrderLine} from './orderLine';
export interface IOrder {
    comment?: string;
    order: any;
    user: string;
    weekOrderKey: string;
    checked: boolean;
    timestamp?: number;
}
