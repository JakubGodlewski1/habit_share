import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import {CategoryOption, Habit} from "@/types";
import {filterHabits} from "@/lib/filterHabits";
import {capitalizeWord} from "@/lib/capitalizeWord";
import HabitCartWithCog from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartWithCog";

type Props = {
    habits:Habit[],
    label: CategoryOption,
    current:boolean
}

const HabitCartsContainer = ({habits, label, current}:Props) => {
    const enhancedLabel = label ==="daily" ? "daily/ Specific days" : label

    return (
        <div className="p-1 rounded-lg bg-accent flex flex-col gap-2">
           <h2 className="box bg-secondary text-center">{capitalizeWord(enhancedLabel)}</h2>
            <div className="flex flex-col gap-1">
                {habits.filter(h=>filterHabits(h, label)).sort(h=>h.completedToday ? 1 : -1).map(h=>
                    current ?<HabitCart key={h.title} habit={h}/> : <HabitCartWithCog key={h.title} habit={h}/>)}
            </div>
        </div>
    );
};

export default HabitCartsContainer;