"use client"
import {useEffect} from "react";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {useFirestore} from "@/app/hooks/useFirestore";
import {generateMultiplier} from "@/lib/generateMultiplier";
import {allTodaysHabitsAreCompleted} from "@/lib/allTodaysHabitsAreCompleted";
import {calculatePointsWithMultiplier} from "@/lib/calculatePointsWithMultiplier";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";
import {sumUpPointsOfTodaysHabits} from "@/lib/sumUpPointsOfTodaysHabits";
import {filterHabits} from "@/lib/filterHabits";

type Props = {
    multiplier: number | null
}

const TodaysMultiplier = ({multiplier}:Props) => {
    const {userData, user} = useAuthContext()
    const {updateDocument} = useFirestore("users")
    const useEffectDep = userData!.habits.filter(h=>filterHabits({habit:h, option:"today"})).map(el=>el.completedToday).filter(l=>l).length

    //if all habits scheduled for today has been completed, calculate and show today's multiplier to the user
    //also handle multiplying user's points with the multiplier
    useEffect(() => {
        //generate multiplier
        if (allTodaysHabitsAreCompleted(userData!) && !userData!.todaysMultiplier){
            const multiplier = generateMultiplier()
            updateDocument(user!.uid, {todaysMultiplier: multiplier})
            const pointsToAdd = calculatePointsWithMultiplier({multiplier, todaysPoints:sumUpPointsOfTodaysHabits(userData!.habits), globalStrike:userData!.strike})

        }




    }, [useEffectDep]);

    return (
        <div className="flex gap-2">
            <span>Today&apos;s <br/>multiplier</span>
            <div className="box-primary flex-center">
                <span
                    style={{filter:(multiplier && allTodaysHabitsAreCompleted(userData!)) ? "blur(0)" : "blur(5px)"}}
                    className="text-accent text-xl w-12 text-center">
                    {multiplier || "FD"}%
                </span>
            </div>
        </div>
    );
};

export default TodaysMultiplier;