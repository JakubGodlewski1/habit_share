import {Habit} from "@/types";

export const calculateTotalUserPoints = (habits:Habit[]) =>{
     return habits.reduce((sumOfPoints, habit)=>habit.points+sumOfPoints, 0)
}