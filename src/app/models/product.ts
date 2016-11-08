export interface IProduct {
    $key: number;
    name: string;
    categoryKey: string;
    imgName?: string;
    comment?: string;
    description?: string;
    price: number;
    step: number;
    unity: string;
    decimal: number;
    tags: string[];
    active: boolean;
    selected?: boolean;
}
