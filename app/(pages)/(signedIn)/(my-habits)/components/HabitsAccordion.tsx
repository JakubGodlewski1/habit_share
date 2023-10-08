"use client"
import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import {RiArrowDownSLine} from "react-icons/ri";
import {useLayoutEffect, useRef, useState} from "react";
import {capitalizeWord} from "@/lib/capitalizeWord";
import {AllCategoryOption, CurrentCategoryOption, Habit} from "@/types";
import {filterHabits} from "@/lib/filterHabits";
import HabitCartWithCog from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartWithCog";

type Props = {
        habits:Habit[],
        className: string,
        labels: CurrentCategoryOption[] | AllCategoryOption[],
        current:boolean
}

const HabitsAccordion = ({habits, className, labels, current=false}:Props) => {
    const [openedElement, setOpenedElement] = useState<CurrentCategoryOption | AllCategoryOption | null>(null)
    const [heights, setHeights] = useState<{[key in string]:number}>({[labels[0]]: 0, [labels[1]]: 0, [labels[2]]: 0})
    const contentRefs = useRef<HTMLDivElement[]>([])

    //calculate heights of divs
    useLayoutEffect(() => {
        const setElementHeights = () => {
            if (contentRefs?.current?.length > 0){
                setHeights(p=>{
                    const result = {...p}
                    contentRefs.current.forEach(contentEl=> {
                        const title = contentEl.dataset.title as CurrentCategoryOption | AllCategoryOption
                        result[title] = contentEl.offsetHeight
                    })
                    return result
                })
            }
        }

        window.addEventListener("resize", setElementHeights)
        setElementHeights()
        return ()=> window.removeEventListener("resize", setElementHeights)
    }, [habits.length]);

    return (
        <div className={className}>
            {labels.map((label, i)=> (
                <div key={label}>
                    <button onClick={()=>setOpenedElement( openedElement===label ? null : label)} className="w-full flex justify-between py-1 px-2 bg-accent rounded-lg mb-2">
                        <h3>{capitalizeWord( label ==="daily" ? "daily/ Specific days" : label)}</h3>
                        <div className={`${openedElement===label ? "rotate-180" :""} transition-all`}>
                            <RiArrowDownSLine size={24}/>
                        </div>
                    </button>
                    <div style={openedElement===label ? {height:heights[label], marginBottom:8} : {height: 0, marginBottom:0}} className="overflow-hidden transition-all">
                        <div data-title={label} ref={ref=>contentRefs.current[i]=ref!} className="flex flex-col gap-2">
                            {!!habits.length && habits.filter(h=>filterHabits(h, label)).sort(h=>h.completedToday ? 1 : -1).map(habit=>
                                current ? <HabitCart key={habit.title} habit={habit}/> : <HabitCartWithCog habit={habit} key={habit.title}/>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HabitsAccordion;