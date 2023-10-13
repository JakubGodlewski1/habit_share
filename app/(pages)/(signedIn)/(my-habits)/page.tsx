"use client"
import TopBar from "@/app/(pages)/(signedIn)/(my-habits)/components/TopBar";
import ToggleBtns from "@/app/(pages)/(signedIn)/(my-habits)/components/ToggleBtns";
import HabitCartsContainer from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartsContainer";
import {useEffect, useState} from "react";
import HabitsAccordion from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitsAccordion";
import {useUserDocSubscription} from "@/app/hooks/useUserDocSubscription";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";
import {AllCategoryLabel, CurrentCategoryLabel, Habit} from "@/types";
import {getCurrentHabits} from "@/lib/getCurrentHabits";

const allCategoryLabels:AllCategoryLabel[] = ["daily", "weekly", "monthly", "specific days"]
const currentCategoryLabels:CurrentCategoryLabel[] = ["today", "this week", "this month"]

const Page = () => {
    //states
    const [subpage, setSubpage] = useState<"current" | "all">("current")
    const [currentHabits, setCurrentHabits] = useState<Habit[]>([])

    //hooks
    const {userData} = useAuthContext()
    const {strike, habits} = userData!
    useUserDocSubscription()

    //update current habits
    //currentHabits - habits that are either to be done today (both completed and uncompleted) or habits that are to be done
    // this week or this month - uncompleted or only completed today
    useEffect(() => {
        setCurrentHabits(getCurrentHabits(habits))
    }, [habits]);

    return (
        <main className="flex flex-col gap-4">
            <TopBar multiplier={userData!.todaysMultiplier} strike={strike} totalUserPoints={calculateTotalUserPoints(habits)}/>
            <ToggleBtns setActive={setSubpage} active={subpage === "current" ? "label1" : "label2"} label1="current" label2="all"/>
            {/*for mobile*/}
                <HabitsAccordion current={subpage==="current"} labels={subpage === "current" ? ["today", "this week", "this month"]:["daily", "weekly", "monthly"]} className="flex lg:hidden flex-col" habits={subpage === "current"? currentHabits : habits}/>
            {/*for desktop*/}
            <div style={{gridTemplateColumns:subpage==="current" ? "1fr 1fr 1fr":"1fr 1fr"}} className="hidden lg:grid grid-cols-3 items-start gap-4">
                {//all
                    subpage ==="all" && allCategoryLabels.map(label=>(
                    <HabitCartsContainer key={label} current={false}  habits={habits} label={label}/>
                ))}
                {//current
                    subpage === "current" && currentHabits.length > 0 && currentCategoryLabels.map(label=>(
                        <HabitCartsContainer key={label} current={true}  habits={currentHabits} label={label}/>
                    ))}
            </div>
        </main>
    );
};

export default Page;