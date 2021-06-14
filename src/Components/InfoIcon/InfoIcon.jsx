import style from "./InfoIcon.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
import {Grid, Tooltip} from '@material-ui/core';
export default function InfoIcon({infoText, color}) {
    return (
        <Grid  container xs={12} direction={'row'} justify={'flex-end'} alignItems={'center'} >
        <Tooltip title={infoText} placement={"top"}>
            <div>
            <FontAwesomeIcon className={style['font-btn']} size="lg" icon={faInfoCircle} style={{color:color}}  /> 
            </div>
          </Tooltip>
          </Grid>
    )
}
//TODO: File name should be smallcase