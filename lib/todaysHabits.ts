import {convertDate} from "@/lib/convertDate";
import {UserData} from "@/types";
import {filterHabits} from "@/lib/filterHabits";

export const todaysHabits = ({userData, completed}: { userData: UserData, completed: boolean }) =>{
    const todaysHabits = userData!.habits.filter(habit=> filterHabits({habit,option: "today"}))
    return todaysHabits.filter(h=>completed ? h.completedToday : !h.completedToday)
}