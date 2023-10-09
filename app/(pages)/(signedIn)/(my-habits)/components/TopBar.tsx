import TodaysMultiplier from "@/app/(pages)/(signedIn)/(my-habits)/components/TodaysMultiplier";
import StatRow from "@/app/(pages)/(signedIn)/(my-habits)/components/StatRow";
import AddHabitBtn from "@/app/(pages)/(signedIn)/(my-habits)/components/AddHabitBtn";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";

type Props = {
    multiplier: number | null,
    strike: number,
    totalUserPoints: number
}

const TopBar = ({multiplier, totalUserPoints, strike}:Props) => {

    return (
        <div className="flex justify-between">
                <TodaysMultiplier multiplier={multiplier}/>
            <div className="hidden md:flex gap-2">
                <StatRow  label="Strike" value={`${strike} days`}/>
                <StatRow label="Points" value={`${totalUserPoints}`}/>
            </div>
            <div className="flex md:hidden gap-2">
                <StatCol label="Strike" value={`${strike} days`}/>
                <StatCol label="Points" value={`${totalUserPoints}`}/>
            </div>
            <AddHabitBtn/>
        </div>
    );
};

export default TopBar;