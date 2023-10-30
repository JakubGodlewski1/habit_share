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
                <AddFriendBtn/>
            </div>
            {isPending && <span>Loading...</span>}
            {haveFriends && friends && <FriendCartsContainer friends={friends}/>}
            {haveFriends === false &&
                <div className="flex justify-around items-center py-8 px-4 rounded-lg absolute top-[50vh] left-[50vw] -z-10 md:w-[600px] -translate-x-1/2 -translate-y-1/2 lg:w-[800px]">
                    <div>
                        <h1 className="text-center  text-6xl mb-4">No friends yet</h1>
                        <h3 className="text-center mb-4 text-2xl">Add friends to fully enjoy habitShare</h3>
                        <AddFriendBtn disableText={true} className="btn-primary mx-auto"/>
                    </div>
                    <Image width="400" height="400" style={{filter:"invert(18%) sepia(7%) saturate(4287%) hue-rotate(206deg) brightness(98%) contrast(92%)"}} src={hero_friends} alt="hero friends"/>
                </div>
            }
        </main>
    );
};

export default FriendsPage;