import React, { useState, useEffect } from "react";

import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import style from "./App.css";
import { ALERT_WINDOW_DEFAULT, THRESHOLD_DEFAULT } from './Constants/Constants';
function App() {
  const [threshold, setthreshold] = useState(THRESHOLD_DEFAULT);
  const [timeWindow, settimeWindow] = useState(ALERT_WINDOW_DEFAULT);
  return (
    <div className={style['container']}>
      <Header threshold={threshold} setthreshold={setthreshold} timeWindow={timeWindow} settimeWindow={settimeWindow}/>
      <Content threshold={threshold} timeWindow={timeWindow}/>
    </div>

  );
}

export default App;
