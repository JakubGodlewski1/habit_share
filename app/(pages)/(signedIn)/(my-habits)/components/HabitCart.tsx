import CompleteHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/CompleteHabitBtn";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";
import {AllCategoryLabel, Habit} from "@/types";
import {getPeriod} from "@/lib/getPeriod";

const HabitCart = ({habit}:{habit:Habit}) => {
    const {title} = habit
    const habitRepetitionType:AllCategoryLabel = habit.repetitionOption.type === "repeat" ? habit.repetitionOption.repeatFrequency : "specific days"


    return (
        <div style={{opacity: habit.completedToday ? "70%" : "100%"}} className="flex p-2 rounded-lg bg-primary gap-2">
            <CompleteHabitBtn habit={habit}/>
                <span className="text-accent flex-grow">{title}</span>
            <div className="flex gap-2">
                <StatCol
                    label="Strike"
                    value={`${habit.strike} ${getPeriod(habitRepetitionType, habit.strike !==1)}`}
                />
                <StatCol label="Points" value={habit.points.toString()}/>
            </div>
        </div>
    );
};

export default HabitCart;