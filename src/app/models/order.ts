import {IOrderLine} from './orderLine';
export interface IOrder {
    comment?: string;
    order: IOrderLine;
    user: string;
    weekOrderKey: string;
    checked: boolean;
    timestamp?: number;
}
