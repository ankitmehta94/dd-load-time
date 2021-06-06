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
    if(typeof (value) === 'number'){
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
    const allOrNothing = Object.keys(validationObject).every((k) => {
        return validationObject[k]
    })
    if(allOrNothing){
        return true;
    }
    return Validity
}