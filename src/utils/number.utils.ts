export class NumberUtils {
    static isNumber = (val: any) => {
        return isFinite(val) && +val === val;
    };
}
