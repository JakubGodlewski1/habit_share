"use client"
import TopBar from "@/app/(pages)/(signedIn)/(my-habits)/components/TopBar";
import ToggleBtns from "@/app/(pages)/(signedIn)/(my-habits)/components/ToggleBtns";
import HabitCartsContainer from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartsContainer";
import {useState} from "react";
import HabitsAccordion from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitsAccordion";
import {useUserDocSubscription} from "@/app/hooks/useUserDocSubscription";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {calculateTotalUserPoints} from "@/lib/calculateTotalUserPoints";

const Page = () => {
    //states
    const [subpage, setSubpage] = useState<"current" | "all">("current")

    //hooks
    const {userData} = useAuthContext()
    const {strike, habits} = userData!
    useUserDocSubscription()

    //functions
    const totalUserPoints = calculateTotalUserPoints(habits)

    return (
        <main className="flex flex-col gap-4">
            <TopBar multiplier={10} strike={strike} totalUserPoints={totalUserPoints}/>
            <ToggleBtns setActive={setSubpage} active={subpage === "current" ? "label1" : "label2"} label1="current" label2="all"/>
            {/*for mobile*/}
            <div className="flex lg:hidden flex-col">
                <HabitsAccordion habits={habits}/>
            </div>
            {/*for desktop*/}
            <div className="hidden lg:flex items-start gap-4">
                <HabitCartsContainer habits={habits} label="today"/>
                <HabitCartsContainer habits={habits} label="this week"/>
                <HabitCartsContainer habits={habits} label="this month"/>
            </div>
        </main>
    );
};

export default Page;