import "./Modal.css";
import { useState } from "react";

function ModalHOC(Component) {
  return function Modal() {
    const [visible, setvisible] = useState(true);
    if (visible) {
      return (
        <>
        <div className={"blankvoid"}>
        </div>
           <div className={"modal"}>
           <div className={"mainComponent"}>
             <div className={"compHeader"}>
               <div className={"round"} onClick={() => setvisible(false)}>
                 X
               </div>
             </div>
             <Component closeModal={() => setvisible(false)} />
           </div>
         </div>
         </>
      );
    } else {
      return null;
    }
  };
}

export default ModalHOC;