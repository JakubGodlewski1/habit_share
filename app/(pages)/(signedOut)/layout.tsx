"use client"
import {ReactNode} from "react";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {spans} from "next/dist/build/webpack/plugins/profiling-plugin";
import {redirect} from "next/navigation";

const SignedOutLayout = ({children}:{children:ReactNode}) => {
    const {user, authIsReady} = useAuthContext()

    if (!authIsReady){
        return <span>Loading...</span>
    }
    if (user)redirect("/")

    return (
        <main className="m-auto mt-8 px-2 max-w-[1456px]">
            {children}
        </main>
    );
};

export default SignedOutLayout;