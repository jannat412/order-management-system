export interface ICounterData {
    valuePerUnit: number;
    quantity: number;
    step: number|string;
    totalMeasurementUnit?: string;
    total?: number;
}