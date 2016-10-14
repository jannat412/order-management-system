export interface IProduct {
    $key: number;
    name: string;
    comment: string;
    description: string;
    price: number;
    step: number;
    unity: string;
    decimal: number;
    tags: string[];
    category: string;
    active: boolean;
}
