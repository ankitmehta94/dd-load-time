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
} from "recharts";
import {
  TIME_RANGE_MIN,
  TIME_RANGE_STEP,
  TIME_RANGE_OPTIONS,
} from "../../Constants/Constants";
import RadioButtons from "../../SurveyComponents/RadioButtons/RadioButtons";
import style from "./Charts.css";
import Range from "../Range/Range";

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
  if (startWindow < 1 || datalen < TIME_RANGE_MIN / samplingRate)
    return <LoadingCharts />;

  console.log(
    startWindow > 0,
    datalen < TIME_RANGE_MIN / samplingRate,
    chartData[startWindow],
    startWindow,
    "<-----------------chartData"
  );
  return (
    <>
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
      
      <ResponsiveContainer width="90%" height="80%">
        <LineChart
          width={500}
          height={200}
          data={transformedChartData}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis type="number" tickCount={20} domain={[0, 1.5]} />
          <Tooltip />
          <Legend />
          <ReferenceLine
            x={chartData[startWindow-1].x}
            label="Start"
            stroke="blue"
          />
          <ReferenceLine
            x={chartData[lastIndex - 1].x}
            label="End"
            stroke="blue"
          />
          <Line type="monotone" dataKey="y" stroke="#632CA6" />
          <Line type="step" dataKey="threshold" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
function LoadingCharts() {
  return <div className={style["loading-container"]}>Loading Charts...</div>;
}
export default Chart;


function parseRadioOptions(optionsArray, datalen, samplingRate) {
  console.log(optionsArray,'<-----------------')
  for (let index = 0; index < optionsArray.length; index++) {
    const element = optionsArray[index];
    let { value, disabled, checked, label } = element;
    if (value <= datalen*samplingRate) {
      console.log(value,'<-----------------label: ', label)
      disabled = false;
    }
    if (value === datalen*samplingRate && index !== 0) {
      optionsArray[index -1].checked = false;
      checked = true;
    }
    optionsArray[index] = { ...optionsArray[index], disabled, checked };
    console.log(optionsArray[index])
  }
  return optionsArray.slice();
}
