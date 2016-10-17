export interface IProduct {
    $key: number;
    name: string;
    imgName: string;
    comment: string;
    description: string;
    price: number;
    step: number;
    unity: string;
    decimal: number;
    tags: string[];
    category: string;
    active: boolean;
    visible: boolean;
}
