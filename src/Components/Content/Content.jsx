import style from "./Content.css";
import Chart from "../Chart/Chart";
import Card from "../Card/Card";
import Display from "../dumb_components/display/Display";
import { useSocketHook } from "../../utils/SocketHooks";
import { useEffect,useState } from "react";
import AlertContainer from "../AlertContainer/AlertContainer";
import { TIME_RANGE_MAX, SAMPLING_RATE, SOCKET_ENDPOINT } from '../../constants/Constants';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height:'100%'
    },
    mainChart:{
        height:'42vh'
    },
    display:{
        height:'42vh'
    },
    alertContainer:{
        height:'40vh'
    }
  }));
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


const chartDataFormater = (data)=> { return  {time: prettyDate2(data[0]), loadTime: data[1]} }
export default function Content({threshold, timeWindow}) {
    const [getResponse, setResponse] = useSocketHook({endpoint:SOCKET_ENDPOINT, messageKey: "FromAPI", storageLimit:60,samplingRate:SAMPLING_RATE, dataFormatter:chartDataFormater})
    const response = getResponse();
    const classes = useStyles();
    return (
      <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}  sm={9} className={classes.mainChart}>
      <MainChart  chartData={response} threshold={threshold} samplingRate={SAMPLING_RATE} timeWindow={timeWindow} />
      </Grid>
      <Grid item xs={12}  sm={3} className={classes.display}>
      <MainDisplay  chartData={response}  timeWindow={timeWindow}/>
      </Grid>
      <Grid item xs={12}  sm={12} className={classes.alertContainer}>
      <AlertContainer className={style['lower-div']} chartData={response}  threshold={threshold} timeWindow={timeWindow} samplingRate={SAMPLING_RATE} />
      </Grid>
      </Grid>
    )



    // return (
    //     <div className={style['content']}>
    //        <div className={style['upper-div']}>
    //            <div className={style['chart-container']}>
    //             <MainChart chartData={response} threshold={threshold} samplingRate={SAMPLING_RATE} timeWindow={timeWindow} />
    //            </div>
    //            <div className={style['display-container']}>
    //                <MainDisplay chartData={response} />
    //            </div>
    //        </div>
    //            <AlertContainer className={style['lower-div']} chartData={response}  threshold={threshold} timeWindow={timeWindow} samplingRate={SAMPLING_RATE} />
    //     </div>
    // )
}