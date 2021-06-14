import style from "./BlinkingLights.css";
import { makeStyles } from '@material-ui/core/styles';
import { ABOVE_CONDITION_KEY } from "../../Constants/Constants";
function calculateBackgroundColour(alertType, blinking) {
    if(!blinking){
        return alertType===ABOVE_CONDITION_KEY?'#af0606':'#026b36'
    }else{
        return alertType===ABOVE_CONDITION_KEY?'#ff0606':'#0ae275'
    }
}
console.log(style)
const useStyles = makeStyles({
    // style rule
    light: ({alertType,blinking}) => {
        let animation = {}
        if(blinking){
           animation = {
            animationDuration: '2s',
            animationName: alertType===ABOVE_CONDITION_KEY?style['flashing_red']: style['flashing_green'],
            animationIterationCount: 'infinite',
           }
        }
        return{
            ...animation,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: calculateBackgroundColour(alertType,blinking),
            margin: '8px',

        }
    },
    "@global": {
        "@keyframes flashing": ({alertType}) => {
            let color = alertType===ABOVE_CONDITION_KEY?'#ff0606':'#ff0606'
            console.log('Color',color)
            return {
                "0%":{
                   boxShadow: `none`
                 },
                 "50%": {
                   boxShadow: `0px 0px 40px ${color}, 0px 0px 30px ${color},
                     0px 0px 20px ${color}, 0px 0px 10px ${color},
                     0px 0px 5px ${color};`
                 },
                 "100%": {
                   boxShadow: 'none'
                 }
               }
        }
    },
    // "@keyframes flashing": ({alertType}) => {
    //     let color = alertType===ABOVE_CONDITION_KEY?'#ff0606':'#ff0606'
    //     return {
    //         "0%":{
    //            boxShadow: `none`
    //          },
    //          "50%": {
    //            boxShadow: `0px 0px 40px ${color}, 0px 0px 30px ${color},
    //              0px 0px 20px ${color}, 0px 0px 10px ${color},
    //              0px 0px 5px ${color};`
    //          },
    //          "100%": {
    //            boxShadow: 'none'
    //          }
    //        }
    // }
  });
export default function BlickingLight({blinking, display, alertType}) {
    const classes = useStyles({blinking, alertType})
    // let classNames =  style['light'];
    // if(blinking){
    //     classNames += ' ' + style['light-animated']
    // }
    return (<div className={classes.light}></div>)
}