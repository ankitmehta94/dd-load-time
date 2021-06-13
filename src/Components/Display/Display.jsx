import style from "./Display.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import InfoIcon from "../InfoIcon/InfoIcon";

const DECIMAL_PLACES = 1000;
export default function Display({chartData}) {
    const datalen = chartData.length
    const {x = 0,y = 0} = chartData[datalen-1] || {}
    const avgVal = chartData.reduce((a,cv) => cv.y+a,0)/datalen
    const color  = avgVal>y?'green':'red'
    return (
        <div className={style['display']} style={{backgroundColor:color}}>
            <InfoIcon />
           <div className={style['valueContainer']}><span style={{color:'white'}}>{roundUp(y)}</span></div>
           <div className={style['arrowContainer']}><DisplayArrow direction={color} /></div>
        </div>
    )
}
function DisplayArrow({direction}) {
    if(direction !== "green"){
        return <FontAwesomeIcon size="lg" icon={faArrowUp} 
         style={{color:'white'       }}/>
    
        }
    else{
        return <FontAwesomeIcon size="lg" icon={faArrowDown} 
         style={{color:'white'
        }}/>
    
        }
}
function roundUp(x) {
    return Math.round(x*DECIMAL_PLACES)/DECIMAL_PLACES
}