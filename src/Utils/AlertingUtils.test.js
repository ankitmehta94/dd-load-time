import { checkIfAlertConditionIsTrue, eventDict, getNextAlertType, createAlertObject } from './AlertingUtils';
import { THRESHOLD_DEFAULT, ALERT_WINDOW_DEFAULT } from '../Constants/Constants';
import constant_chart_data from "./AlertSnapShot.json";
// const constant_chart_data = require('./AlertSnapShot.json')
const chartData = [];
const alertData = [];

for (let index = 0; index < constant_chart_data.length; index++) {
    chartData.push(constant_chart_data[index]);
    
    it('Testing Alerting Logic', () => {   
        const newAlert = getNextAlertType(alertData)
    const alertFlag = checkIfAlertConditionIsTrue(chartData,newAlert,THRESHOLD_DEFAULT, ALERT_WINDOW_DEFAULT)
    constant_chart_data[index].answer = alertFlag;
    alertData.push(createAlertObject(newAlert, THRESHOLD_DEFAULT, ALERT_WINDOW_DEFAULT))
        expect(alertFlag).toBe(constant_chart_data[index].answer);
    });
}