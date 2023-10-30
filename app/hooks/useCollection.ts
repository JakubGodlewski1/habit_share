'use client'
import {useState} from "react";
import {collection, FieldPath, getDocs, onSnapshot, query, where, WhereFilterOp} from "firebase/firestore";
import {db} from "@/app/utils/firebase/config";
import {Unsubscribe} from "@firebase/util";

export const useCollection = (subscription?: boolean) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [documents, setDocuments] = useState<any[]>([])
    const [unsub, setUnsub] = useState<null | Unsubscribe>(null)

    const getCollection = async (collectionName: string, _q?: [string | FieldPath, WhereFilterOp, unknown]) => {
        const documents:any[] = []
        setIsPending(true)
        const collectionRef = collection(db, collectionName)
        let q;
        if (_q) {
            q = query(collectionRef, where(..._q))
        }
        let unsub: Unsubscribe;
        try {
            if (!subscription){
                const results:any[] = []
                //without subscription
                const querySnapshot = await getDocs(q || collectionRef);
                querySnapshot.forEach((doc) => results.push(doc.data()));
                documents.push(...results)
            }else{
                //with subscription
                    unsub = onSnapshot(q || collectionRef, snapshot => {
                        const results:any[] = []
                    snapshot.forEach((doc) => results.push(doc.data()));
                    setDocuments(results)
                        documents.push(...results)
                },err=>{throw new Error(err.message)})

                setUnsub(()=>unsub)
            }

        }catch (err:any){
            setError(err.message)
        }finally {
            setIsPending(false)
        }
        return {documents};
    }

    return {isPending, getCollection, documents, unsub}
}