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
    if(!Number.isNaN(Number(value))){
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
    console.log(Validity,'<-----------------Validity')
    const allOrNothing = Object.keys(Validity).every((k) => {
        return Validity[k] === true
    })
    console.log(allOrNothing,'<-----------------allOrNothing')
    if(allOrNothing){
        return true;
    }
    return Validity
}