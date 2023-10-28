'use client'
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useFirestore} from "@/app/hooks/useFirestore";
import {UserData} from "@/types";
import {generateMultiplier} from "@/lib/generateMultiplier";


export const useGoogleAuth = () => {
        const {updateUser, updateUserData, updateAuthIsReady} = useAuthContext()
        const provider = new GoogleAuthProvider()
        const {getDocument, addDocument} = useFirestore("users")

    const signInOrSignUpWithGoogle = async () => {

        try {
            const {user} = await signInWithPopup(auth, provider)
            updateUser(user)
            if (user){
                const userData = await getDocument(user.uid) as any
                if (userData) {
                    updateUserData(userData)
                }
                else {
                    // create user account in database
                    const userInitialData:UserData = {
                        thumbnailUrl: undefined,
                        uid: user.uid,
                        email:user.email!,
                        strike:0,
                        displayName: undefined,
                        friends:[],
                        habits: [],
                        multiplier: generateMultiplier(),
                        points:0,
                        dailyUpdates:{
                            strike:false,
                            points: false
                      }
                    }
                    await addDocument(userInitialData, user.uid)
                    updateUserData(userInitialData)
                }
            }
            updateAuthIsReady(true)
        }catch (err:any){
            console.error(err.message)
            alert(err.message)
        }
    }
    return {signInOrSignUpWithGoogle}
}