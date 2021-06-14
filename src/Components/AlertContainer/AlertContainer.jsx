import { useEffect, useState } from "react";
import { checkIfAlertConditionIsTrue, createAlertObject, getNextAlertType } from "../../Utils/AlertingUtils";
import CardHOC from "../Card/Card";
import style from "./AlertContainer.css";
import {
  BELOW_CONDITION_KEY,
  ABOVE_CONDITION_KEY,
  THRESHOLD_DEFAULT,
  SAMPLING_RATE,
  ALERT_WINDOW_DEFAULT,
} from "../../Constants/Constants";
import AlertTable from "../AlertTable/AlertTable";

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
  useEffect(() => {
    const newAlert = getNextAlertType(alertState)
    const alertConditionMet = checkIfAlertConditionIsTrue(
      chartData,
      newAlert,
      threshold,
      timeWindow / samplingRate
    );
    console.log(alertConditionMet, "<-----------------alertConditionMet", alert);
    if (alertConditionMet) {
      var notificationText =  `Load Time Went ${newAlert} the threshold of ${threshold}`
      var notification = new Notification("Load Time Alert", { body: notificationText });
      alertState.push(createAlertObject(newAlert, threshold, timeWindow));
      setalertState(alertState.slice());
    }
  }, [chartData, threshold, timeWindow, samplingRate, alertState]); // MAybe this isn't correct
  useEffect(() => {
    if(typeof Notification !== 'undefined'){
      Notification.requestPermission().then(function (result) {
        console.log(result);
      });
    }

  }, []);
  const {alert:lastAlert = '' } = alertState[alertState.length-1] || '';
  const [aboveArray, belowArray] = splitAlertArray(alertState)
  return (
    <div className={className}>
      <div className={style["list-container"]}>
        <AlertTableCard
        lastAlert={lastAlert === ABOVE_CONDITION_KEY}
          alertData={aboveArray}
          alertType={ABOVE_CONDITION_KEY}
          infoText={'This shows the list of alerts made in the past and which alerts are currently on going'}
        />
      </div>
      <div className={style["list-container"]}>
        <AlertTableCard
         lastAlert={BELOW_CONDITION_KEY === lastAlert}
          alertData={belowArray}
          alertType={BELOW_CONDITION_KEY}
          infoText={'This shows the list of alerts made in the past and which alerts are currently on going'}
        />
      </div>
    </div>
  );
}

function splitAlertArray(alertArray) {
    const [aboveArray, belowArray] =                            
    alertArray.reduce((result, element) => {
      result[element.alert === ABOVE_CONDITION_KEY ? 0 : 1].push(element);
      return result;
    },
    [[], []]);  
    return [aboveArray, belowArray];
}