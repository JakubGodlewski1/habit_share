import HabitCart from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCart";
import HabitCartWithCog from "@/app/(pages)/(signedIn)/(my-habits)/components/HabitCartWithCog";

type Props = {
    label:string
}
const HabitCartsContainer = ({label}:Props) => {
    return (
        <div className="flex-grow p-1 rounded-lg bg-accent flex flex-col gap-2">
           <h2 className="box bg-secondary text-center">{label}</h2>
            <div className="flex flex-col gap-1">
                {/*<HabitCart habitTitle="learn at least 10 english words"/>*/}
                <HabitCartWithCog habitTitle="learn at least 10 english words"/>
            </div>
        </div>
    );
};

export default HabitCartsContainer;