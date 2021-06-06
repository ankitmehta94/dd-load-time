import './SelectInput.css'
export const Input = ({
  label,
  onChange,
  required,
  inputValue,
  isInvalid,
  placeholder,
  disabled,
  optionArray = [],
}) => {
    const optionElementArray = optionArray.map((opt,i) => {
        return (<option key={`opt-${i}`} value={opt.value}  >{opt.name}</option>)
    })

  const invalidClassName = isInvalid ? ' invalidInput' : '';
  const invalidText = isInvalid ? 'Invalid Format' : null;
  return (
    <div className={'inputWrapper'}>
      <label className={'lableStyle'}>{label}</label>
      <select
        value={inputValue}
        onChange={e => onChange(e.target.value)} 
        disabled={disabled}
      >
          <option value={''}  >{placeholder}</option>
          {optionElementArray}
        </select>
      <span className={'invalidText'}>{invalidText}</span>
    </div>
  );
};

export default Input
