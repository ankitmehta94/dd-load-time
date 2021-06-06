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
const formStates = [
  { title: "Identity", index: 1, validation:{[NAME_KEY]: () => true, [EMAIL_KEY]: () => true}, component: Identity },
  { title: "Details", index: 2, validation:{[AGE_KEY]: validateAge, [GENDER_KEY]: validateGender}, component: Description },
  { title: "Favorites", index: 3, validation:{[COLOR_KEY]: validateColors, [BOOK_KEY]: validateBooks}, component: Favourites},
  { title: "Summary", index: 4, validation:{NAME_KEY: () => true, EMAIL_KEY: () => true} , component: Summary },
];
const {formState = FORM_INITIAL_STATE, index = 0} = LocalStorage.get('surveyData') || {}
const formStateLength = formStates.length;
const SurveyContainer = ({ closeModal }) => {
  const [formPart, setformPart] = useState(formStates[index]);
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
          <LeftButton index={formPart.index} setformPart={setformPart} />
          <RightButton index={formPart.index} setformPart={setformPart} />
        </div>
      </div>
    </FormProvider>
  );
};
const RightButton = ({ setformPart, index }) => {
  const { getFormState, setFormInputValid } = useFormContext();
  const nextState = () => {
    const formState = getFormState();
    const validity = returnIfValid(formStates[index-1].validation,formState)
    console.log(formState,'<-----------------formState')
    if(validity === true){
      LocalStorage.set("surveyData", {formState,index});
      setformPart(formStates[index]);
    }else{
      console.log(validity,'<-----------------validity')
      setFormInputValid(validity)
    }
    
  };
  if (index === formStateLength) {
    return <button className={'ctaButton'} onClick={() => console.log("Submitted")}>Submit</button>;
  } else {
    return <button className={'ctaButton'} onClick={nextState}>Next</button>;
  }
};
const LeftButton = ({ setformPart, index }) => {
  const prevState = () => {
    const surveyData = LocalStorage.get("surveyData");
    surveyData.index = index - 2
    LocalStorage.set("surveyData", surveyData);
    setformPart(formStates[index - 2]);
  };
  if (index === 1) {
    return <div></div>;
  } else {
    return <button className={'ctaButton'} onClick={prevState}>Previous</button>;
  }
};

export default SurveyContainer;
