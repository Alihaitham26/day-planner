// DOM
const DurationsDiv=document.querySelector(".durations")
const wakeUpInput=document.getElementById("wakeUp")
const durationInput=document.getElementById("duration")
const missionInput=document.getElementById("mission")

let user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{
    wakeUp:"",
    durations:[],
    endTime:undefined
}
let endTime=user.endTime
if(user.durations.length!==0){
    wakeUpInput.setAttribute("disabled",true)
    for(let duration of user.durations){
        if(duration.type==="mission"){
            addDuration(duration.time,duration.mission)
        }else if(duration.type==="skip"){
            addSkip(duration.time+" skipped")
        }
    }
}

//append durations to dom functions
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
    DurationsDiv.appendChild(durationDiv)
}

function addSkip(text){
    let skipDiv=document.createElement("div")
    skipDiv.classList.add("skip")
    skipDiv.innerText=text
    DurationsDiv.appendChild(skipDiv)
}


document.querySelector(".inputs button").addEventListener("click",(ev)=>{
    // variables for two statment
    let wakeUp=wakeUpInput.value
    let duration=durationInput.value
    let time
    endTime=endTime||wakeUp
    
    // errors
    if(!wakeUp){
        alert("you must write your wake up time")
        return
    }else{
        user.wakeUp=user.wakeUp||wakeUp
        wakeUp=user.wakeUp
    }

    // durations options
    switch(document.querySelector("select").value){
        case "skip time":
            addSkip(convertMinutes(durationInput.value)+" skipped")
            endTime=timeAdd(endTime,durationInput.value)
            user.durations.push({type:"skip",time:convertMinutes(durationInput.value)})
            user.endTime=endTime
            localStorage.setItem("user",JSON.stringify(user))
            missionInput.value=null
            return
        case "add mission":
            time=`${endTime} -> ${timeAdd(endTime,duration)}`
            user.wakeUp=wakeUp
            addDuration(time,missionInput.value)
            endTime=timeAdd(endTime,duration)
            user.durations.push({type:"mission",time:time,mission:missionInput.value})
    }
    user.endTime=endTime
    localStorage.setItem("user",JSON.stringify(user))
    missionInput.value=null
    wakeUpInput.setAttribute("disabled",true)
})
document.querySelector(".reset").addEventListener("click",()=>{
    if(confirm("are you sure")){
        localStorage.removeItem("user")
        DurationsDiv.innerHTML=""
    }
})