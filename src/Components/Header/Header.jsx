import  Range  from "../material_range/Range";
import style from "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { Grid } from "@material-ui/core";
export default function Header({threshold, setthreshold,timeWindow, settimeWindow }) {
    return (
        <div className={style['header']}>
        <Grid sm="4">
            <div className={style['logoContainer']}>
            <FontAwesomeIcon size="lg" icon={faDog} className={style['logo']} /> 
            <div className={style['logoText']}>PUPINFO</div>
            </div>
        </Grid>
        <Grid sm="8">
            <div className={style['control-panel']}>
               <Range label={"Threshold"} value={threshold} setvalue={setthreshold} min={0.1} max={1.2} step={0.1}/>
               <Range label={"Alert Window (s)"} value={timeWindow} setvalue={settimeWindow} min={30} max={120} step={10} />
            </div>
        </Grid>
        </div>
    )
}