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
    console.log(isInvalid,'<-----------------isInvalid')
  const invalidClassName = isInvalid ? 'invalidSelect' : '';
  let selectClass = 'selectClass '+invalidClassName
  const invalidText = isInvalid ? `Please Select ${label}` : null;
  return (
    <div className={'inputWrapper'}>
      <label className={'lableStyle'}>{label}</label>
      <select
        className={selectClass}
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
