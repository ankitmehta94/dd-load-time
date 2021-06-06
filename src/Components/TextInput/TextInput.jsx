
import './TextInput.css'
export const Input = ({
  label,
  onChange,
  required,
  inputValue,
  isInvalid,
  placeholder,
  disabled,
  type = 'text'
}) => {
  const invalidClassName = isInvalid ? ' invalidInput' : '';
  const invalidText = isInvalid ? 'Invalid Format' : null;
  return (
    <div className={'inputWrapper'}>
      <label className={'lableStyle'}>{label}</label>
      <input
        className={'styledInput' + invalidClassName}
        value={inputValue}
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        type={type}
      />
      <span className={'invalidText'}>{invalidText}</span>
    </div>
  );
};

export default Input
