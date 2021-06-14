import style from "./Display.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import InfoIcon from "../info_icon/InfoIcon";
import { Grid } from "@material-ui/core";


const DECIMAL_PLACES = 1000;
export default function Display({chartData, timeWindow}) {
    const datalen = chartData.length
    const {loadTime = 0,time = 0} = chartData[datalen-1] || {}
    const avgVal = chartData.reduce((a,cv) => cv.loadTime+a,0)/datalen
    const color  = avgVal>loadTime?'green':'red'
    return (
             <Grid container className={style['display']} xs={12} style={{backgroundColor:color}}>
            <InfoIcon infoText={"This displays the lastest load time recieved and the arrows are indicating if the current loadtime is less or more than the average loadTime"} color={'white'} />
             <div className={style['valueContainer']}><span >{roundUp(loadTime)}</span></div>
           <div className={style['arrowContainer']}><DisplayArrow direction={color} /></div>
             </Grid>
          
    )
}
function DisplayArrow({direction}) {
    if(direction !== "green"){
        return <FontAwesomeIcon size="lg" icon={faArrowUp} 
         />
    
        }
    else{
        return <FontAwesomeIcon size="lg" icon={faArrowDown} 
         />
    
        }
}
function roundUp(x) {
    return Math.round(x*DECIMAL_PLACES)/DECIMAL_PLACES
}