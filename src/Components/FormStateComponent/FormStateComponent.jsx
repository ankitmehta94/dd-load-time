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

// All Steps are made from maintainable compoenents that can be sweitched out and carry no stateful information pertaining the survey

export const Identity = () => {
  const { getFormState, setFormInputValue, getFormValidity } = useFormContext();
  const formState = getFormState();
  const formValidity = getFormValidity();
  return (
    <div className={'stepContainer'}>
      <TextInput
        label={"Name"}
        inputValue={formState[NAME_KEY]}
        onChange={(value) => setFormInputValue(NAME_KEY, value)}
        isInvalid={formValidity[NAME_KEY] === false}
        disabled={false}
        placeholder={"Add Your Name"}
      />
      <TextInput
        label={"Email"}
        inputValue={formState[EMAIL_KEY]}
        onChange={(value) => setFormInputValue(EMAIL_KEY, value)}
        isInvalid={formValidity[EMAIL_KEY] === false}
        disabled={false}
        placeholder={"Add Your Email"}
        type={"email"}
      />
    </div>
  );
};

export const Description = () => {
  const { getFormState, setFormInputValue, getFormValidity } = useFormContext();
  const formState = getFormState();
  const formValidity = getFormValidity();
  const ageOptionArray = getAgeOptionList();
  return (
    <div className={'stepContainer'}>
      <SelectInput
        label={"Age"}
        inputValue={formState[AGE_KEY]}
        onChange={(value) => setFormInputValue(AGE_KEY, value)}
        disabled={false}
        optionArray={ageOptionArray}
        placeholder={"Select Your Age"}
        isInvalid={formValidity[AGE_KEY] === false}
      />
      <RadioInput
        label={'Gender'}
        inputValue={formState[GENDER_KEY]}
        radioArray={radioOptionsArray}
        onChange={(value) => setFormInputValue(GENDER_KEY, value)}
        isInvalid={formValidity[GENDER_KEY] === false}
      />
    </div>
  );
};

export const Favourites = () => {
  const { getFormState, setFormInputValue, getFormValidity } = useFormContext();
  const formState = getFormState();
  const formValidity = getFormValidity();
  return (
    <div className={'stepContainer'}>
      <MultiSelect
      label={'Colors'}
        optionArray={COLOR_ARRAY}
        placeholder={"Select Multiple Colors"}
        setValue={(value) => setFormInputValue(COLOR_KEY, value)}
        defaultValue={formState[COLOR_KEY]}
        isInvalid={formValidity[COLOR_KEY] === false}
      />
      <TextInput
        label={"Favourite Book"}
        inputValue={formState[BOOK_KEY]}
        onChange={(value) => setFormInputValue(BOOK_KEY, value)}
        isInvalid={formValidity[BOOK_KEY] === false}
        disabled={false}
        placeholder={"Add Your Favourite Book"}
      />
    </div>
  );
};
export  const Summary = () => {
  const { getFormState } = useFormContext();
  const formState = getFormState();
  return (
    <div className={'stepContainer summaryContainer'}>
      <div className={'titleContainer'}><h3>Identity</h3></div>
      <div className={'summaryContent'}>
        <div className={'infoLine'}>
          <div className={'infoName'}>Name:</div>
          <div className={'infoValue'}>{formState[NAME_KEY]}</div>
        </div>
        <div className={'infoLine'}>
          <div className={'infoName'}>Email:</div>
          <div className={'infoValue'}>{formState[EMAIL_KEY]}</div>
        </div>
      </div>
      <div className={'titleContainer'}><h3>Description</h3></div>
      <div className={'summaryContent'}>
        <div className={'infoLine'}>
          <div className={'infoName'}>Age:</div>
          <div className={'infoValue'}>{formState[AGE_KEY]}</div>
        </div>
        <div className={'infoLine'}>
          <div className={'infoName'}>Gender:</div>
          <div className={'infoValue'}>{formState[GENDER_KEY]}</div>
        </div>
      </div>
      <div className={'titleContainer'}><h3>Favourites</h3></div>
      <div className={'summaryContent'}>
        <div className={'infoLine'}>
          <div className={'infoName'}>Color:</div>
          <div className={'infoValue'}>{formState[COLOR_KEY]?formState[COLOR_KEY].join(', '):null}</div>
        </div>
        <div className={'infoLine'}>
          <div className={'infoName'}>Favourite Book:</div>
          <div className={'infoValue'}>{formState[BOOK_KEY]}</div>
        </div>
      </div>
    </div>
  )
};

