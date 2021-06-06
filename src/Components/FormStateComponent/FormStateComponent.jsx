import { useState } from "react";
import "./FormStateComponent.css";
import TextInput from "../TextInput/TextInput";
import SelectInput from "../SelectInput/SelectInput";
import RadioInput from "../RadioInput/RadioInput";
import MultiSelect from "../MultiSelect/MultiSelect";
import {
  NAME_KEY,
  EMAIL_KEY,
  GENDER_KEY,
  COLOR_KEY,
  AGE_KEY,
  BOOK_KEY,
  getAgeOptionList,
  radioOptionsArray,
  COLOR_ARRAY,
} from "../../Constants/FormConstants";
import { useFormContext } from "../../Utils/CustomHooks";
const Identity = () => {
  const { getFormState, setFormInputValue } = useFormContext();
  const formState = getFormState();
  return (
    <div className={'stepContainer'}>
      <TextInput
        label={"Name"}
        inputValue={formState[NAME_KEY]}
        onChange={(value) => setFormInputValue(NAME_KEY, value)}
        isInvalid={false}
        disabled={false}
        placeholder={"Add Your Name"}
      />
      <TextInput
        label={"Email"}
        inputValue={formState[EMAIL_KEY]}
        onChange={(value) => setFormInputValue(EMAIL_KEY, value)}
        isInvalid={false}
        disabled={false}
        placeholder={"Add Your Email"}
        type={"email"}
      />
    </div>
  );
};

const Description = () => {
  const { getFormState, setFormInputValue } = useFormContext();
  const formState = getFormState();
  const ageOptionArray = getAgeOptionList();

  return (
    <div className={'stepContainer'}>
      <SelectInput
        label={"Birth Year"}
        inputValue={formState[AGE_KEY]}
        onChange={(value) => setFormInputValue(AGE_KEY, value)}
        isInvalid={false}
        disabled={false}
        optionArray={ageOptionArray}
        placeholder={"Select Your Age"}
      />
      <RadioInput
        inputValue={formState[GENDER_KEY]}
        radioArray={radioOptionsArray}
        onChange={(value) => setFormInputValue(GENDER_KEY, value)}
      />
    </div>
  );
};

const Favourites = () => {
  const { getFormState, setFormInputValue } = useFormContext();
  const formState = getFormState();
  return (
    <div className={'stepContainer'}>
      <MultiSelect
      label={'Colors'}
        optionArray={COLOR_ARRAY}
        placeholder={"SELECT MULTIPLE COLORS"}
        setValue={(value) => setFormInputValue(COLOR_KEY, value)}
        defaultValue={formState[COLOR_KEY]}
      />
      <TextInput
        label={"Favourite Book"}
        inputValue={formState[BOOK_KEY]}
        onChange={(value) => setFormInputValue(BOOK_KEY, value)}
        isInvalid={false}
        disabled={false}
        placeholder={"Add Your Favourite Book"}
      />
    </div>
  );
};
const Summary = () => <h2>Summary</h2>;

const formDict = {
  1: Identity,
  2: Description,
  3: Favourites,
  4: Summary,
};

const FormStateComponent = ({ index }) => {
  const MainComponent = formDict[index];
  return <MainComponent />;
};
export default FormStateComponent;
