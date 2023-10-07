

type HabitFormInputs = {
    title:string,
    repetitionOption:RepetitionOption
}

type RepetitionOption =
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
    habits: Habit[]
}