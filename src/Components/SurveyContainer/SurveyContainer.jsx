import { useEffect, useState } from "react";
import { useFormContext, FormProvider } from "../../Utils/CustomHooks";
import "./SurveyContainer.css";
import {Identity, Favourites, Description, Summary} from "../FormStateComponent/FormStateComponent";
import { FORM_INITIAL_STATE,  NAME_KEY,
  EMAIL_KEY,
  GENDER_KEY,
  COLOR_KEY,
  AGE_KEY,
  BOOK_KEY, } from "../../Constants/FormConstants";
import  {validateColors,validateBooks,validateGender, validateAge, returnIfValid } from "../../Utils/ValidationUtils";
import LocalStorage from "../../Utils/LocalStorage";

// Form Config which can be used to create different kinds of forms
// each step of the form has its own component
const SURVEY_FORM_CONFIG = [
  { title: "Identity", index: 1, validation:{[NAME_KEY]: () => true, [EMAIL_KEY]: () => true}, component: Identity },
  { title: "Details", index: 2, validation:{[AGE_KEY]: validateAge, [GENDER_KEY]: validateGender}, component: Description },
  { title: "Favorites", index: 3, validation:{[COLOR_KEY]: validateColors, [BOOK_KEY]: validateBooks}, component: Favourites},
  { title: "Summary", index: 4, validation:{NAME_KEY: () => true, EMAIL_KEY: () => true} , component: Summary },
];
// Getting data from localStorage, if data isn't present then we have default values
const {formState = FORM_INITIAL_STATE, index = 0} = LocalStorage.get('surveyData') || {}

const formStateLength = SURVEY_FORM_CONFIG.length;

//Main Form Component which is wrapped by a FormContextProvider 
//which allows using a single state for all values of the form
const SurveyContainer = ({ closeModal }) => {
  // State to keep stack of which Step to display
  const [formPart, setformPart] = useState(SURVEY_FORM_CONFIG[index]);
  const FormComponent = formPart.component
  return (
    <FormProvider initialState={formState}>
      <div className={"mainBody"}>
        <div className={"formHeader"}>
          <h2>
            {formPart.title} (Step {formPart.index} of {formStateLength})
          </h2>
        </div>
        <div className={"formBody"}>
          <FormComponent />
        </div>
        <div className={"formFooter"}>
          <LeftButton index={formPart.index} setformPart={setformPart}  />
          <RightButton index={formPart.index} setformPart={setformPart} closeModal={closeModal} />
        </div>
      </div>
    </FormProvider>
  );
};


const RightButton = ({ setformPart, index, closeModal }) => {
  const [submitText, setsubmitText] = useState('Submit');
  const { getFormState, setFormInputValid } = useFormContext();
  //save values in local storage and move to next step
  const nextState = () => {
    const formState = getFormState();
    const validity = returnIfValid(SURVEY_FORM_CONFIG[index-1].validation,formState)
    if(validity === true){
      LocalStorage.set("surveyData", {formState,index});
      setformPart(SURVEY_FORM_CONFIG[index]);
    }else{
      setFormInputValid(validity)
    }
    
  };
  // change the text on Submit button and close modal after 3 seconds. 
  // It does not save the submitted state because that makes testing this code a longer process
  const onSubmit = () => {
    setsubmitText('Submitting...')
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
  if (index === formStateLength) {
    return <button className={'ctaButton'} onClick={onSubmit}>{submitText}</button>;
  } else {
    return <button className={'ctaButton'} onClick={nextState}>Next</button>;
  }
};
const LeftButton = ({ setformPart, index }) => {
  // move and save previous step 
  const prevState = () => {
    const surveyData = LocalStorage.get("surveyData");
    surveyData.index = index - 2
    LocalStorage.set("surveyData", surveyData);
    setformPart(SURVEY_FORM_CONFIG[index - 2]);
  };
  if (index === 1) {
    return <div></div>;
  } else {
    return <button className={'ctaButton'} onClick={prevState}>Previous</button>;
  }
};

export default SurveyContainer;
