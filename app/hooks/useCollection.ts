'use client'
import {useState} from "react";
import {collection, FieldPath, getDocs, query, where, WhereFilterOp} from "firebase/firestore";
import {db} from "@/app/utils/firebase/config";


export const useCollection = ()=> {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [documents, setDocuments] = useState<any[]>([])

    const getCollection = async (collectionName:string, _q?:[string | FieldPath, WhereFilterOp, unknown ]) =>{
        setIsPending(true)
         const collectionRef = collection(db, collectionName)
        let q;
        if (_q){
            q = query(collectionRef, where(..._q))
        }
        const results:any[] = []
        try {
            const querySnapshot = await getDocs(q || collectionRef);
            querySnapshot.forEach((doc) => results.push(doc.data()));
        }catch (err:any){
            setError(err.message)
        }finally {
            setIsPending(false)
        }

        return results;
    }

    return {isPending, getCollection, documents}
}