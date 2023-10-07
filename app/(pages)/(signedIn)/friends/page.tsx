import FriendCartsContainer from "@/app/(pages)/(signedIn)/friends/components/FriendCartsContainer";
import AddFriendBtn from "@/app/(pages)/(signedIn)/friends/components/AddFriendBtn";

const FriendsPage = () => {
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