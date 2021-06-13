import  Range  from "../Range/Range";
import style from "./Header.css";
import Logo from "../../Assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
export default function Header({threshold, setthreshold,timeWindow, settimeWindow }) {
    return (
        <div className={style['header']}>
            <div className={style['logoContainer']}>
            <FontAwesomeIcon size="lg" icon={faDog} className={style['logo']} /> 
            </div>
            <div className={style['control-panel']}>
               <Range label={"Threshold"} value={threshold} setvalue={setthreshold} min={0.1} max={1.2} step={0.1}/>
               <Range label={"Alert Window (s)"} value={timeWindow} setvalue={settimeWindow} min={30} max={120} step={10} />
            </div>
        </div>
    )
}