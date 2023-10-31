'use client'
import FriendCartsContainer from "@/app/(pages)/(signedIn)/friends/components/FriendCartsContainer";
import AddFriendBtn from "@/app/(pages)/(signedIn)/friends/components/AddFriendBtn";
import {useUserDocSubscription} from "@/app/hooks/useUserDocSubscription";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {useCollection} from "@/app/hooks/useCollection";
import {useEffect, useState} from "react";
import hero_friends from "@/public/hero_friends.svg";
import Image from "next/image";


const FriendsPage = () => {
    const [haveFriends, setHaveFriends] = useState<boolean | null>(null)
    useUserDocSubscription()

    const {userData} = useAuthContext()
    const {getCollection, isPending, documents:friends, unsub} = useCollection(true)

    useEffect(() => {
        const getFriends = async () => {
            if (userData!.friends.length > 0){
                if (unsub)unsub()
                await getCollection("users", ["email", "in", userData?.friends])
                setHaveFriends(true)
            }else setHaveFriends(false)
        }
        getFriends()

        if (unsub)return ()=>unsub()
    }, [userData?.friends.length]);

    return (
        <main>
            <div className="flex justify-end mb-4">
                {haveFriends && <AddFriendBtn/>}
            </div>
            {isPending && <span>Loading...</span>}
            {haveFriends && friends && <FriendCartsContainer friends={friends}/>}
            {haveFriends === false &&
                <div style={{height:"calc(100vh - 160px)"}} className="m-auto flex justify-around items-center py-8 px-4">
                    <div>
                        <h1 className="text-center text-5xl sm:text-6xl mb-4">No friends yet</h1>
                        <h3 className="text-center mb-4 text-1xl sm:text-2xl">Add friends to fully enjoy habitShare</h3>
                        <AddFriendBtn disableText={true} className="btn-primary mx-auto"/>
                    </div>
                    <div className="hidden lg:block">
                        <Image width="400" height="400" style={{filter:"invert(18%) sepia(7%) saturate(4287%) hue-rotate(206deg) brightness(98%) contrast(92%)"}} src={hero_friends} alt="hero friends"/>
                    </div>
                </div>
            }
        </main>
    );
};

export default FriendsPage;