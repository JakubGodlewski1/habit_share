import {User} from "@firebase/auth";
import {UserData} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {filterHabits} from "@/lib/filterHabits";
import {useEffect} from "react";
import {todaysHabits} from "@/lib/todaysHabits";
import {generateMultiplier} from "@/lib/generateMultiplier";
import {calculatePointsWithMultiplier} from "@/lib/calculatePointsWithMultiplier";
import {sumUpPointsOfTodaysHabits} from "@/lib/sumUpPointsOfTodaysHabits";

export const useGlobalUpdates = (userData:UserData, user:User)=>{
    const {updateDocument} = useFirestore("users")
    const todaysUndoneHabits =  todaysHabits({userData, completed: false})

   /* update global strike*/

    useEffect(() => {
        if (todaysUndoneHabits.length===0 && !userData.strikeHasBeenUpdatedToday && userData.habits.length > 0){
            updateDocument(user.uid, {strikeHasBeenUpdatedToday: true, strike: userData.strike+1} as UserData)
        }
        if (todaysUndoneHabits.length===1 && userData.strikeHasBeenUpdatedToday){
            updateDocument(user.uid, {strike: userData.strike-1, strikeHasBeenUpdatedToday: false} as UserData)
        }
    }, [user.uid, todaysUndoneHabits.length, userData.habits.length]);

   /* update multiplier*/
    const useEffectDep = userData!.habits.filter(h=>filterHabits({habit:h, option:"today"})).map(el=>el.completedToday).filter(l=>l).length

    //if all habits scheduled for today has been completed, calculate and show today's multiplier to the user
    //also handle multiplying user's points with the multiplier
    useEffect(() => {
        //generate multiplier
        if (todaysUndoneHabits.length===0 && !userData!.todaysMultiplier){
            const multiplier = generateMultiplier()
            updateDocument(user!.uid, {todaysMultiplier: multiplier})
            const pointsToAdd = calculatePointsWithMultiplier({multiplier, todaysPoints:sumUpPointsOfTodaysHabits(userData!.habits), globalStrike:userData!.strike})
        }




    }, [useEffectDep]);
}