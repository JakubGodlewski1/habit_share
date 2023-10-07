import StatRow from "@/app/(pages)/(signedIn)/(my-habits)/components/StatRow";
import UpdateHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/updateHabitBtn";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";

type Props = {
    habitTitle: string
}

const HabitCartWithCog = ({habitTitle}:Props) => {
    return (
        <div className="flex rounded-lg overflow-hidden bg-primary">
            <div className="flex p-2 rounded-lg bg-primary gap-2 flex-grow">
                <span className="text-accent flex-grow mr-4">{habitTitle}</span>
                <div className="flex gap-2">
                    <StatCol label="Strike" value="2 days"/>
                    <StatCol label="Score" value="232"/>
                </div>
            </div>
            <div className="bg-secondary flex-center overflow-hidden">
                <UpdateHabitBtn/>
            </div>
        </div>
    );
};

export default HabitCartWithCog;