import FriendCart from "@/app/(pages)/(signedIn)/friends/components/FriendCart";


const FriendCartsContainer = () => {
    return (
        <div className="grid-cols-1 md:grid-cols-2 grid gap-2">
            <FriendCart
                score={23}
                doneToday={1}
                name="Monika"
                todoToday={23}
                strike={12}
                imgSrc="https://i1.sndcdn.com/artworks-000203689035-36huow-t500x500.jpg"/>

        </div>
    );
};

export default FriendCartsContainer;