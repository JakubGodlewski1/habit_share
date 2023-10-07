import {useState} from "react";
import {SignInUserValidation} from "@/app/utils/ValidationSchemas";
import {ZodError} from "zod";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/app/utils/firebase/config";
import {useAuthContext} from "@/app/hooks/useAuthContext";

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
}
export const useSignIn = () => {
    const [serverError, setServerError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {emailErr:"", passwordErr:""})
    const [isPending, setIsPending] = useState(false)
    const {updateUser} = useAuthContext()


    const signIn = async ({email, password}:{email:string, password:string}) => {
        //reset
        setServerError(null)
        setValidationErrors({passwordErr:"", emailErr:""})
        setIsPending(true)

        const validation = SignInUserValidation.safeParse({email, password})

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
          const {user} = await signInWithEmailAndPassword(auth, email, password)
            updateUser(user)
            setIsPending(false)
        }catch (err:any){
            setIsPending(false)
            setServerError(err.message)
        }
    }

    return {serverError, validationErrors, isPending, signIn}
}