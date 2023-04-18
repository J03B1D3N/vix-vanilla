let array = [10, 20, true]
function isNotNumber(value) {
    return 'number' !== typeof value
}

console.log(array.some(isNotNumber))
console.log(typeof true)
console.log(typeof NaN)