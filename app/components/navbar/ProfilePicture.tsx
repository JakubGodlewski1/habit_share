'use client'

import {useAuthContext} from "@/app/hooks/useAuthContext";

const ProfilePicture = () => {
    const {userData} = useAuthContext()

    return (
        <div className="overflow-hidden w-10 h-10 rounded-full">
            {userData?.thumbnailUrl && <img className="w-full h-full object-cover" src={userData?.thumbnailUrl} alt="thumbnail"/>}
        </div>
        )
};

export default ProfilePicture;