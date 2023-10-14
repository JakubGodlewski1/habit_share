import {User} from "@firebase/auth";
import {UserData} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {filterHabits} from "@/lib/filterHabits";
import {useEffect} from "react";
import {todaysHabits} from "@/lib/todaysHabits";
import {generateMultiplier} from "@/lib/generateMultiplier";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";
import {calculatePointsWithMultiplier} from "@/lib/calculatePointsWithMultiplier";

export const useGlobalUpdates = (userData:UserData, user:User)=>{
    const {updateDocument} = useFirestore("users")
    const todaysUndoneHabits =  todaysHabits({userData, completed: false})
    const todaysAllHabits =  userData.habits.filter(habit=>filterHabits({habit, option:"today"}))

   /* update global strike*/

    useEffect(() => {
        if (todaysUndoneHabits.length===0 && !userData.dailyUpdates.strike && userData.habits.length > 0){
            updateDocument(user.uid, {dailyUpdates:{strike:true, points:userData.dailyUpdates.points}, strike: userData.strike+1} as UserData)
        }
        if (todaysUndoneHabits.length===1 && userData.dailyUpdates.strike){
            updateDocument(user.uid, {strike: userData.strike-1, dailyUpdates:{strike:false, points:userData.dailyUpdates.points}} as UserData)
        }
    }, [user.uid, todaysUndoneHabits.length, userData.habits.length]);

   /* update multiplier*/
    //if all habits scheduled for today has been completed, calculate and show today's multiplier to the user
    useEffect(() => {
        //generate multiplier
        if (todaysUndoneHabits.length===0 && todaysAllHabits.length > 0 && !userData!.multiplier){
            const multiplier = generateMultiplier()
            updateDocument(user!.uid, {multiplier})
        }
    }, [todaysUndoneHabits.length, todaysAllHabits.length]);


    /*update global points(use multiplier)*/
useEffect(() => {
    const extraPoints = ():number => {
        const totalUserTodaysPoints = calculateTotalUserPoints(todaysAllHabits)
        return  calculatePointsWithMultiplier({
            multiplier:userData.multiplier!,
            todaysPoints: totalUserTodaysPoints,
            globalStrike: userData.strike
        })
    }

    //add the points
    if (todaysUndoneHabits.length === 0 &&
        todaysAllHabits.length > 0 &&
        userData.multiplier &&
        userData.dailyUpdates.strike &&
        !userData.dailyUpdates.points)
    {
        updateDocument(user.uid, {points: userData.points+extraPoints(), "dailyUpdates.points": true})
    }

    // subtract the points

    if (todaysUndoneHabits.length === 1 &&
        userData.multiplier &&
        userData.dailyUpdates.strike &&
        userData.dailyUpdates.points)
    {
        updateDocument(user.uid, {points: userData.points-extraPoints()})
    }

}, [
    todaysUndoneHabits.length,
    todaysAllHabits.length,
    userData.multiplier,
    userData.dailyUpdates.strike,
    user.uid,
    userData.points,
    userData.strike
]);
}

