"use client"
import {useEffect} from "react";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {useFirestore} from "@/app/hooks/useFirestore";
import {generateMultiplier} from "@/lib/generateMultiplier";
import {allTodaysHabitsAreCompleted} from "@/lib/allTodaysHabitsAreCompleted";

type Props = {
    multiplier: number | null
}
const TodaysMultiplier = ({multiplier}:Props) => {
    const {userData, user} = useAuthContext()
    const {updateDocument} = useFirestore("users")
    const useEffectDep = userData!.habits.map(el=>el.completedToday).filter(l=>l).length

    //if all habits scheduled for today has been completed, calculate and show today's multiplier to the user
    useEffect(() => {
        if (allTodaysHabitsAreCompleted(userData!) && !userData!.todaysMultiplier){
            updateDocument(user!.uid, {todaysMultiplier: generateMultiplier()})
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