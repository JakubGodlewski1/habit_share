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

// /*filters*/
// import {FilterOption, Habit} from "@/types";
// import {convertDate} from "@/lib/convertDate";
//
// const today = (habit:Habit, completed?: boolean):boolean => {
//     const {repetitionOption, repetitionDates, completedToday} = habit
//     return (
//         completed ? completedToday : completed === undefined ? true : !completedToday &&
//             repetitionDates.includes(convertDate(new Date())) && (
//                 repetitionOption.type === "specific days"  ||
//                 (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "daily"))
//     )
// }
//
// const daily = (habit:Habit, completed?: boolean):boolean => {
//     const {repetitionOption, completedToday} = habit
//     return (
//         completed ? completedToday : completed === undefined ? true : !completedToday &&
//             repetitionOption.type === "repeat" &&
//             repetitionOption.repeatFrequency === "daily")
// }
//
// const weekly = (habit:Habit, completed?: boolean):boolean => {
//     const {repetitionOption, completedToday} = habit
//     return (
//         completed ? completedToday : completed === undefined ? true : !completedToday &&
//             repetitionOption.type === "repeat" &&
//             repetitionOption.repeatFrequency === "weekly")
// }
// const monthly = (habit:Habit, completed?: boolean):boolean => {
//     const {repetitionOption, completedToday} = habit
//     return (
//         completed ? completedToday : completed === undefined ? true : !completedToday &&
//             repetitionOption.type === "repeat" &&
//             repetitionOption.repeatFrequency === "monthly")
// }
//
// const specificDays = (habit:Habit, completed?: boolean):boolean => {
//     const {repetitionOption, completedToday} = habit
//     return (
//         completed ? completedToday : completed === undefined ? true : !completedToday &&
//             repetitionOption.type === "specific days"
//     )
// }
//
//
// export const filterHabits = ({habit, option, completed}:{habit: Habit, option: FilterOption, completed?: boolean}):boolean => {
//
//     const options = {
//         today: today(habit, completed),
//         daily: daily(habit, completed),
//         weekly: weekly(habit, completed),
//         monthly:monthly(habit, completed),
//         "specific days":specificDays(habit, completed)
//     }
//
//     return options[option]
// }