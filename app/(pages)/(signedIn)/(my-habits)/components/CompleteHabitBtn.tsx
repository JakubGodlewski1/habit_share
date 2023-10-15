"use client"
import {ChangeEvent} from "react";
import {Habit} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {convertDate} from "@/lib/convertDate";
import {calculateDailyPoints} from "@/lib/calculatePoints";
import {useGlobalUpdates} from "@/app/hooks/useGlobalUpdates";



const CompleteHabitBtn = ({habit}:{habit:Habit}) => {
    const {updateDocument} = useFirestore("users")
    const {user, userData} = useAuthContext()

    useGlobalUpdates(userData!, user!)

    const handleHabitToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedHabits = userData?.habits.map(h=>h.title!==habit.title ? h :
            e.target.checked  ?
                //on complete
                {...h,
                     strike: h.strike+1,
                     points:h.points + calculateDailyPoints(h.strike+1),
                     daysWhenCompleted: [...h.daysWhenCompleted, convertDate(new Date())]   ,
                     completedToday: true
                }
                :
                //on incomplete
                {
                 ...h,
                    strike: h.strike -1,
                    points: h.points - calculateDailyPoints(h.strike),
                    daysWhenCompleted: h.daysWhenCompleted.filter(d=>d!==convertDate(new Date())),
                    completedToday: false
                }
    )!
        updateDocument(user?.uid!, {
            habits: updatedHabits,
            points: e.target.checked ?
                userData!.points + calculateDailyPoints(habit.strike+1) :
                userData!.points - calculateDailyPoints(habit.strike)
        })
    }


    return (
        <input onChange={handleHabitToggle} checked={habit.completedToday} type="checkbox" className="checkbox checkbox-accent" />
    );
};

export default CompleteHabitBtn;