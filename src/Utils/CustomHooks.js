import React, { createContext, useState, useContext, useEffect } from "react";



const FormContext  = createContext({getFormState: () => {}, setFormInputValue: () => {}});
export const FormProvider = ({initialState,initialValidity,children}) => {
    const [state, setState] = useState(initialState);
    const [valid, setValid] = useState(initialValidity);
    const setFormInputValid = (validityObject) => {
        setValid({...valid,...validityObject})
    }
    useEffect(() => {
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