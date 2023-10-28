'use client'
import Image from "next/image";
import hero_friends from "@/public/hero_friends.svg";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import ProfilePicture from "@/app/components/navbar/ProfilePicture";


const Logo = () => {
    const {user} = useAuthContext()

    return (
        <div className="flex items-center gap-2">
            <Image src={hero_friends} alt="logo"/>
            <h1 className="hidden xsm:block">Habit Share</h1>
            {user?.email && <span className="ml-2">{user.email.slice(0,15)} {user.email?.length > 15 && "..."}</span>}
            <ProfilePicture/>
        </div>
    );
};

export default Logo;