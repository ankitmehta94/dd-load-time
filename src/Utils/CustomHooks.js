import React, { createContext, useState, useContext, useEffect } from "react";
import { FORM_INITIAL_VALIDATION } from "../Constants/FormConstants";

const FormContext  = createContext({getFormState: () => {}, setFormInputValue: () => {}});
export const FormProvider = ({initialState,children}) => {
    const [state, setState] = useState(initialState);
    const [valid, setValid] = useState(FORM_INITIAL_VALIDATION);
    const setFormInputValid = (validityObject) => {
        console.log(validityObject,'<-----------------validityObject')
        setValid({...valid,...validityObject})
    }
    useEffect(() => {
        console.log(JSON.stringify(valid))
    },[valid])
    const setFormInputValue = (key,value ) => {
        if(!valid[key]){
            setFormInputValid({[key]:true})
        }
        setState({...state,[key]:value})
    }
    const getFormState = () => {
        return state
    }
    const getFormValidity = () => {
        return valid
    }
    const functionObject = {getFormState, setFormInputValue, setFormInputValid, getFormValidity}
    return (
<FormContext.Provider value={functionObject}>
    {children}
</FormContext.Provider>
    )
}
export const useFormContext = () => useContext(FormContext)