interface IItem {
    $key?: string;
    name?: string;
    price?: number;
    unity?: string;
    quantity: number;
    total: number;
}
export interface IProduct extends IItem {
    categoryKey: string;
    imgName?: string;
    comment?: string;
    description?: string;
    step: number;
    active: boolean;
    selected?: boolean;
}

export interface IOrderLine extends IItem {
    oldQuantity?: number;
    oldTotal?: number;
    status?: number;
}
