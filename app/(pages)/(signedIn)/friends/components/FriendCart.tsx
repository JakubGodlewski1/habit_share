import ProgressBar from "@/app/(pages)/(signedIn)/friends/components/ProgressBar";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";

type Props = {
    imgSrc:string,
    name: string,
    strike: number,
    points: number,
    todoToday: number,
    doneToday: number
}
const FriendCart = ({imgSrc, strike, points, todoToday, doneToday, name}:Props) => {

    return (
        <div className="box-primary flex flex-col gap-4">
                <div className="flex items-start gap-2">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img className="w-auto h-auto" src={imgSrc} alt="my pic"/>
                        </div>
                    </div>
                    <h3 className="flex-grow">{name}</h3>
                    <StatCol label="Strike" value={strike+" days"}/>
                    <StatCol label="Score" value={points.toString()}/>
                </div>
                <ProgressBar
                    value={doneToday}
                    total={todoToday}
                    label="today's habits completed"
                />
        </div>
    );
};

export default FriendCart;