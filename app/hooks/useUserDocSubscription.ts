import {useAuthContext} from "@/app/hooks/useAuthContext";
import {useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "@/app/utils/firebase/config";
import {UserData} from "@/types";

export const useUserDocSubscription = () => {
    const {user, updateUserData} =useAuthContext()
    const docRef = doc(db, "users", user?.uid!);

    useEffect(() => {
        const unsub = onSnapshot(docRef, doc=>{
            updateUserData(doc.data() as UserData)
        })

        return ()=>unsub()
    }, []);
}