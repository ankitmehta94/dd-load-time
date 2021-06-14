import { useEffect, useState } from "react";
import { prettyTime,prettyTimeWindow } from "../../Utils/DateUtils";
import { checkIfAlertConditionIsTrue } from "../../Utils/AlertingUtils";
import CardHOC from "../Card/Card";
import style from "./AlertContainer.css";
import {
  BELOW_CONDITION_KEY,
  ABOVE_CONDITION_KEY,
  THRESHOLD_DEFAULT,
  SAMPLING_RATE,
  ALERT_WINDOW_DEFAULT,
} from "../../Constants/Constants";
import debounce from "../../Utils/Debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faClock, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'

export const AlertContainerDefaultProps = {
chartData: [],
  className : '',
  threshold : THRESHOLD_DEFAULT,
  timeWindow: ALERT_WINDOW_DEFAULT,
  samplingRate: SAMPLING_RATE,
}
const AlertTableCard = CardHOC(AlertTable);
export default function AlertContainer({
  chartData,
  className,
  threshold,
  timeWindow,
  samplingRate,
}) {
  const [alertState, setalertState] = useState([]);
  const [tChangeArray, setChangeArray] = useState([]);
  console.log(tChangeArray, "<-----------------tChangeArray");
  const debouncedSetState = debounce(setChangeArray, 2000);
  useEffect(() => {
    const datalen = chartData.length;
    const alertLen = alertState.length;
    const { y } = chartData[datalen - 1] || {};// TODO: change y to make sense 
    const { alert = ABOVE_CONDITION_KEY } = alertState[alertLen - 1] || {};
    console.log(alert, "<-----------------alert");
    const newAlert =
      alert === ABOVE_CONDITION_KEY ? BELOW_CONDITION_KEY : ABOVE_CONDITION_KEY;
    const flag = checkIfAlertConditionIsTrue(
      chartData,
      newAlert,
      threshold,
      timeWindow / samplingRate
    );// TODO: change flag to make sense 
    console.log(flag, "<-----------------flag", alert);
    if (flag) {
      var text = 'HEY! Your task "' + newAlert + '" is now overdue.';// TODO: change text to make sense 
      var notification = new Notification("To do list", { body: text });
      alertState.push({
        alert: newAlert,
        time: new Date().getTime(),
        threshold: threshold,
        timeWindow:timeWindow
      });
      setalertState(alertState.slice());
    }
  }, [chartData, threshold, timeWindow, samplingRate, alertState]); // MAybe this isn't correct
  useEffect(() => {
    Notification.requestPermission().then(function (result) {
      console.log(result);
    });
  }, []);
  // useEffect(() => {
  //     console.log(tChangeArray,'<-----------------tChangeArrayhgyhjghvubhjgv')
  //     const newArray = tChangeArray.slice()
  //     setChangeArray(newArray.push({threshold:threshold, time:(new Date().getTime())}))
  // },[threshold])
  const {alert:lastAlert = '' } = alertState[alertState.length-1] || '';
  const [aboveArray, belowArray] = splitAlertArray(alertState)
  return (
    <div className={className}>
      <div className={style["list-container"]}>
        <AlertTableCard
        lastAlert={lastAlert === ABOVE_CONDITION_KEY}
          alertData={aboveArray}
          thresholdArray={tChangeArray}
          alertType={ABOVE_CONDITION_KEY}
        />
      </div>
      <div className={style["list-container"]}>
        <AlertTableCard
         lastAlert={BELOW_CONDITION_KEY === lastAlert}
          alertData={belowArray}
          thresholdArray={tChangeArray}
          alertType={BELOW_CONDITION_KEY}
        />
      </div>
    </div>
  );
}
function alertToText(alert) {
    return alert === ABOVE_CONDITION_KEY?'Danger':'Recovered'
}
function AlertTable({ alertData, alertType, lastAlert }) {
    const alertLen = alertData.length
  const alertHtml = alertData
    .map((x, i) => {
    let containerClass = style['alert'] + ' ' + (alertType === ABOVE_CONDITION_KEY ?style['red-alert']: style['green-alert'])
    if(alertLen - 1 === i && lastAlert){
        containerClass += ' ' + style['alert-pulse']
    }
      return (
        <tr className={containerClass}>
          <td >{alertToText(x.alert)}</td>
          <td> <FontAwesomeIcon size="lg" icon={faStopwatch} /> {prettyTimeWindow(x.timeWindow)} </td>
          <td> <FontAwesomeIcon size="lg" icon={faClock} />&nbsp;{prettyTime(x.time)}</td>
          <td> <FontAwesomeIcon size="lg" icon={faLevelUpAlt} />&nbsp;{x.threshold}</td>
        </tr>
      );
    })
    .reverse();
  return (
    <table className={style['alert-table']}>
        <tr className={style['alert-table-header']} >
            <th>Alert Type</th>
            <th>Alert Window</th>
            <th>Alert Time</th>
            <th>Threshold</th>
           
        </tr>
        <tbody className={style['alert-table-list']}>{alertHtml}</tbody>
    </table>
  );
}
function splitAlertArray(alertArray) {
    const [aboveArray, belowArray] =                             // Use "deconstruction" style assignment
    alertArray.reduce((result, element) => {
      result[element.alert === ABOVE_CONDITION_KEY ? 0 : 1].push(element); // Determine and push to small/large arr
      return result;
    },
    [[], []]);  
    return [aboveArray, belowArray];
}