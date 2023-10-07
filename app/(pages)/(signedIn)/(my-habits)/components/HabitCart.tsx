import CompleteHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/CompleteHabitBtn";
import StatRow from "@/app/(pages)/(signedIn)/(my-habits)/components/StatRow";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";




const HabitCart = ({habit}:{habit:Habit}) => {
    const {title} = habit

    return (
        <div className="flex p-2 rounded-lg bg-primary gap-2">
            <CompleteHabitBtn/>
                <span className="text-accent flex-grow">{title}</span>
            <div className="flex gap-2">
                <StatCol label="Strike" value="2 days"/>
                <StatCol label="Score" value="232"/>
            </div>
        </div>
    );
};

export default HabitCart;