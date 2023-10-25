import {z} from "zod"

export const SignInUserValidation = z.object({
    email: z.string().email("Email seems to be incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const SignUpUserValidation = z.object({
    name: z.string().min(3, "Your name seems to be too short"),
    email: z.string().email("Email seems to be incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    picObj: z.object({
        name: z.string(),
        size: z.number().max(500000, "Your picture size is too big, max size is 0.5mb"),
        type: z.string().includes("image", {message: "The file you added is not an image"})
    }).nullish().refine((picObj) => picObj !== null && picObj !== undefined, {
        message: "Please add a picture",
    }),
    passwordConfirmation: z.string().min(6, "Password must be at least 6 characters long"),

}).refine(user=>user.password===user.passwordConfirmation, {
    message:"Passwords don't match",
    path:["passwordConfirmation"]
})