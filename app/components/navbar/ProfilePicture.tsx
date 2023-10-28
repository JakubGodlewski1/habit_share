'use client'

import {useAuthContext} from "@/app/hooks/useAuthContext";

const ProfilePicture = () => {
    const {userData} = useAuthContext()

    return <img className="rounded-full w-10 h-10" src={userData?.thumbnailUrl!} alt="thumbnail"/>;
};

export default ProfilePicture;