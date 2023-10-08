import {Habit} from "@/types";
import {convertDate} from "@/lib/convertDate";
import {isThisMonth, isThisWeek} from "date-fns";

export const getCurrentHabits = (habits:Habit[]):Habit[] => {
    //currentHabits - habits that are either to be done today (both completed and uncompleted) or habits that are to be done
    // this week or this month - uncompleted or only completed today

    return habits.filter(h=> {
                //daily
        return (h.repetitionOption.type === "repeat" && h.repetitionOption.repeatFrequency === "daily") ||
                (h.repetitionOption.type === "specific days" && h.repetitionDates.includes(convertDate(new Date()))) ||
                //weekly
               ( h.repetitionOption.type === "repeat" && h.repetitionOption.repeatFrequency === "weekly" &&
                   (h.daysWhenCompleted.length === 0 || !isThisWeek(new Date(h.daysWhenCompleted[h.daysWhenCompleted.length-1])) ||
                   h.daysWhenCompleted[h.daysWhenCompleted.length-1] === convertDate(new Date()))) ||
                //monthly
            ( h.repetitionOption.type === "repeat" && h.repetitionOption.repeatFrequency === "monthly" &&
                (h.daysWhenCompleted.length === 0 || !isThisMonth(new Date(h.daysWhenCompleted[h.daysWhenCompleted.length-1])) ||
                 h.daysWhenCompleted[h.daysWhenCompleted.length-1] === convertDate(new Date())))
    })
}