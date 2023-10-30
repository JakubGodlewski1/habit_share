'use client'

import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {UserData} from "@/types";

const DeleteFriendBtn = ({email, closeModal}:{email:string, closeModal: ()=>void}) => {
    const {updateDocument, isPending} = useFirestore('users')
    const {user, userData} = useAuthContext()

    const deleteFriend = async () => {
        const {error} = await updateDocument(user!.uid, {friends: userData?.friends.filter(friendEmail=>friendEmail!==email)} as UserData)
        if (!error)closeModal()
    }

    return (
        <button disabled={isPending} onClick={deleteFriend} className="btn btn-primary">
            {!isPending ? "Delete the friend" : "Deleting..."}
        </button>
    );
};

export default DeleteFriendBtn;