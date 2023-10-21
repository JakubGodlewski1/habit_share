"use client"
import {useEffect} from "react";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {useFirestore} from "@/app/hooks/useFirestore";
import {generateMultiplier} from "@/lib/generateMultiplier";
import {todaysHabits} from "@/lib/todaysHabits";
import {calculatePointsWithMultiplier} from "@/lib/calculatePointsWithMultiplier";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";
import {sumUpPointsOfTodaysHabits} from "@/lib/sumUpPointsOfTodaysHabits";
import {filterHabits} from "@/lib/filterHabits";

type Props = {
    multiplier: number | null
}

const TodaysMultiplier = ({multiplier}:Props) => {
    const {userData, user} = useAuthContext()
    const blurMultiplier = (todaysHabits({userData:userData!, completed:false}).length!==0) &&
        userData!.habits.filter(h=>filterHabits({habit:h, option: "today"})).length === 0



    return (
        <div className="flex gap-2">
            <span>Today&apos;s <br/>multiplier</span>
            <div className="box-primary flex-center">
                <span
                    style={{filter:!blurMultiplier ? "blur(0)" : "blur(5px)"}}
                    className="text-accent text-xl w-12 text-center">
                    {multiplier || "FD"}%
                </span>
            </div>
        </div>
    );
};

export default TodaysMultiplier;