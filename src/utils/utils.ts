export class ObjectUtils {
    static filterObjectArray = (obj, predicate) => {
        return Object.keys( obj )
            .filter( (key) => predicate( obj[key] )
            )
            .reduce( (acc, cur) => {
                acc[cur] = obj[cur];
                return acc;
            }, {} );
    };
}

export class ArrayUtils {
    static flattenAll = (data) => {
        return data.reduce( (arr, el) => arr.concat( el )
        );
    };
}

export class NumberUtils {
    static isNumber = (val: any) => {
        return isFinite( val ) && +val === val;
    };
}

export class ValidationUtils {
    static email = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;
}

export class OrderUtils {
    static orderListToArray = (data: any, zeroQuantity: boolean = false) => {
        let keys = [];
        for (let item in data) {
            if (data.hasOwnProperty( item ) &&
                ( (!zeroQuantity && data[item].quantity > 0) || zeroQuantity)) {
                let o = {
                    $key: item,
                    name: data[item].name,
                    price: data[item].price,
                    quantity: data[item].quantity,
                    total: data[item].total,
                    unity: data[item].unity,
                    oldTotal: data[item].oldTotal || 0,
                    oldQuantity: data[item].oldQuantity || 0,
                    status: data[item].status || 0
                };
                keys.push( o );
            }
        }
        keys.sort( (a, b): any => a.name > b.name );
        return keys;
    };

    /**
     * adds the relative url to the image property on product object
     * @param product
     * @param type
     * @returns {any}
     */
    static reformatImgUrl = (product: any, type: string): any => {
        const url = `/assets/product-img/${type}/`;

        return Object.assign( {}, product, {
            imgName: url + product.imgName
        } )
    };

    static getSuperTotal = (data: any, param: string) => {
        return data.reduce( (acc, prod) => {
            return acc + prod[param];
        }, 0 );
    };

    static reduceOrderByName = (data) => data.reduce( OrderUtils.sumQuantities, [] );

    private static sumQuantities = (list, order) => {
        const index = list.map( (e) => {
            return e.name || '';
        } ).indexOf( order.name );

        if (index === -1) {
            list.push( order );
        } else {
            var prod = list[index];
            prod.quantity += order.quantity * 1e2 / 1e2;
            prod.total += order.total * 1e2 / 1e2;
        }
        return list;
    };

}

