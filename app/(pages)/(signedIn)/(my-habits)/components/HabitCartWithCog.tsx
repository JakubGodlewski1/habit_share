import StatRow from "@/app/(pages)/(signedIn)/(my-habits)/components/StatRow";
import UpdateHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/updateHabitBtn";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";
import {AllCategoryLabel, Habit} from "@/types";
import {getPeriod} from "@/lib/getPeriod";

type Props = {
    habit: Habit
}


const HabitCartWithCog = ({habit}:Props) => {
    const habitRepetitionType:AllCategoryLabel = habit.repetitionOption.type === "repeat" ? habit.repetitionOption.repeatFrequency : "specific days"

    return (
        <div className="flex rounded-lg overflow-hidden bg-primary border-2 border-primary">
            <div className="flex p-2 rounded-lg bg-primary gap-2 flex-grow">
                <span className="text-accent flex-grow mr-4">{habit.title}</span>
                <div className="flex gap-2">
                    <StatCol
                        label="Strike"
                        value={`${habit.strike} ${getPeriod(habitRepetitionType, habit.strike !==1)}`}
                    />
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