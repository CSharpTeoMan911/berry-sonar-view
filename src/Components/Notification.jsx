import { useEffect, useState } from "react";
import information from "../Images/information.png";
import cross from "../Images/cross.png";

export default function Notification(props) {
    const [finsihed, setFinished] = useState(true);
    const {show, setShow, message, type} = props

    useEffect(()=>{
        if(finsihed === true){
            setTimeout(() => {
                setShow(false);
                setFinished(true);
            }, 3000);
        }
    }, [show]);

    return (
        <div className={show === true ? "toast show": "toast hide"} role="alert" aria-live="assertive" aria-atomic="true" style={{position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)", zIndex:"9999"}}>
            <div className="toast-header">
                <img src={type === "notification" ? information : cross} style={{height:"20px"}} className="rounded me-2" alt="..." />
                <strong className="me-auto">{type === "notification" ? "Notification" : "Error" }</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>setShow(false)}></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
} 