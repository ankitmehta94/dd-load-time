import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  TIME_RANGE_MIN,
  TIME_RANGE_STEP,
  TIME_RANGE_OPTIONS,
} from "../../Constants/Constants";
import RadioButtons from "../../SurveyComponents/RadioButtons/RadioButtons";
import style from "./Charts.css";
import Range from "../MaterialRange/Range";
import { Grid, CardHeader, CircularProgress } from "@material-ui/core";
import InfoIcon from "../InfoIcon/InfoIcon";

function Chart({ chartData = [{}], threshold, samplingRate, timeWindow }) {
  const [xWindow, setxWindow] = useState(30);
  // const [radioOpt, setradioOpt] = useState(TIME_RANGE_OPTIONS);
  let transformedChartData = null;
  const xValue = xWindow / samplingRate;
  const datalen = chartData.length;
  const lastIndex = datalen - 1;
  useEffect(() => {
    // setradioOpt(parseRadioOptions(TIME_RANGE_OPTIONS,datalen,samplingRate))
    setxWindow(datalen * samplingRate);
  }, [datalen, samplingRate]);
  if (datalen >= xValue) {
    const firstIndex = lastIndex - xValue + 1;
    transformedChartData = chartData
      .slice(firstIndex, lastIndex)
      .map((d) => ({ ...d, threshold: threshold }));
  } else {
    transformedChartData = chartData.map((d) => ({
      ...d,
      threshold: threshold,
    }));
  }
  // function checkRadioButton(array,index) {
  //   array = array.map((d) => ({...d, checked:false}))
  //   array[index].checked = true;
  //   setradioOpt([...array]);
  // }
  const timeValue = timeWindow / samplingRate;
  const startWindow = lastIndex - timeValue;
  if (datalen < TIME_RANGE_MIN / samplingRate)
    return <LoadingCharts />;

  console.log(
    startWindow > 0,
    datalen < TIME_RANGE_MIN / samplingRate,
    chartData[startWindow],
    startWindow,
    "<-----------------chartData"
  );
  return (
    <div className={style['chart-container']}>
     <div className={style['info-icon-container']}><InfoIcon infoText={'You change change how much of your load time you can see at a time, with the maximum window being 10 minutes. You can also change the threshold and the alert window you will receive alerts for'} /></div> 
      {/* <RadioButtons radioArray={radioOpt} setValue={checkRadioButton} /> */}
      <div className={style['chart-header']}>
      <Range
      width={'97%'}
        label={"Time Range (s)"}
        value={xWindow}
        setvalue={setxWindow}
        disabled={datalen * samplingRate < TIME_RANGE_MIN}
        min={TIME_RANGE_MIN}
        max={datalen * samplingRate}
        step={TIME_RANGE_STEP}
      />
      </div>
  
      
      <ResponsiveContainer width="95%" height="70%">
        <LineChart
          width={500}
          height={200}
          data={transformedChartData}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   bottom: 5,
          // }}
        >
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" tickCount={20} domain={[0, 1.5]} />
          <Tooltip />
          <Legend />
          <ReferenceLine
            x={startWindow > 1?(chartData[startWindow-1].time):''}
            
            stroke="blue"
          >
            <Label value="Start" position="insideRight"/>
          </ReferenceLine>
          <ReferenceLine
            x={startWindow > 1?(chartData[lastIndex-1].time):''}
            
            stroke="blue"
          >
            <Label value="End" position="insideRight"/>
          </ReferenceLine>
          <Line type="monotone" dataKey="loadTime" stroke="#632CA6" />
          <Line type="step" dataKey="threshold" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
      </div>
  );
}
function LoadingCharts({...props}) {
  return <div className={style["loading-container"]}>
     <CircularProgress variant="indeterminate"  />
  </div>;
}
export default Chart;


