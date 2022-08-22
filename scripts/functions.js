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
    minutes=parseInt(minutes)
    hours=parseInt(hours)
    minutes=+minutes+parseInt(duration)
    while(minutes>=60){
        minutes-=60
        hours+=1
    }
    if(hours>12){
        hours-=12
    }
    if((`${minutes}`.length)==1){
        minutes=`0${minutes}`
    }
    return `${hours}:${minutes}`
}