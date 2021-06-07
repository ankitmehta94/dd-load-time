import "./Modal.css";
import ModalHOC from "./ModalHOC";
import SurveyContainer from "../SurveyContainer/SurveyContainer";
import LocalStorage from "../../Utils/LocalStorage";
import { FORM_INITIAL_STATE } from "../../Constants/FormConstants";

const {formState = FORM_INITIAL_STATE, index = 0, submitted = false} = LocalStorage.get('surveyData') || {}
const MainComponent = ({...props}) => (<SurveyContainer formState={formState} index={index} {...props} />)
// create a Modal with main component if submitted is false
const Modal  = !submitted?ModalHOC(MainComponent): () => null

export default Modal;
