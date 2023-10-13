import {useAuthContext} from "@/app/hooks/useAuthContext";
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useFirestore} from "@/app/hooks/useFirestore";
import {UserData} from "@/types";


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
                        email:user.email || "example@email.com",
                        strike:0,
                        displayName: user.email || "user name",
                        friends:[],
                        habits: [],
                        todaysMultiplier: null,
                        strikeHasBeenUpdatedToday: false
                    }
                    await addDocument(userInitialData, user.uid)
                    updateUserData(userInitialData)
                }
            }
            updateAuthIsReady(true)
        }catch (err:any){
            alert(err.message)
        }
    }
    return {signInOrSignUpWithGoogle}
}