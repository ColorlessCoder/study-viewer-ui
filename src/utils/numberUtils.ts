export function compareNumber(a: number|undefined, b: number|undefined) {
    if(a === b) {
        return 0;
    }
    if(a === undefined) {
        return -1;
    }
    if(b === undefined) {
        return 1
    }
    return a < b ? -1: 1;
}