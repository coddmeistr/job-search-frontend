export const contains = (arr, elem) => {
    if (arr === null || arr === undefined) return -1
    return arr.indexOf(elem) !== -1;
}