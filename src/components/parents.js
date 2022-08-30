import React from "react";
function Missions(props){
    return(
        <div className="missions">
          {props.children}
        </div>
    )
}
function Inputs(props){
    return (
    <div className='input-div'>
      <h1>day planner</h1>
      {props.children}
    </div>
    )
}
export {Missions,Inputs}