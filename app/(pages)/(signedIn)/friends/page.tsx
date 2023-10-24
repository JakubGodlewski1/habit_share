'use client'
import FriendCartsContainer from "@/app/(pages)/(signedIn)/friends/components/FriendCartsContainer";
import AddFriendBtn from "@/app/(pages)/(signedIn)/friends/components/AddFriendBtn";
import {useUserDocSubscription} from "@/app/hooks/useUserDocSubscription";

const FriendsPage = () => {
    useUserDocSubscription()

    return (
        <main>
            <div className="flex justify-end mb-4">
                <AddFriendBtn/>
            </div>
            <FriendCartsContainer/>
        </main>
    );
};

export default FriendsPage;