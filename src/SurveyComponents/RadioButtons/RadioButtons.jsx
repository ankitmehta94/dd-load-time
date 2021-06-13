import style from "./RadioButtons.css";
import { TIME_RANGE_OPTIONS } from '../../Constants/Constants';
export const Input = ({
  label,
  setValue,
  required,
  inputValue,
  isInvalid,
  placeholder,
  disabled,
  radioArray = [],
}) => {
  console.log(radioArray,'<-----------------radioArray')
  const radioElementArray = radioArray.map((rad, i) => {
    const  { value, disabled, checked, label } = rad;
    return (
      <>
        <input
          type="radio"
          id={`radio-${i}`}
          name={`switch-${i}`}
          value={value}
          checked={checked}
          disabled={disabled}
        />
        <label onClick={() => setValue(radioArray, i)} for={`radio-${i}`} className={disabled?style["label-disabled"]:''}>{label}</label>
      </>
    );
  });

  const invalidText = isInvalid ? `Please Select a ${label}` : null;
  return (
    <div className={style["radioContainer"]}>
      <label className={style["lableStyle"]}>{label}</label>
      <div className={style["switch-field"]}>{radioElementArray}</div>
      <span className={style["invalidText"]}>{invalidText}</span>
    </div>
  );
};

export default Input;
