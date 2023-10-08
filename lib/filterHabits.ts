/*filters*/
import {CategoryOption, Habit} from "@/types";

export const filterHabits = (habit:Habit, option: CategoryOption):boolean => {
    const {repetitionOption} = habit

    //to do Today (except weekly and monthly tasks)
    if (option==="today" || option==="daily"){
      return (repetitionOption.type === "specific days"  || (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "daily"))

    }
    //to do weekly
   else if (option=== "this week" || option==="weekly")return repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "weekly"

    //to do monthly
    else if (option==="this month" || option === "monthly")return  repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "monthly"

    else return false
}