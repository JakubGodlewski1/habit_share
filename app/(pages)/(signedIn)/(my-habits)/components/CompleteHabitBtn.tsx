"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {Habit} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {convertDate} from "@/lib/convertDate";
import {calculateDailyPointsToAdd, calculateDailyPointsToRemove} from "@/lib/calculatePoints";
import {useGlobalUpdates} from "@/app/hooks/GlobalUpdates/useGlobalUpdates";

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
                     points: calculateDailyPointsToAdd(h.strike+1, h.points),
                     daysWhenCompleted: [...h.daysWhenCompleted, convertDate(new Date())]   ,
                     completedToday: true
                }
                :
                //on incomplete
                {
                 ...h,
                    strike: h.strike -1,
                    points: calculateDailyPointsToRemove(h.strike, h.points),
                    daysWhenCompleted: h.daysWhenCompleted.filter(d=>d!==convertDate(new Date())),
                    completedToday: false
                }
    )!
        updateDocument(user?.uid!, {habits: updatedHabits})
    }


    return (
        <input onChange={handleHabitToggle} checked={habit.completedToday} type="checkbox" className="checkbox checkbox-accent" />
    );
};

export default CompleteHabitBtn;