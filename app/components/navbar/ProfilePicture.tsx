'use client'

import {useAuthContext} from "@/app/hooks/useAuthContext";

const ProfilePicture = () => {
    const {userData} = useAuthContext()

    return (
        <div className="overflow-hidden w-10 h-10 rounded-full">
            <img className="rounded-full w-10" src={userData?.thumbnailUrl!} alt="thumbnail"/>;
        </div>
        )


};

export default ProfilePicture;