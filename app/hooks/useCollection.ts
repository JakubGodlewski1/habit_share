'use client'
import {useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "@/app/utils/firebase/config";

export const useCollection = ()=> {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<null | string>(null)


    const getCollection = async (collectionName:string) =>{
        setIsPending(true)
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            return doc.data()
        });

    }

    return {isPending, getCollection}
}