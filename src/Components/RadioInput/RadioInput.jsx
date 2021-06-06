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
      <label className={"radioLableStyle"}>
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

  const invalidText = isInvalid ? `Please Select a ${label}` : null;
  return <div className={'radioContainer'}>
    <label className={"lableStyle"}>{label}</label>
    <div>{radioElementArray}</div>
    <span className={'invalidText'}>{invalidText}</span>
    </div>;
};

export default Input;
