import {UserData} from "@/types";
import FriendCart from "@/app/(pages)/(signedIn)/friends/components/FriendCart";
import {filterHabits} from "@/lib/filterHabits";

const FriendCartsContainer = ({friends}:{friends: UserData[]}) => {


    return (
        <div className="grid-cols-1 md:grid-cols-2 grid gap-2">
            {friends.map(friend=>(
                <FriendCart
                    key={friend.email}
                    imgSrc={friend.thumbnailUrl!}
                    name={friend.displayName!}
                    strike={friend.strike}
                    points={friend.points}
                    todoToday={friend.habits.filter(h=>filterHabits({habit:h, option: "today"})).length}
                    doneToday={friend.habits.filter(h=>filterHabits({habit:h, option: "today"})).filter(h=>h.completedToday).length}
                />
            ))}
        </div>
    );
};

export default FriendCartsContainer;