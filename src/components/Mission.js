import React from "react";
function Mission(props){
    if(props.type==="add"){
        return(
        <div className="duration">
            <div className="time">{props.time}</div>
            <div className="mission">{props.label}</div>
        </div>
        )
    }else if(props.type==="skip"){
        return <div className="skip">{props.time + " skipped."}</div>
    }
}
export default Mission