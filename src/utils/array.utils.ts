export class ArrayUtils {
    static orderListToArray = (data) => {
        let keys = [];
        for (let item in data) {
            if (data.hasOwnProperty( item ) && data[item].quantity > 0) {
                let o = {
                    $key: item,
                    name: data[item].name,
                    price: data[item].price,
                    quantity: data[item].quantity,
                    total: data[item].total,
                    unity: data[item].unity
                };
                keys.push( o );
            }
        }
        keys.sort( (a, b): any => a.name > b.name );
        return keys;
    };

    static filterObjectArray = (obj, predicate) => {
        return Object.keys( obj )
            .filter( (key) => predicate( obj[key] )
            )
            .reduce( (acc, cur, i) => {
                acc[cur] = obj[cur];
                return acc;
            }, {} );
    };
}