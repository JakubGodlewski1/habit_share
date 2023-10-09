import {useEffect, useState} from "react";
import {SignUpUserValidation} from "@/app/utils/ValidationSchemas";
import {ZodError} from "zod";
import {createUserWithEmailAndPassword, updateProfile} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {UserData} from "@/types";

const getErrorsAndMessagesFromZod = (zodErrorObj:ZodError) => {
    return zodErrorObj.errors.map(err=>{
        return {
            error: err.path[0]+"Err",
            message: err.message
        }
    })
}

type ValidationErrors = {
    emailErr: string,
    passwordErr:string,
    passwordConfirmationErr:string,
    nameErr:string
}
export const useSignUp = () => {
    const [serverError, setServerError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {emailErr:"", passwordConfirmationErr:"", passwordErr:"", nameErr:""})
    const [isPending, setIsPending] = useState(false)
    const {addDocument, error:addDocError} = useFirestore("users")
    const {updateUser, updateUserData} = useAuthContext()


    useEffect(() => {
        if (addDocError){
            setServerError(addDocError)
        }
    }, [addDocError]);

    const signUp = async ({email, password, passwordConfirmation, name}:{email:string, password:string, passwordConfirmation: string, name:string}) => {
        //reset
        setServerError(null)
        setValidationErrors({passwordErr:"", passwordConfirmationErr: "", emailErr: "", nameErr:""})
        setIsPending(true)

        const validation = SignUpUserValidation.safeParse({email, password, passwordConfirmation, name})

        //if any validation error, update validation errors state
        if (!validation.success){
            const errorsAndMessages = getErrorsAndMessagesFromZod(validation.error)
            setValidationErrors(p=>{
                const validationErrors = {...p};
                errorsAndMessages.forEach(errorAndMessage=>{
                    if (errorAndMessage["error"] in validationErrors){
                        (validationErrors as any)[errorAndMessage.error]  = errorAndMessage.message
                    }
                })
                return validationErrors
            })
            setIsPending(false)
            return
        }
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {displayName:name})

            // create user account in database
            const userInitialData:UserData = {
                email:user.email || "example@email.com",
                strike:0,
                displayName:name,
                friends:[],
                habits: [],
                todaysMultiplier: null

            }
            await addDocument(userInitialData, user.uid)
            updateUserData(userInitialData)
            updateUser(user)
            setIsPending(false)
        }catch (err:any){
            setIsPending(false)
            setServerError(err.message)
        }
    }


    return {serverError, validationErrors, isPending, signUp}
}