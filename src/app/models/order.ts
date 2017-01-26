export interface IOrder {
    order: any;
    user: string;
    weekOrderKey: string;
    checked: boolean;
    timestamp?: any;
    deliverInfo?: {
        deliverType: string;
        comment?: string;
        center?: string;
        address?: string;
    }
}
