"use client"
import {ReactNode} from "react";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {redirect} from "next/navigation";

const SignedInLayout = ({children}:{children:ReactNode}) => {

    const {authIsReady, userData, user} = useAuthContext()

    if (!authIsReady)return <span>Loading...</span>
    if (!user)redirect("/hero")
    if (!userData)return <span>Loading...</span>

    return (
        <main className="m-auto mt-8 px-2 max-w-[1456px]">
            {children}
        </main>
    );
};

export default SignedInLayout;