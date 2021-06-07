import "./Modal.css";
import ModalHOC from "./ModalHOC";
import SurveyContainer from "../SurveyContainer/SurveyContainer";

// create a Modal with main component 
const Modal  = ModalHOC(SurveyContainer)

export default Modal;
