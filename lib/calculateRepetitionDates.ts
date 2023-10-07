import {convertDate} from "@/lib/convertDate";
import {
    addDays, addMonths, addWeeks, endOfMonth, endOfWeek, isFriday, isMonday, isSaturday, isSunday, isThursday,
    isTuesday, isWednesday, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday
} from "date-fns"

export const calculateRepetitionDates = (option: "daily" | "weekly" | "monthly" | ("M" | "T" | "W" | "R" | "F" | "S" | "U")[]) => {
    let dates:Date[] = []

    const repeatOption = {
        "daily": {times: 1160, addNextRepetitionDate:(i:number)=> dates.push(addDays(new Date(), i))},
        "weekly": {times: 156, addNextRepetitionDate:(i:number)=>  dates.push(addWeeks(endOfWeek(new Date(),{weekStartsOn: 1}), i))},
        "monthly": {times: 36, addNextRepetitionDate:(i:number)=> dates.push(addMonths(endOfMonth(new Date()), i))},
    }

    const specificDaysOption = {
        "M": {isDay: isMonday, nextDay: nextMonday},
        "T": {isDay: isTuesday, nextDay: nextTuesday},
        "W": {isDay: isWednesday, nextDay: nextWednesday},
        "R": {isDay: isThursday, nextDay: nextThursday},
        "F": {isDay: isFriday, nextDay: nextFriday},
        "S": {isDay: isSaturday, nextDay: nextSaturday},
        "U": {isDay: isSunday, nextDay: nextSunday}
    }

    //calculate repetition days if option is daily, weekly or monthly
    if (typeof option === "string"){
        for (let i = 0; i < repeatOption[option].times; i++) {
            repeatOption[option].addNextRepetitionDate(i)
        }
    }

    //calculate repetition days if option are specific days
    else {
        option.forEach(day=>{
            //if one of the days user has chosen is today, add today to repetition days list
            if (specificDaysOption[day].isDay(new Date())){dates.push(new Date())}
            //add next repetition days
            for (let i = 0; i < 156; i++) {
                dates.push(addWeeks(specificDaysOption[day].nextDay(new Date()),i))
            }
        })

        //sort the array of dates
        dates.sort((a:Date, b:Date)=>a.getTime()-b.getTime())
    }
    //convert dates to iso string format
    return dates.map(date=>convertDate(date))
}





