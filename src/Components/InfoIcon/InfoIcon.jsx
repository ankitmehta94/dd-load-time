import style from "./InfoIcon.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

export default function InfoIcon({}) {
    return <div className={style['infoContainer']} >
        <span className={style['tooltip']}></span>
        <FontAwesomeIcon className={style['font-btn']} size="lg" icon={faInfoCircle} dataTooltip={'Hakuna Mattaa'} /> 
    </div>
}
//TODO: GET it to work
//TODO: File name should be smallcase