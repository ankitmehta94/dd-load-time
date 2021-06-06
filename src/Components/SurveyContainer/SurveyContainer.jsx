import { useEffect, useState } from "react";
import { useFormContext, FormProvider } from "../../Utils/CustomHooks";
import "./SurveyContainer.css";
import FormStateComponent from "../FormStateComponent/FormStateComponent";
import { FORM_INITIAL_STATE } from "../../Constants/FormConstants";
import LocalStorage from "../../Utils/LocalStorage";
const formStates = [
  { title: "Identity", index: 1 },
  { title: "Details", index: 2 },
  { title: "Favorites", index: 3 },
  { title: "Summary", index: 4 },
];
const {formState = FORM_INITIAL_STATE, index = 0} = LocalStorage.get('surveyData') || {}
const formStateLength = formStates.length;
const SurveyContainer = ({ closeModal }) => {
  const [formPart, setformPart] = useState(formStates[index]);

  return (
    <FormProvider initialState={formState}>
      <div className={"mainBody"}>
        <div className={"formHeader"}>
          <h2>
            {formPart.title} (Step {formPart.index} of {formStateLength})
          </h2>
        </div>
        <div className={"formBody"}>
          <FormStateComponent index={formPart.index} />
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
  const { getFormState, setFormInputValue } = useFormContext();
  const nextState = () => {
    const formState = getFormState();
    console.log(formState);
    LocalStorage.set("surveyData", {formState,index});
    setformPart(formStates[index]);
  };
  if (index === formStateLength) {
    return <button className={'ctaButton'} onClick={() => console.log("Submitted")}>Submit</button>;
  } else {
    return <button className={'ctaButton'} onClick={nextState}>Next</button>;
  }
};
const LeftButton = ({ setformPart, index }) => {
  const prevState = () => {
    setformPart(formStates[index - 2]);
  };
  if (index === 1) {
    return <div></div>;
  } else {
    return <button className={'ctaButton'} onClick={prevState}>Previous</button>;
  }
};

export default SurveyContainer;
