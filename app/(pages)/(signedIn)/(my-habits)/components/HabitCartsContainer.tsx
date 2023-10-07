import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import {CategoryOption, Habit} from "@/types";
import {filterHabits} from "@/lib/filterHabits";

type Props = {
    habits:Habit[],
    label: CategoryOption
}

const HabitCartsContainer = ({habits, label}:Props) => {
    return (
        <div className="flex-grow p-1 rounded-lg bg-accent flex flex-col gap-2">
           <h2 className="box bg-secondary text-center">{label}</h2>
            <div className="flex flex-col gap-1">
                {habits.filter(h=>filterHabits(h, label)).sort(h=>h.completedToday ? 1 : -1).map(h=><HabitCart key={h.title} habit={h}/>)}
            </div>
        </div>
    );
};

export default HabitCartsContainer;