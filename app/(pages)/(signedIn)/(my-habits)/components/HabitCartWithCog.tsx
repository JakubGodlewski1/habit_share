import StatRow from "@/app/(pages)/(signedIn)/(my-habits)/components/StatRow";
import UpdateHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/updateHabitBtn";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";
import {Habit} from "@/types";

type Props = {
    habit: Habit
}

const HabitCartWithCog = ({habit}:Props) => {
    return (
        <div className="flex rounded-lg overflow-hidden bg-primary border-2 border-primary">
            <div className="flex p-2 rounded-lg bg-primary gap-2 flex-grow">
                <span className="text-accent flex-grow mr-4">{habit.title}</span>
                <div className="flex gap-2">
                    <StatCol label="Strike" value={`${habit.strike} ${habit.strike === 1 ? "day": "days"}`}/>
                    <StatCol label="Points" value={habit.points.toString()}/>
                </div>
            </div>
            <div className="overflow-hidden">
                <UpdateHabitBtn habit={habit}/>
            </div>
        </div>
    );
};

export default HabitCartWithCog;