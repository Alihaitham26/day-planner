const wakeUpInput=document.getElementById("wakeUp")
const durationInput=document.getElementById("duration")
const missionInput=document.getElementById("mission")
let user=JSON.parse(localStorage.getItem("user"))||{
    wakeUp:"",
    missions:{},
    endTime:undefined
}
let endTime=user.endTime
if(user.missions){
    for(let time in user.missions){
        addDuration(time,user.missions[time])
    }
}
function timeAdd(time,duration){
    let [hours,minutes]=time.split(":")
    minutes=parseInt(minutes)
    hours=parseInt(hours)
    minutes=+minutes+parseInt(duration)
    while(minutes>=60){
        minutes-=60
        hours+=1
    }
    if((`${minutes}`.length)==1){
        minutes=`0${minutes}`
    }
    return `${hours}:${minutes}`
}
function addDuration(time,mission){
    let durationDiv=document.createElement("div")
    durationDiv.classList.add("duration")
    let timeDiv=document.createElement("div")
    timeDiv.classList.add("time")
    timeDiv.innerText=time
    let missionDiv=document.createElement("div")
    missionDiv.classList.add("mission")
    missionDiv.innerText=mission
    durationDiv.appendChild(timeDiv)
    durationDiv.appendChild(missionDiv)
    document.querySelector(".durations").appendChild(durationDiv)
}
document.querySelector("button").addEventListener("click",(ev)=>{
    if(document.querySelector("select").value==="skip time"){
        endTime=timeAdd(endTime,durationInput.value)
        return
    }
    let wakeUp=wakeUpInput.value
    let duration=durationInput.value
    endTime=endTime||wakeUp
    let time
    if(!wakeUp){
        alert("you must write your wake up time")
        return
    }else if(!wakeUp.match(/(\d\d?:\d\d)/g)){
        alert("wake-up time must be in format of hh:mm or h:mm")
        return
    }else if(duration>=1440){
        alert("duration can't be more than day")
        return
    }else{
        time=`${endTime} -> ${timeAdd(endTime,duration)}`
        user.wakeUp=wakeUp
        addDuration(time,missionInput.value)
    }
    endTime=timeAdd(endTime,duration)
    user.missions[time]=missionInput.value
    user.endTime=endTime
    localStorage.setItem("user",JSON.stringify(user))
    missionInput.value=null
})