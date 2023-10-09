import {convertDate} from "@/lib/convertDate";
import {UserData} from "@/types";

export const allTodaysHabitsAreCompleted = (userData:UserData) =>{
    const todaysHabits = userData!.habits.filter(h=> {
        return h.repetitionDates.includes(convertDate(new Date())) &&
            ( h.repetitionOption.type === "specific days" ||
                (h.repetitionOption.type==="repeat" && h.repetitionOption.repeatFrequency === "daily"))}
    )
    const completedHabits = todaysHabits.filter(th=>th.completedToday)
    return (completedHabits.length===todaysHabits.length && todaysHabits.length > 0)
}