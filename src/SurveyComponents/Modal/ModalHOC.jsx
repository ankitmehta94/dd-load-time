import "./Modal.css";
import { useState } from "react";
//Higher Order Component to create multiple modal using the same functionality
function ModalHOC(Component) {
  return function Modal() {
    const [visible, setvisible] = useState(true);
    if (visible) {
      return (
        <>
        <div className={"blankvoid"} onClick={() => setvisible(false)}>
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