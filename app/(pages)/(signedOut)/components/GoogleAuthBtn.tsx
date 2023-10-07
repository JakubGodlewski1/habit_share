'use client'
import Image from "next/image";
import google_icon from "./../../../../public/google_icon.png"
import {useGoogleAuth} from "@/app/hooks/useGoogleAuth";

const GoogleAuthBtn = ({type}:{ type: "signIn" | "signUp" }) => {
    const {signInOrSignUpWithGoogle} = useGoogleAuth()

    return (
        <button onClick={signInOrSignUpWithGoogle} className="w-full bg-[#4285f4] rounded-sm p-0.5 flex items-center">
          <Image height={40} className="rounded-sm" src={google_icon} alt="google icon"/>
            <span className="m-auto font-semibold text-accent font-sans">{type === "signIn" ? "Sign in " : "Sign up "}with google instead</span>
        </button>
    );
};

export default GoogleAuthBtn;