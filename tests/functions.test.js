
function isNotNumber(value) {
    return 'number' !== typeof value || isNaN(value)
}

//checks if arguments is string
function isNotString(value){
    return'string' !== typeof value
}

//checks if argument is not boolean
function isNotBoolean(value){
    return 'boolean' !== typeof value;
} 

//checks if all arguments are numbers, then multiplies them
function MULTIPLY(...args) {
    if(!args.some(isNotNumber)){
        return args.reduce(function (acc, cur) {
            return acc * cur
        })
    } else return '#ERROR: type does not match'
}

//checks if all arguments are numbers, then adds them together
function SUM(...args) {
    if(!args.some(isNotNumber)){
        return args.reduce(function (acc, cur) {
            return acc + cur
        })
    } else return '#ERROR: type does not match'
}

//checks if all arguments are numbers, then divides them
function DIVIDE(...args) {
    if(!args.some(isNotNumber)){
        return args.reduce(function (acc, cur) {
            return acc / cur
        })
    } else return '#ERROR: type does not match'
}

//checks if all arguments are numbers, then checks if first argument is greater than the other them
function GT(a,b) {
    if(isNotNumber(a) || isNotNumber(b)){
        return '#ERROR: type does not match'
    } else return (a > b ? true : false)
}

//checks if all arguments are of the same type, then equates their value them
function EQ(a,b) {
    if(typeof a === typeof b){
        return (a == b ? true : false)
    } else '#ERROR: type does not match'
}

//checks if argument is a boolean, then reverses it
function NOT(a) {
    if(typeof a == "boolean"){
        return !a
    } else return '#ERROR: type does not match'
}

//checks if all arguments are booleans, then runs the AND operator on them
function AND(...args) {
    return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
        return acc && cur
    }))
}

//checks if all arguments are booleans, then runs the OR operator on them
function OR(...args) {
    return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
        return acc || cur
    }))
}

//IF statement. Returns error if condition is not a truthy or a falsy
function IF(condition, arg1, arg2) {
    if(condition) {
        return arg1
    } else if(!condition) return arg2
    else return '#ERROR: type does not match'
}

//checks if all arguments are strings, then concacts them
function CONCAT(...args) {
    return (args.some(isNotString) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
        return acc.concat(cur)
    }))
}


describe('function tests', () => {

    it('isNotNumber() return true when anything but a number is provided', () => {
        expect(isNotNumber([])).toBe(true)
        expect(isNotNumber({})).toBe(true)
        expect(isNotNumber(true)).toBe(true)
        expect(isNotNumber(NaN)).toBe(true)
        expect(isNotNumber("")).toBe(true)
        expect(isNotNumber("80")).toBe(true)
        expect(isNotNumber(25)).toBe(false)
    })


    it('isNotString() returns true when anything but a string is provided', () => {
        expect(isNotString([])).toBe(true)
        expect(isNotString({})).toBe(true)
        expect(isNotString(1)).toBe(true)
        expect(isNotString(NaN)).toBe(true)
        expect(isNotString("")).toBe(false)
        expect(isNotString('')).toBe(false)
        expect(isNotString(``)).toBe(false)
    })

    it('isNotBoolean() returns true when anything but a boolean is provided', () => {
        expect(isNotBoolean([])).toBe(true)
        expect(isNotBoolean({})).toBe(true)
        expect(isNotBoolean(20)).toBe(true)
        expect(isNotBoolean("true")).toBe(true)
        expect(isNotBoolean("false")).toBe(true)
        expect(isNotBoolean(true)).toBe(false)
        expect(isNotBoolean(1)).toBe(true)
    })

    it('MULTIPLY() only multiplies numbers', () => {

        expect(MULTIPLY(5, 5, 'a')).toBe('#ERROR: type does not match')
        expect(MULTIPLY(5, 5, NaN)).toBe('#ERROR: type does not match')
        expect(MULTIPLY(5, 5, 5)).toBe(125)
        expect(MULTIPLY(5, 5, [5, 8])).toBe('#ERROR: type does not match')
        expect(MULTIPLY(5, 5, true)).toBe('#ERROR: type does not match')
        expect(MULTIPLY(5, 5, false)).toBe('#ERROR: type does not match')

    })

    //DIVIDE() is basically the same as the fucntions mentioned above therefore no point in testing

    it.todo('GT() throws error if anything but a number is provided as argument. Correctly returns greater number')

    it.todo('EQ() throws error if not same type of element used. Correctly returns greater element')

    it.todo('NOT() throws error when anything but a boolean is provided as argument. Correctly reverses boolean')

    it.todo('AND() correctly throws an error when not a boolean is provided as argument. Correctly applies the AND operator')
    
    it.todo('OR() correctly throws an error when not a boolean is provided as argument. Correctly applies the OR operator')

    it.todo('IF() returns error if boolean is not used. Correctly returns arg1 if true, arg2 if false')

    it.todo('CONCAT() returns error if anything but a string is used. Correctly concats the strings')


})