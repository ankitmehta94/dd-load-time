import React, { useReducer, createContext, useState, useContext, useEffect } from "react";
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