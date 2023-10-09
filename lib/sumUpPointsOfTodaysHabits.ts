import {Habit} from "@/types";
import {convertDate} from "@/lib/convertDate";

export const sumUpPointsOfTodaysHabits = (habits:Habit[]) => {
    const todaysHabits = habits.filter(h=> {
        return h.repetitionDates.includes(convertDate(new Date())) &&
            ( h.repetitionOption.type === "specific days" ||
                (h.repetitionOption.type==="repeat" && h.repetitionOption.repeatFrequency === "daily"))}
    )

    return todaysHabits.reduce((totalPoints, habit)=>totalPoints+habit.points, 0)
}