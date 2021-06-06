import React, { useReducer, createContext, useState, useContext } from "react";
import { FORM_INITIAL_STATE, FORM_INITIAL_VALIDATION } from "../Constants/FormConstants";
import formReducer from '../Reducer/FormReducer';
import LocalStorage from "./LocalStorage";

export function useFormReducer(){
    const [state, dispatch] = useReducer(formReducer, FORM_INITIAL_STATE);
    return [state, dispatch]
}
export function useInputChange (keyName){
    const [state, dispatch] = useFormReducer();
    function saveValue(value) {
        dispatch({type: 'UPDATE_INPUT', payload: {[keyName]:value}})
    }
    return [state[keyName],saveValue]
}
const FormContext  = createContext({getFormState: () => {}, setFormInputValue: () => {}});
export const FormProvider = ({initialState,children}) => {
    console.log(initialState,'<-----------------next')
    const [state, setState] = useState(initialState);
    const [valid, setValid] = useState(FORM_INITIAL_VALIDATION);
    const setFormInputValue = (key,value ) => {
        setState({...state,[key]:value})
    }
    const setFormInputValid = (key,value ) => {
        setValid({...valid,[key]:value})
    }
    const getFormState = () => {
        return state
    }
    const getFormValidity = () => {
        return valid
    }
    return (
<FormContext.Provider value={{getFormState, setFormInputValue, setFormInputValid, getFormValidity}}>
    {children}
</FormContext.Provider>
    )
}
export const useFormContext = () => useContext(FormContext)