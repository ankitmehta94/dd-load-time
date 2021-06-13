import style from "./Content.css";
import Chart from "../Chart/Chart";
import Card from "../Card/Card";
import Display from "../Display/Display";
import { useSocketHook } from "../../Utils/SocketHooks";
import { useEffect,useState } from "react";
import AlertContainer from "../AlertContainer/AlertContainer";
import { TIME_RANGE_MAX, SAMPLING_RATE, SOCKET_ENDPOINT } from '../../Constants/Constants';


const MainChart = Card(Chart);
const MainDisplay = Card(Display)

function prettyDate2(time) {
    var date = new Date(parseInt(time));
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit',
      second:'2-digit',
    });
  }


const chartDataFormater = (data)=> { return  {x: prettyDate2(data[0]), y: data[1]} }
export default function Content({threshold, timeWindow}) {
    const [getResponse, setResponse] = useSocketHook(SOCKET_ENDPOINT,"FromAPI",TIME_RANGE_MAX/SAMPLING_RATE,SAMPLING_RATE,chartDataFormater)
    const response = getResponse();
    return (
        <div className={style['content']}>
           <div className={style['upper-div']}>
               <div className={style['chart-container']}>
                <MainChart chartData={response} threshold={threshold} samplingRate={SAMPLING_RATE} timeWindow={timeWindow} />
               </div>
               <div className={style['display-container']}>
                   <MainDisplay chartData={response} />
               </div>
           </div>
               <AlertContainer className={style['lower-div']} chartData={response}  threshold={threshold} timeWindow={timeWindow} samplingRate={SAMPLING_RATE} />
        </div>
    )
}