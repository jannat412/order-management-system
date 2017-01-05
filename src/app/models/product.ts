export interface IProduct {
    $key: string;
    name: string;
    categoryKey?: string;
    imgName?: string;
    comment?: string;
    description?: string;
    price?: number;
    step?: number;
    unity?: string;
    active: boolean;

    selected?: boolean;
    quantity?: number;
    total?: number;
}
