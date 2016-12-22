export class ArrayUtils {
    static orderListToArray = (data) => {
        let keys = [];
        for (let item in data) {
            if (data.hasOwnProperty( item )) {
                keys.push( {key: item, value: data[item]} );
            }
        }
        keys.sort( (a, b): any => a.value.name > b.value.name );
        return keys;
    };
}