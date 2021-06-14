import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ABOVE_CONDITION_KEY } from '../../../constants/Constants';
import { prettyTime, prettyTimeWindow } from '../../../utils/DateUtils';
import BlinkingLights from "../blinking_lights/BlinkingLights";
import style from "./AlertTable.css";
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '../info_icon/InfoIcon';


  function alertToText(alert) {
    return alert === ABOVE_CONDITION_KEY?'Danger':'Recovered'
}
const useStyles = makeStyles({
    root: {
      width: '100%',
      display:'flex',
      flexDirection:'column',
  justifyContent:'flext-start',
    },
    container: {

      maxHeight: '40vh',
},
    rowColor: props => {
        return ({
            backgroundColor: props.alertType === ABOVE_CONDITION_KEY ? '#f7cfcf' : '#dcf5dc'
        })
    }
  });
export default function AlertTable({ alertData, alertType, lastAlert, infoText }) {
    const alertLen = alertData.length
  const alertArray = alertData
    .map((alertObject, i) => {
    // let containerClass = style['alert'] + ' ' + (alertType === ABOVE_CONDITION_KEY ?style['red-alert']: style['green-alert'])
    if(alertLen - 1 === i && lastAlert){
        // containerClass += ' ' + style['alert-pulse']
    }
      return {
          ...alertObject,
          blinking: (alertLen - 1 === i && lastAlert),
          alertType: alertToText(alertObject.alert),
          prettyTimeWindow: prettyTimeWindow(alertObject.timeWindow),
          prettyAlertTime: prettyTime(alertObject.time)
      }
    
    }).reverse();
    const classes = useStyles({alertType});
  return (
      <TableContainer className={classes.container}>
          <InfoIcon infoText={infoText}/>
      <Table stickyHeader  aria-label="alert table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Threshold</TableCell>
            <TableCell align="center">Alert Window</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {alertArray.map((row, index) => (
            <TableRow key={`row-${index}`} className={classes.rowColor} >
              <TableCell align="center" component="th" scope="row">
               <BlinkingLights blinking={row.blinking} alertType={alertType}/>
              </TableCell>
              <TableCell align="center">{row.alertType}</TableCell>
              <TableCell align="center">{row.prettyAlertTime}</TableCell>
              <TableCell align="center">{row.threshold}</TableCell>
              <TableCell align="center">{row.prettyTimeWindow}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

