export interface IOrderLine {
    $key?: string;
    name?: string;
    price?: number;
    unity?: string;
    quantity: number;
    total: number;
    oldQuantity?: number;
    oldTotal?: number;
    status?: number;
}

