export function validateColors(value) {
    if(Array.isArray(value) && value.length){
        return true;
    }
    return false
}
export function validateBooks(value) {
    if(typeof (value) === 'string' && value.length){
        return true;
    }
    return false
}
export function validateGender(value) {
    if(typeof (value) === 'string' && value.length){
        return true;
    }
    return false
}
export function validateAge(value) {
    if(value !== "" && !Number.isNaN(Number(value))){
        return true;
    }
    return false
}
export function returnIfValid(validationObject, data) {
    let Validity = {}
    Object.keys(validationObject).forEach((key, index) => {
        const vfn = validationObject[key];
        Validity[key] = vfn(data[key]);
    })
    const allOrNothing = Object.keys(Validity).every((k) => {
        return Validity[k] === true
    })
    if(allOrNothing){
        return true;
    }
    return Validity
}