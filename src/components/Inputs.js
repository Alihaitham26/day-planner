import React from "react"


function HighInputs(props) {
	return (
		<div className="high-inputs">
			<input type="time" placeholder="wake up time(8:30)" name='wakeUp' onChange={props.onChange} disabled={props.disableWakeUp} value={props.wakeUpValue}/>
			<select name="type" defaultValue="add mission" onChange={props.onChange}>
				<option value="" disabled>-- select type --</option>
				<option value="add">add mission</option>
				<option value="skip">skip time</option>
			</select>

		</div>
	)
}


function LowInputs(props) {
	return (
		<div className="low-inputs">
			<div className="duration">
				<p className="duration-label">duration:</p>
				<input type="number" id="duration" placeholder="minutes"  onChange={props.onChange} name='duration' value={props.values.duration}/>
			</div>
			<div className="mission">
				<p className="mission-label">mission:</p>
				<input type="text" id="mission" placeholder="what will you do?" onChange={props.onChange} name='mission' value={props.values.mission}/>
			</div>
		</div>
	)
}



function Buttons(props) {
	return (
		<div className="buttons">
			<button className="reset" name="reset" onClick={props.onClick}>reset</button>
			<button className='add' name="add" onClick={props.onClick}>add</button>
		</div>
	)
}


export { HighInputs, LowInputs, Buttons }