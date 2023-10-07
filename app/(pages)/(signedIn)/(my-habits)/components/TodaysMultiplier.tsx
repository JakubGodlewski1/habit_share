

type Props = {
    multiplier: number
}
const TodaysMultiplier = ({multiplier}:Props) => {
    return (
        <div className="flex gap-2">
            <span>Today&apos;s <br/>multiplier</span>
            <div className="box-primary flex-center">
                <span className="blur-[5px] text-accent text-2xl">{multiplier}%</span>
            </div>
        </div>
    );
};

export default TodaysMultiplier;