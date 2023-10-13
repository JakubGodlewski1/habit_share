"use client"
import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import {RiArrowDownSLine} from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import {capitalizeWord} from "@/lib/capitalizeWord";
import {AllCategoryLabel, CurrentCategoryLabel, Habit} from "@/types";
import {filterHabits} from "@/lib/filterHabits";
import HabitCartWithCog from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartWithCog";
import {cloneDeep, isEqual} from "lodash"

type Props = {
        habits:Habit[],
        className: string,
        labels: CurrentCategoryLabel[] | AllCategoryLabel[],
        current:boolean
}

const HabitsAccordion = ({habits, className, labels, current=false}:Props) => {
    const [openedElement, setOpenedElement] = useState<CurrentCategoryLabel | AllCategoryLabel | null>(null)
    const [heights, setHeights] = useState<{[key in string]:number}>({[labels[0]]: 0, [labels[1]]: 0, [labels[2]]: 0})
    const contentRefs = useRef<HTMLDivElement[]>([])
    const [prevHabits, setPrevHabits] = useState(cloneDeep(habits))

    const setElementHeights = () => {
        const refs = contentRefs?.current?.filter(c=>c!==null)
        if (refs.length > 0){
            setHeights(p=>{
                const result = {...p}
                refs.forEach(contentEl=> {
                    const title = contentEl.dataset.title as CurrentCategoryLabel | AllCategoryLabel
                    result[title] = contentEl.offsetHeight
                })
                return result
            })
        }
    }

   /*calculate heights of divs*/
    if (!isEqual(habits, prevHabits)){
        //I use set timeout so the function fires "on the second render", when the jsx is already rendered
        setTimeout(()=>{
            setElementHeights()
            setPrevHabits(habits)
        }, 0)
    }

    //calculate heights when size of screen changes
    useEffect(() => {
        window.addEventListener("resize", setElementHeights)
        setElementHeights()
        return ()=> window.removeEventListener("resize", setElementHeights)
    }, []);

    //calculate heights when number of habits changes or subpage changes
    useEffect(() => {
        setElementHeights()
    }, [contentRefs?.current?.length, current]);


    return (
        <div className={className}>
            {labels.map((label, i)=> (
                <div key={label}>
                    <button onClick={()=>setOpenedElement( openedElement===label ? null : label)} className="w-full flex justify-between py-1 px-2 bg-accent rounded-lg mb-2">
                        <h3>{capitalizeWord(label)}</h3>
                        <div className={`${openedElement===label ? "rotate-180" :""} transition-all`}>
                            <RiArrowDownSLine size={24}/>
                        </div>
                    </button>
                    <div style={openedElement===label ? {height:heights[label], marginBottom:8} : {height: 0, marginBottom:0}} className="overflow-hidden transition-all">
                        <div data-title={label} ref={ref=>contentRefs.current[i]=ref!} className="flex flex-col gap-2">
                            {!!habits.length && habits.filter(h=>filterHabits({habit:h,option:label})).sort(h=>h.completedToday ? 1 : -1).map(habit=>
                                current ? <HabitCart key={habit.title} habit={habit}/> : <HabitCartWithCog habit={habit} key={habit.title}/>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HabitsAccordion;