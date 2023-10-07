'use client'
import {createContext, ReactNode, useEffect, useState} from "react";
import { onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useFirestore} from "@/app/hooks/useFirestore";
import {UserData} from "@/types";


type AuthContextType = {
    user:User | null,
    userData: UserData | null,
    authIsReady: boolean,
    updateUser: (user:User | null)=>void,
    updateUserData: (userData:UserData)=>void,
    updateAuthIsReady: (isReady:boolean)=> void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    authIsReady: false,
    updateUser: (user)=>{},
    updateUserData: (userData:UserData)=>{},
    updateAuthIsReady: (isReady:boolean)=> {}
})


export const AuthContextProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [authIsReady, setAuthIsReady] = useState(false)
    const {getDocument} = useFirestore("users")

    useEffect(() => {
            const updateContext = async (user:User | null) => {
                setUser(user)
                if (user){
                    const userData = await getDocument(user.uid) as any
                    if (userData) setUserData(userData)
                }
                setAuthIsReady(true)
            }

            const unsubscribe = onAuthStateChanged(auth,(user)=>updateContext(user))

        return ()=>unsubscribe()
    },[]);

    const updateUser = (user:User | null) => setUser(user)
    const updateUserData = (userData:UserData) => setUserData(userData)
    const updateAuthIsReady = (isReady: boolean) => setAuthIsReady(isReady)

    return <AuthContext.Provider value={{userData, user, authIsReady, updateUser, updateUserData, updateAuthIsReady}}>
        {children}
    </AuthContext.Provider>
}