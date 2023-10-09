

export type HabitFormInputs = {
    title:string,
    repetitionOption:RepetitionOption
}

export type RepetitionOption =
    {type: "repeat", repeatFrequency:  "daily" | "weekly" | "monthly"} |
    {type: "specific days", specificDaysFrequency:  ("M" | "T" | "W" | "R" | "F" | "S" | "U")[]}

export type Habit = {
    title: string,
    repetitionOption: RepetitionOption
    completedToday: boolean,
    repetitionDates: string[]
    daysWhenCompleted: string[]
    strike: number,
    createdAt: string,
    points: number
}

export type UserData = {
    email: string,
    strike: number,
    displayName: string,
    friends:UserInitialData[],
    habits: Habit[],
    todaysMultiplier: number | null
}

export type CategoryOption = "today" | "this week" | "this month" | "daily" | "weekly" | "monthly";
export type AllCategoryOption =  "daily" | "weekly" | "monthly";
export type CurrentCategoryOption = "today" | "this week" | "this month";

export const getCategoryOptionFromHabit = (habit:Habit):CategoryOption => {
    const {repetitionOption} = habit
    if (repetitionOption.type === "specific days" || (repetitionOption.type==="repeat" && repetitionOption.repeatFrequency === "daily")) return "today"
    else if (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "weekly") return "this week"
    else if (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "monthly") return "this month"
    else return "today"
}