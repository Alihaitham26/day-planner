function convertMinutes(minutesInp){
    let minutes=minutesInp
    let hours=0
    while (minutes>=60){
        minutes-=60
        hours+=1
    }
    return minutes>0&&hours>0?`${hours}h & ${minutes}m`:
           minutes>0?`${minutes}m`:
           hours>0?`${hours}h`:
           false
}
function timeAdd(time,duration){
    let [hours,minutes]=time.split(":")
    minutes=+(minutes)
    hours=+(hours)
    minutes=+minutes+(duration)
    while(minutes>=60){
        minutes-=60
        hours+=1
    }
    if(hours>12){
        hours-=12
    }
    if((`${minutes}`.length)===1){
        minutes=`0${minutes}`
    }
    return `${hours}:${minutes}`
}
class Duration{
    constructor(type,duration,time,label=""){
      this.type=type
      this.time=time
      this.duration=+duration
      if(this.type === "add"){
        this.label=label
      }
    }
}
export {convertMinutes,timeAdd,Duration}