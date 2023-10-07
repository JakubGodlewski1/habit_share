"use client"
import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import {RiArrowDownSLine} from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import {capitalizeWord} from "@/lib/capitalizeWord";
import {isThisMonth, isThisWeek} from "date-fns"

type Option = "today" | "this week" | "this month";
const options:Option[] = ["today", "this week", "this month"]

/*filters*/
const filterHabits = (habit:Habit, option: Option):boolean | undefined => {
    const {repetitionOption} = habit

    /*not completed*/
    //to do Today (except weekly and monthly tasks)
        if (option==="today"){
            return !habit.completedToday && (repetitionOption.type === "specific days"  ||
                (repetitionOption.type === "repeat" && repetitionOption.repeatFrequency === "daily"))
        }
    //to do weekly
        if (option=== "this week"){
            return  repetitionOption.type === "repeat" &&
                    repetitionOption.repeatFrequency === "weekly" &&
                    !isThisWeek(new Date(habit.daysWhenCompleted[habit.daysWhenCompleted.length-1]), {weekStartsOn: 1})
        }

    //to do monthly
    if (option==="this month"){
        return  repetitionOption.type === "repeat" &&
            repetitionOption.repeatFrequency === "monthly" &&
            !isThisMonth(new Date(habit.daysWhenCompleted[habit.daysWhenCompleted.length-1]))
    }
}

const HabitsAccordion = ({habits}:{habits:Habit[]}) => {

    const [open, setOpen] = useState<Option | null>(null)
    const [heights, setHeights] = useState<{[key in Option]:number}>({today: 0, "this week": 0, "this month": 0})
    const contentRefs = useRef<HTMLDivElement[]>([])

    //calculate heights of divs
    useEffect(() => {
            if (contentRefs?.current?.length > 0){
                setHeights(p=>{
                    const result = {...p}
                    contentRefs.current.forEach(contentEl=> {
                        const title = contentEl.dataset.title as Option
                        result[title] = contentEl.offsetHeight
                    })
                    return result
                })
            }
    }, [habits.length]);



    return (
        <div>
            {options.map((option, i)=> (
                <div key={option}>
                    <button onClick={()=>setOpen( open===option ? null : option)} className="w-full flex justify-between py-1 px-2 bg-accent rounded-lg mb-2">
                        <h3>{capitalizeWord(option)}</h3>
                        <div className={`${open===option ? "rotate-180" :""} transition-all`}>
                            <RiArrowDownSLine size={24}/>
                        </div>
                    </button>
                    <div style={open===option ? {height:heights[option], marginBottom:8} : {height: 0, marginBottom:0}} className="overflow-hidden transition-all">
                        <div data-title={option} ref={ref=>contentRefs.current[i]=ref!} className="flex flex-col gap-2">
                            {!!habits.length && habits.filter(h=>filterHabits(h, option)).map(habit=><HabitCart key={habit.title} habit={habit}/>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HabitsAccordion;