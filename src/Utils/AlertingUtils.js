import { ABOVE_CONDITION_KEY, BELOW_CONDITION_KEY } from "../constants/Constants";

export const eventDict = {
  [ABOVE_CONDITION_KEY]: { conditionFunction: (t) => (val, index) => {
    return val.loadTime > t
  } },
  [BELOW_CONDITION_KEY]: { conditionFunction: (t) => (val, index) => {
    return val.loadTime < t
  } },
};

export function checkIfAlertConditionIsTrue(
  chartData,
  conditionType,
  threshold,
  limit
) {
  const datalen = chartData.length;
  if(datalen < limit){
    return false
  }
  const lastIndex = datalen - 1;
  const firstIndex = lastIndex - limit + 1;
  const checkArray = [...chartData].slice(firstIndex, lastIndex);
  const condFunc = eventDict[conditionType].conditionFunction(threshold)
  return checkArray.every(condFunc);
}

export function getNextAlertType(alertData) {
  const alertLen = alertData.length;
  const { alert = ABOVE_CONDITION_KEY } = alertData[alertLen - 1] || {};
  const newAlert =
    alert === ABOVE_CONDITION_KEY ? BELOW_CONDITION_KEY : ABOVE_CONDITION_KEY;
  return newAlert
}
export function createAlertObject(newAlert,threshold, timeWindow){
  return {
    alert: newAlert,
    time: new Date().getTime(),
    threshold: threshold,
    timeWindow:timeWindow
  }
}