import style from './Range.css'
import { Grid, Slider } from "@material-ui/core";
import { Typography } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
      minWidth: 200,
      color:'#632CA6'
    },
  });

export default  function Range({setvalue, value, label, min, max, step, disabled, width = false, stepLabelFormater=(d=>d)}) {
    const rangeStyle  = width ? {'width': width}: {}
    const classes = useStyles();
    const marks = [
        {
            value:min,
            label: stepLabelFormater(min)
        },{
            value:max,
            label: stepLabelFormater(max)
        }
    ];
    return (
        <div className={style['rangeContainer']}>
          <label >{label}</label>
      <Slider
        classes={classes}
        defaultValue={value}
        value={value}
        onChange={(e,v) => setvalue(v)}
        getAriaValueText={stepLabelFormater}
        aria-labelledby="discrete-slider-always"
        step={step}
        max={max}
        min={min}
        marks={marks}
        valueLabelDisplay="auto"
      />
      </div>
    )

}