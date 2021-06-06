import "./RadioInput.css";
export const Input = ({
  label,
  onChange,
  required,
  inputValue,
  isInvalid,
  placeholder,
  disabled,
  radioArray = [],
}) => {
  const radioElementArray = radioArray.map((rad, i) => {
    return (
      <label className={"lableStyle"}>
        {rad.name}
        <input
          type={"radio"}
          value={rad.value}
          checked={inputValue === rad.value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  });

  const invalidClassName = isInvalid ? " invalidInput" : "";
  const invalidText = isInvalid ? "Invalid Format" : null;
  return <div className={'radioContainer'}>{radioElementArray}</div>;
};

export default Input;
