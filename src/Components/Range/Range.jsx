import style from './Range.css'

export default  function Range({setvalue, value, label, min, max, step, disabled, width = false}) {
    const rangeStyle  = width ? {'width': width}: {}
    return ( <div className={style['rangeContainer']} style={rangeStyle}>
    <label >{label}: {value}</label>
    <input className={style['range-input']} type="range" min={min} max={max} disabled={disabled} step={step} value={value} onChange={(e) => setvalue(e.target.value)}/>
    <div className={style['range-min-max']}>
        <span>{min}</span>
        <span>{max}</span>
    </div>
    </div>)
}

