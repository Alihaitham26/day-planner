import React from "react";
import {HighInputs,LowInputs,Buttons} from "./Inputs";
import Mission from "./Mission";
import {Missions,Inputs} from "./parents";
import { convertMinutes ,timeAdd,Duration} from "../scripts/assist";

class App extends React.Component{
  render(){
    return (
    <div className="app">
      <Inputs>
        <HighInputs onChange={this.handleChange} disableWakeUp={this.state.disableWakeUp} wakeUpValue={this.state.wakeUp}/>
        <LowInputs onChange={this.handleChange} values={{mission:this.state.mission,duration:this.state.duration}}/>
        <Buttons onClick={this.handleClick} />
      </Inputs>
      <Missions>
        {this.state.missions.map((mission,index)=><Mission type={mission.type} time={mission.time} label={mission.label} key={index}/>)}
      </Missions>
    </div>
    )
  }
  endTime=undefined
  stateDefault={wakeUp:"",type:"add",duration:"",mission:"",missions:[],disableWakeUp:false}
  constructor(props){
    super(props)
    this.state=this.stateDefault
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
  }
  componentDidMount(){
    if(localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).missions.length>0){
      this.setState(JSON.parse(localStorage.getItem("user")))
      this.setState({disableWakeUp:true})
      this.endTime=JSON.parse(localStorage.getItem("user")).endTime
    }
  }
  addMission(type,duration,time,label){
    let result=0
    for(let mission of this.state.missions){
      result+=(mission.duration)
    }
    result+=(+duration)
    console.log(result)
    if(result>(24*60)){
      alert("you can't make more than day")
      return
    }
    let missions=Object.assign([],this.state.missions)
    missions.push(new Duration(type,duration,time,label))
    this.setState({missions:missions})
    localStorage.setItem("user",JSON.stringify({
      wakeUp:this.state.wakeUp,
      missions:missions,
      endTime:timeAdd(this.endTime,this.state.duration),
      duration:this.state.duration
    }))
  }
  handleChange(ev){
      this.setState({[ev.target.name]:ev.target.value})
  }
  handleClick(ev){
    let state=this.state
    if(ev.target.name==="add"){
      if(!state.duration||!state.wakeUp||(!state.mission&&this.state.type==="add")){
        alert("duration must be numbers and wakeUp musn't be empty")
        return
      }else if(+state.duration>=(60*12)){
        alert("duration can't be more than 12 hours")
        return
      }
      this.endTime=this.endTime||state.wakeUp
      let time=state.type==="add"?this.endTime+" => "+timeAdd(this.endTime,state.duration):convertMinutes(state.duration)
      this.addMission(state.type,state.duration,time,state.mission)
      this.setState({disableWakeUp:true})
      this.endTime=timeAdd(this.endTime,state.duration)
    }else if(ev.target.name==="reset"){
      this.endTime=undefined
      this.setState(this.stateDefault)
      localStorage.removeItem("user")
    }
  }
}
export default App