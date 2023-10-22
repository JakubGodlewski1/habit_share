import {NextResponse} from "next/server";
import {db} from "@/app/utils/firebase/config";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {UserData} from "@/types";
import {reset} from "@/app/api/night-reset/reset";

export async function GET() {
    let error = null;
    const snapshot = await getDocs(collection(db, "users"));
    const data = snapshot.docs.map((doc) => doc.data()) as UserData[];
    //update every user
     const up:any = []
    data.forEach((userData)=>{
        const updatedUserData = reset(userData)
        up.push(updatedUserData)
        try {
            const docRef = doc(db, "users", userData.uid)
            updateDoc(docRef, updatedUserData as UserData)
        }catch (err:any){
            error=err
        }
    })


    return NextResponse.json({error, users: data.length, updatedUserData: up});
}