'use client'

import {FormEvent, useState} from "react";
import Link from "next/link";
import {useSignIn} from "@/app/hooks/useSignIn";
import GoogleAuthBtn from "@/app/(pages)/(signedOut)/components/GoogleAuthBtn";


const SignIn = () => {
    //states
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })
    const {email,password} = credentials

    //hooks
    const {signIn, validationErrors ,serverError ,isPending} = useSignIn()


//functions
    const onSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

    }

    return (
        <main className="m-auto max-w-[480px] flex flex-col gap-2">
            <form onSubmit={onSubmit} className="standard-form pt-16 w-full">
                <h1 className="title">Sign in</h1>
                <label>
                    <span>Email</span>
                    <input
                        className="input-sm input"
                        value={email}
                        onChange={e=>setCredentials(p=>({...p, email: e.target.value}))}
                        type="text"
                    />
                </label>
                {validationErrors.emailErr && <span className="alert-error alert">{validationErrors.emailErr}</span>}
                <label>
                    <span>Password</span>
                    <input
                        className="input-sm input"
                        value={password}
                        onChange={e=>setCredentials(p=>({...p, password: e.target.value}))}
                        type="password"
                    />
                </label>
                {validationErrors.passwordErr && <span className="alert-error alert">{validationErrors.passwordErr}</span>}
                {serverError && <span className="alert-error alert">{serverError}</span>}
                <div className="two-buttons">
                    <button onClick={()=>signIn({email, password})} disabled={isPending} className="btn">{isPending ? "Signing in..." : "Sign in"}</button>
                    <button>Forgot password?</button>
                </div>
            </form>
            {/*<GoogleAuthBtn type="signIn"/>*/}
        </main>

    );
};

export default SignIn;