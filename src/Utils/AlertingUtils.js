import { ABOVE_CONDITION_KEY, BELOW_CONDITION_KEY } from "../Constants/Constants";

const eventDict = {
  [ABOVE_CONDITION_KEY]: { conditionFunction: (t) => (val, index) => {
    console.log(val.y , t,'<-----------------val.y < t',ABOVE_CONDITION_KEY)
    return val.y > t
  } },
  [BELOW_CONDITION_KEY]: { conditionFunction: (t) => (val, index) => {
    console.log(val.y , t,'<-----------------val.y > t',BELOW_CONDITION_KEY)
    return val.y < t
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
  console.log(condFunc, threshold)
  return checkArray.every(condFunc);
}
