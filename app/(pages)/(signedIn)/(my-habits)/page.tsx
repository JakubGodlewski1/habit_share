"use client"
import TopBar from "@/app/(pages)/(signedIn)/(my-habits)/components/TopBar";
import ToggleBtns from "@/app/(pages)/(signedIn)/(my-habits)/components/ToggleBtns";
import HabitCartsContainer from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartsContainer";
import {useEffect, useState} from "react";
import HabitsAccordion from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitsAccordion";
import {useUserDocSubscription} from "@/app/hooks/useUserDocSubscription";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";
import {Habit} from "@/types";
import {getCurrentHabits} from "@/lib/getCurrentHabits";

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
            <div className="hidden lg:grid grid-cols-3 items-start gap-4">
                <HabitCartsContainer current={subpage==="current"}  habits={subpage === "current"? currentHabits : habits} label={subpage ==="current" ? "today": "daily"}/>
                <HabitCartsContainer current={subpage==="current"} habits={subpage === "current"? currentHabits : habits} label={subpage ==="current" ? "this week": "weekly"}/>
                <HabitCartsContainer current={subpage==="current"} habits={subpage === "current"? currentHabits : habits} label={subpage ==="current" ? "this month": "monthly"}/>
            </div>
        </main>
    );
};

export default Page;