'use client'
import Image from "next/image";
import hero_friends from "@/public/hero_friends.svg";
import {useAuthContext} from "@/app/hooks/useAuthContext";


const Logo = () => {
    const {user} = useAuthContext()

    return (
        <div className="flex items-center">
            <Image className="mr-2" src={hero_friends} alt="logo"/>
            <h1 className="hidden xsm:block">Habit Share</h1>
            {user?.email && <span className="ml-2">{user.email.slice(0,15)} {user.email?.length > 15 && "..."}</span>}
        </div>
    );
};

export default Logo;