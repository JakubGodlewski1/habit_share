'use client'

import {useState} from "react";
import {useCollection} from "@/app/hooks/useCollection";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";

export const useAddFriend = () => {
    const {isPending, getCollection} = useCollection()
   const [error, setError] = useState<null | string>(null)
    const {updateDocument, error:firebaseError} = useFirestore("users")
    const {user, userData} = useAuthContext()

    const validateFriendEmail = async (email:string) =>{
        let error:string | null = null;
        const invalidate = (errorMessage:string) => {
            setError(errorMessage)
            return {error:errorMessage}
        }

        //check if the user does not have the friend's email already in his friends' list
        if (userData!.friends.includes(email))return invalidate("The friend is already added")
        //check if the user is not trying to add his own email
        if (email===userData?.email)return invalidate("The email seems to belonging to You")
        //check if the account with the email exists
        const {documents: friendAccount} = await getCollection("users", ["email", "==", email])
        if (friendAccount.length===0) return invalidate("Could not find the email")
        //if success
        return {error: null}
    }

    const addFriend = async (email:string):Promise<{error: string | null}> =>{
        //check if the friend's email exists
        const {error} =await validateFriendEmail(email)
        if (error) return {error}

        else {
            setError(null)
            await updateDocument(user!.uid, {...userData, friends: [...userData!.friends, email]})
            return {error}
        }
    }

    return {addFriend, isPending, error}
}