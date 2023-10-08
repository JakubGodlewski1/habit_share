"use client"
import {useEffect, useState} from "react";
import {addDoc, doc, setDoc, collection, updateDoc, onSnapshot} from "firebase/firestore"
import {db} from "@/app/utils/firebase/config";
import {getDoc} from "@firebase/firestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {UserData} from "@/types";


export const useFirestore = (collectionName:"users") => {
    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState(false)
    const [document, setDocument] = useState<null | UserData>(null)
    const {updateUserData} = useAuthContext()

    const addDocument = async (user:UserData, docId?:string) => {

        setError(null)
        setIsPending(true)
        try {

            if (docId)await setDoc(doc(db, collectionName, docId), user)
            if (!docId)await addDoc(collection(db, collectionName), user)

            setIsPending(false)
            setDocument(user)
        }catch (err:any){
            setError(err.message)
            setIsPending(false)
        }
    }

    const updateDocument = async (docId: string, update:object) => {
        let error = null;
        setError(null)
        setIsPending(true)
        try {
            const docRef = doc(db, collectionName, docId)
            await updateDoc(docRef, update)
            setIsPending(false)
        }catch (err:any){
            error=err.message
            console.error(err.message)
            setError(err.message)
            setIsPending(false)
        }

        return {error}
    }

    const getDocument = async (docId:string) => {
        const docRef = doc(db, collectionName, docId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            return docSnap.data()
        }
    }

return {addDocument, updateDocument,getDocument, error, isPending, document}
}