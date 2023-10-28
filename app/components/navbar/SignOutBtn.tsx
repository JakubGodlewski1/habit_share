"use client"
import {signOut} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {Dispatch, SetStateAction} from "react";

const SignOutBtn = () => {
    const {updateUser} = useAuthContext()

    const handleSignOut = async () =>{
        updateUser(null)
        await signOut(auth)
    }

    return (
        <button onClick={handleSignOut}>Sign out</button>
    );
};

export default SignOutBtn;