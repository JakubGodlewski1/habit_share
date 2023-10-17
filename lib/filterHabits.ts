/*filters*/
import {AllCategoryLabel, CurrentCategoryLabel, Habit} from "@/types";
import {convertDate} from "@/lib/convertDate";
import {isThisMonth, isThisWeek} from "date-fns";

// not done at all or done only today
const today = (habit:Habit):boolean => {
    const {repetitionOption, repetitionDates} = habit
    return (
            repetitionDates.includes(convertDate(new Date())) && (
                repetitionOption.type === "specific days"  ||
                (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "daily"))
    )
}

const thisWeek = (habit:Habit)=>{
    const {repetitionOption, completedToday, daysWhenCompleted} = habit
    return (
        repetitionOption.type === "repeat" &&
        repetitionOption.repeatFrequency === "weekly" &&
        (completedToday || !daysWhenCompleted.some(date=>isThisWeek(new Date(date))))
    )
}

const thisMonth = (habit:Habit)=> {
    const {repetitionOption, completedToday, daysWhenCompleted} = habit
    return (
        repetitionOption.type === "repeat" &&
        repetitionOption.repeatFrequency === "monthly" &&
        (completedToday || !daysWhenCompleted.some(date=>isThisMonth(new Date(date))))
    )
}

//all
const daily = (habit:Habit):boolean => {
    const {repetitionOption} = habit
    return (
            repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "daily")
}

const weekly = (habit:Habit):boolean => {
    const {repetitionOption} = habit
    return (
            repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "weekly")
}
const monthly = (habit:Habit):boolean => {
    const {repetitionOption} = habit
    return (
            repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "monthly")
}

const specificDays = (habit:Habit, completed?: boolean):boolean => {
    return habit.repetitionOption.type === "specific days"
}


export const filterHabits = ({habit, option}:{habit: Habit, option: AllCategoryLabel | CurrentCategoryLabel}):boolean => {

    const options = {
        today: today(habit),
        "this week": thisWeek(habit),
        "this month": thisMonth(habit),
        daily: daily(habit),
        weekly: weekly(habit),
        monthly:monthly(habit),
        "specific days":specificDays(habit)
    }

    return options[option]
}