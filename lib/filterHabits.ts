/*filters*/
import {CategoryOption, Habit} from "@/types";
import {isThisMonth, isThisWeek} from "date-fns"
import {convertDate} from "@/lib/convertDate";

export const filterHabits = (habit:Habit, option: CategoryOption):boolean => {
    const {repetitionOption} = habit

    /*not completed*/
    //to do Today (except weekly and monthly tasks)
    if (option==="today"){
      return !habit.completedToday &&
            (repetitionOption.type === "specific days"  || (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "daily")) &&
            habit.repetitionDates.includes(convertDate(new Date()))

    }
    //to do weekly
   else if (option=== "this week"){
        return repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "weekly" &&
            !isThisWeek(new Date(habit.daysWhenCompleted[habit.daysWhenCompleted.length-1]), {weekStartsOn: 1})
    }

    //to do monthly
    else if (option==="this month"){
        return  repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "monthly" &&
            !isThisMonth(new Date(habit.daysWhenCompleted[habit.daysWhenCompleted.length-1]))
    }else return false
}