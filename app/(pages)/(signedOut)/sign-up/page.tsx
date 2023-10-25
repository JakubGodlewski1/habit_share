'use client'

import {ChangeEvent, FormEvent, useState} from "react";
import {useSignUp} from "@/app/hooks/useSignUp";
import Link from "next/link"
import GoogleAuthBtn from "@/app/(pages)/(signedOut)/components/GoogleAuthBtn";

type Credentials = {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    picObj: File | null
}

const SignUp = () => {
    //states
    const [credentials, setCredentials] = useState<Credentials>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        picObj: null
    })
    const {email,password, passwordConfirmation, name, picObj} = credentials

    //hooks
    const {serverError, validationErrors ,isPending,signUp} = useSignUp()

//functions
    const onSubmit =async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        await signUp({email, password, passwordConfirmation, name, picObj})
    }

    return (
        <main className="m-auto max-w-[480px] flex flex-col gap-2">
            <form onSubmit={onSubmit} className="standard-form pt-16 w-full">
                <h1 className="title">Sign up</h1>
                <label>
                    <span>Your name</span>
                    <input
                        className="input-sm input"
                        value={name}
                        onChange={e=>setCredentials(p=>({...p, name: e.target.value}))}
                        type="text"
                    />
                </label>
                {validationErrors.nameErr&& <span className="alert alert-error">{validationErrors.nameErr}</span>}
                <label>
                    <span>Email</span>
                    <input
                        className="input-sm input"
                        value={email}
                        onChange={e=>setCredentials(p=>({...p, email: e.target.value}))}
                        type="text"
                    />
                </label>
                {validationErrors.emailErr && <span className="alert alert-error">{validationErrors.emailErr}</span>}
                <label>
                    <span>Password</span>
                    <input
                        className="input-sm input"
                        value={password}
                        onChange={e=>setCredentials(p=>({...p, password: e.target.value}))}
                        type="password"
                    />
                </label>
                {validationErrors.passwordErr && <span className="alert alert-error">{validationErrors.passwordErr}</span>}
                <label>
                    <span>Password Confirmation</span>
                    <input
                        className="input-sm input"
                        onChange={e=>setCredentials(p=>({...p, passwordConfirmation: e.target.value}))}
                        value={passwordConfirmation}
                        type="password"
                    />
                </label>
                {validationErrors.passwordConfirmationErr && <span className="alert alert-error">{validationErrors.passwordConfirmationErr}</span>}
                <label>
                    <span>Your pic! Help your friends recognize You</span>
                    <input
                        onChange={e=>setCredentials(p=>({...p, picObj: e.target.files ? e.target.files[0]: null}))}
                        className=""
                        type="file"
                    />
                </label>
                {validationErrors.picObjErr && <span className="alert alert-error">{validationErrors.picObjErr}</span>}
                {serverError && <span className="alert alert-error">{serverError}</span>}
                <div className="two-buttons">
                    <button disabled={isPending} className="btn">{isPending ? "Signing in...": "Sign up"}</button>
                    <Link href="/sign-in">Sign in instead</Link>
                </div>
            </form>
            <GoogleAuthBtn type="signUp"/>
        </main>
    );
};

export default SignUp;