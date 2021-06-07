export const NAME_KEY = 'name';
export const EMAIL_KEY = 'email';
export const GENDER_KEY = 'gender';
export const AGE_KEY = 'age';
export const COLOR_KEY = 'color';
export const BOOK_KEY = 'book';
export const FORM_INITIAL_STATE = {
    [NAME_KEY]: '',
    [EMAIL_KEY]: '',
    [GENDER_KEY]: '',
    [AGE_KEY]: '',
    [COLOR_KEY]: [],
    [BOOK_KEY]: '',
}
export const FORM_INITIAL_VALIDATION = {
    [NAME_KEY]: null,
    [EMAIL_KEY]: null,
    [GENDER_KEY]: null,
    [AGE_KEY]: null,
    [COLOR_KEY]: null,
    [BOOK_KEY]: null,
}
export const HUMAN_AGE_RANGE = 150;
export const getAgeOptionList = () => {
    const ageArray = []
    for (let index = 0; index <= HUMAN_AGE_RANGE; index++) {        
        ageArray.push({value:index,name:index})
    }
    return ageArray
}

export const radioOptionsArray = [{name:'Male',value:'male'},{name:'Female',value:'female'}]
export const summaryViewOptionsArray = [{name:'Table View',value:'table'},{name:'Form View',value:'form'}]
export const COLOR_ARRAY = [
    "Blue ",
    "Green",
    "Red",
    "Orange",
    "Violet",
    "Indigo",
    "Yellow ",
    "Black",
    "Bown",
    "Lavender",
    "Magenta",
    "Pink",
    "Gold",
    "Beige",
    "Aqua",
  ];