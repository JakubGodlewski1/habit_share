import {Habit, RepetitionOption, UserData} from "@/types";
import {cloneDeep, isEqual} from "lodash"
import {convertDate} from "@/lib/convertDate";
import {addMonths, differenceInDays, endOfYesterday, isFirstDayOfMonth, isMonday, isSameMonth} from "date-fns";
import {calculateDailyPoints} from "@/lib/calculatePoints";
import {generateMultiplier} from "@/lib/generateMultiplier";

const updateHabits= (habits: Habit[]):Habit[] => {
    const yesterday = convertDate(endOfYesterday())
    const resetHabit = (habit:Habit) => {
        return {
            ...habit,
            completedToday: false,
            strike:0,
            points: (habit.points - calculateDailyPoints(habit.strike)) < 0 ? 0 : habit.points - calculateDailyPoints(habit.strike)
        } as Habit
    }

    return habits.map(habit=>{
        const lastDayWhenCompleted = habit.daysWhenCompleted[habit.daysWhenCompleted.length-1]

        //check if u should reset user's habit strike

        /*daily habits*/
        //if the last date in the "datesWhenCompleted" array !== yesterday, reset
        if (
            isEqual(habit.repetitionOption, {type: "repeat", repeatFrequency: "daily"} as RepetitionOption) &&
            lastDayWhenCompleted!==yesterday
        ) return resetHabit(habit)

        /*specific days habits*/
        //if habit was scheduled for yesterday and it was not completed yesterday, reset
        if (
            habit.repetitionOption.type === "specific days" &&
            lastDayWhenCompleted!==yesterday
        )return resetHabit(habit)

        /*weekly habits*/
        //if today is monday, check if the habit was done during the previous week, if not, reset strike
        if (
            isEqual(habit.repetitionOption, {type: "repeat", repeatFrequency: "weekly"} as RepetitionOption) &&
            isMonday(new Date()) &&
            differenceInDays(new Date(), new Date(lastDayWhenCompleted)) > 7
        )return resetHabit(habit)

        /*monthly habits*/
        //if today is the first day of the month, check if the habit was completed previous month, if not, reset the strike
        if (
            isEqual(habit.repetitionOption, {type: "repeat", repeatFrequency: "monthly"} as RepetitionOption) &&
            isFirstDayOfMonth(new Date()) &&
            !isSameMonth(addMonths(new Date(lastDayWhenCompleted), 1), new Date())
        ) return resetHabit(habit)

        return {...habit, completedToday:false}
    })

}


/*update user's habits scheduled for yesterday, for last week (if today is monday) and for last month (if today is the first day of the month))*/
export const reset = (userData:UserData):UserData =>{
    let user = cloneDeep(userData)
    //reset daily updates
    user.dailyUpdates = {
        strike: false,
        points: false
    }
    //create new multiplier
    user.multiplier = generateMultiplier()
    //handle all the habits - update their strikes and points accordingly
    if (user.habits.length > 0) user.habits = updateHabits(user.habits)
    return user
}