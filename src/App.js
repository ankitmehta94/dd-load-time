import React, { useState, useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Components/Header/Header";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Content from "./Components/Content/Content";
import style from "./App.css";
import { ALERT_WINDOW_DEFAULT, THRESHOLD_DEFAULT } from './Constants/Constants';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height:'100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    height:'15vh',
  },
  content: {
    height:'85vh',
  }

}));

function App() {
  const [threshold, setthreshold] = useState(THRESHOLD_DEFAULT);
  const [timeWindow, settimeWindow] = useState(ALERT_WINDOW_DEFAULT);
  const classes = useStyles();
  return (
    <Container>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} className={classes.header}>

          <Header threshold={threshold} setthreshold={setthreshold} timeWindow={timeWindow} settimeWindow={settimeWindow}/>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} className={classes.content}>

          <Content threshold={threshold} timeWindow={timeWindow}/>
          {/* </Paper> */}
        </Grid>
      </Grid>
      </Container>

  );
}

export default App;
