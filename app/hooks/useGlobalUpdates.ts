import {User} from "@firebase/auth";
import {UserData} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {filterHabits} from "@/lib/filterHabits";
import {useEffect, useRef, useState} from "react";
import {todaysHabits} from "@/lib/todaysHabits";
import {calculatePointsWithMultiplier} from "@/lib/calculatePointsWithMultiplier";
import {calculateDailyPoints} from "@/lib/calculatePoints";

export const useGlobalUpdates = (userData:UserData, user:User)=>{
    const [isPending, setIsPending] = useState(false)

    const {dailyUpdates, multiplier, strike, points} = userData
    const {updateDocument} = useFirestore("users")
    const todaysUndoneHabits =  todaysHabits({userData, completed: false})
    const todaysAllHabits =  userData.habits.filter(habit=>filterHabits({habit, option:"today"}))
    const todaysDoneHabits = todaysHabits({userData, completed:true})
    const pointsForDoneHabits = todaysDoneHabits.reduce((total, habit)=>total+=habit.points, 0)
    //calculate all points of today's habits AS IF they were already completed
    let totalUserTodaysPoints = 0
    todaysAllHabits.forEach(h=>{
        //if habit is completed
        if (h.completedToday)totalUserTodaysPoints+=h.points
        //if habit is not completed
        if (!h.completedToday)totalUserTodaysPoints+=h.points + calculateDailyPoints(h.strike+1)
    })

    const prevTodayHabitsLength = useRef(todaysDoneHabits.length)

    useEffect(() => {
        //when user completes all today's habits, update global strike and points
        const addPointsAndStrike = async () => {

            setIsPending(true)
            try {
                await updateDocument(user.uid, {
                    dailyUpdates:{points:true, strike:true},
                    strike:strike+1,
                    points: points + calculatePointsWithMultiplier({
                        multiplier,
                        todaysPoints:totalUserTodaysPoints,
                        globalStrike:strike+1
                    })
                } as UserData)
            }catch (err:any){
                console.error(err.message)
            }finally {
                setIsPending(false)
            }
        }

        if (
            todaysUndoneHabits.length===0 &&
            todaysAllHabits.length > 0 &&
            !dailyUpdates.strike &&
            !dailyUpdates.points
        ){
            addPointsAndStrike()
        }

        //if user has completed all the today's habits and later deselected something, calculate the points and strike back
        const subtractPointsAndStrike =  async ()=>{
            try {
                setIsPending(true)
                await updateDocument(user.uid, {
                    dailyUpdates:{points:false, strike:false},
                    strike:strike-1,
                    points: points - calculatePointsWithMultiplier({
                        multiplier,
                        todaysPoints:todaysAllHabits.length === prevTodayHabitsLength.current ? totalUserTodaysPoints : pointsForDoneHabits,
                        globalStrike:strike
                    })
                } as UserData)

            }catch (err:any){
                console.error(err.message)
            }finally {
                setIsPending(false)
            }
        }

        if (
            todaysUndoneHabits.length===1 &&
            dailyUpdates.strike &&
            dailyUpdates.points
        ){
            subtractPointsAndStrike()
        }
        prevTodayHabitsLength.current = todaysAllHabits.length

    }, [todaysAllHabits.length, todaysUndoneHabits.length]);

    return {isPending}
}

